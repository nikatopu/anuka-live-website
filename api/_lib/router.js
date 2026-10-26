// The Hobby plan allows at most 12 serverless functions per deployment, and every
// file under api/ (outside _lib) is one. So each route file is a small dispatcher
// that picks the handler for a URL segment, keeping the public URLs unchanged.
export function createRouter(routes, param = "resource") {
  return (req, res) => {
    const name = req.query[param];
    if (!Object.hasOwn(routes, name)) {
      return res.status(404).json({ message: "Not Found" });
    }
    return routes[name](req, res);
  };
}
