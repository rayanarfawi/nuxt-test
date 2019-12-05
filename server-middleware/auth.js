export default async function(req, res, next) {
  console.log("from auth", req.headers);
  next();
}
