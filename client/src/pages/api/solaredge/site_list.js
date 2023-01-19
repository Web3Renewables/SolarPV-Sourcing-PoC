import { withSession } from "@auth/utils";

async function handler(req, res) {
  const user = req.session?.user;
  const body = req.body

  if (!user || user.isLogggedIn === false || user.roles === undefined) {    
    res.status(401).end();
    return
  }

  if (req.method == 'POST') {
    
    if(body === undefined || body === null) {
      res.status(400).json({message: "Please specify a body."});
      return
    }
    try {
      if(body.api_key === undefined) return res.status(400).json({message: "Please specify a valid API key."});
      let params = new URLSearchParams()
      params.append("api_key", body.api_key)

      const apiRes = await fetch(process.env.NEXT_PUBLIC_SOLAR_EDGE_BASE_URL + "/sites/list?" + params, { method: "GET" })
      if (!apiRes.ok) return res.status(400).json({message: "Could not retrieve information from Solar Edge."});

      const jsonData = await apiRes.json()
      const sites = jsonData.sites.site.map(site => { return { key: site.id, value: `${site.id} - ${site.name}` } })
      if (!sites.length) return res.status(200).json([]);

      return res.status(200).json(sites);
    } catch (e) {
      return res.status(400).json({message: "Bad Request"});
    }
  } else {
    return res.status(405).end();
  }
}

export default withSession(handler)