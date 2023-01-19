import { withSession } from "@auth/utils";

const userRoute = async (req, res) => {
  const { method } = req;
  console.log(req.session)
  switch (method) {
    case "GET":
      if (req.session.user?.did) {
        return res.status(200).send({ user: req.session.user });
      } else {
        return res.status(401).send('Unauthorized');
      }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withSession(userRoute);
