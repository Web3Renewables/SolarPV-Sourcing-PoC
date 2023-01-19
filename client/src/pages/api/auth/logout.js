import { withSession } from "@auth/utils";

const logoutRoute = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      req.session.destroy();
      return res.send({ ok: true });

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withSession(logoutRoute);
