const Cookies = require("cookies");
const sessions = require("client-sessions");
const Tokens = require("csrf");
const axios = require("axios");
export default {
  path: "/login",
  handler: async function(req, res, next) {
    /*     const cookies = new Cookies(req, res);
    try {
      const tokens = new Tokens();
      const secret = await tokens.secret();
      cookies.set("csrf_token", secret, { httpOnly: true });
      res.setHeader("x-csrf-token", tokens.create(secret));
    } catch (error) {
      console.log(error);
    }
    next(); */
    try {
      const csrf_secret = await axios.get(
        "http://localhost:4000/api/auth/csrf"
      );
      res.setHeader("x-csrf-token", new Tokens().create(csrf_secret.data.csrf));
    } catch (error) {
      console.log(error);
    }
    next();
  }
};
