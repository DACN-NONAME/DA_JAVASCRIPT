let fn = {};

fn.isNumeric = function (str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};

fn.verifyAuth = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    if (token) {
      next();
      return;
    }
  }
  res.status(403);
  res.send({
    error: {
      message: "Unable to authenticate!",
    },
  });
};

module.exports = fn;
