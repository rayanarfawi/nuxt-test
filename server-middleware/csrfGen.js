const Cookies = require("cookies");
const Tokens = require("csrf");
export default async function(req, res, next) {
  const cookies = new Cookies(req, res);
  try {
    const tokens = new Tokens();
    const secret = await tokens.secret();
    cookies.set("csrf_token", secret, { httpOnly: true });
    res.setHeader("x-csrf-token", tokens.create(secret));
  } catch (error) {
    console.log(error);
  }
  next();
}
