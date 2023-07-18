import jwt from "jsonwebtoken";

async function generateAccessToken(username, password) {
  console.log(process.env.SECRETLOGINSALT);
  if (username && password) {
    //TODO - verify into DB

    return {
      data: jwt.sign({ username: username }, process.env.SECRETLOGINSALT, {
        expiresIn: "8h",
      }),
      status: 200,
      error: false,
    };
  } else {
    //username or password not provided!
    return {
      data: "Username or password not provided!",
      status: 400,
      error: true,
    };
  }
}

function authenticateToken(req, res, next) {
  console.log(
    "[CHECK] - Requested path " + req.route.path + " verifying token JWT"
  );
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.error("[ERR] No token provided!");
    return res.status(401).send({ data: "No token provided!", error: true });
  } else {
    jwt.verify(token, process.env.SECRETLOGINSALT, (err, user) => {
      if (err) {
        console.error("[ERR] Token provided not valid!");
        return res.status(403).send({
          data: "Token not valid! Please, go to the login page!",
          error: true,
        });
      } else {
        console.log("[OK] - Token Validated!");
        req.user = user;
        next();
      }
    });
  }
}

export { generateAccessToken, authenticateToken };
