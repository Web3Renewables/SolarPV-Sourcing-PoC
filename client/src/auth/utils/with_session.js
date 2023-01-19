import { withIronSessionSsr, withIronSessionApiRoute } from "iron-session/next";
import { IRON_OPTIONS } from "@auth/constants";

const withSessionSsr = (handler) => withIronSessionSsr(handler, IRON_OPTIONS);
const withSession = (handler) => withIronSessionApiRoute(handler, IRON_OPTIONS);

export { withSession, withSessionSsr };
