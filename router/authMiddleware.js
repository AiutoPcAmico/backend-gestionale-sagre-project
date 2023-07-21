import jwt from "jsonwebtoken";
import { verifyPassword } from "../utils/encryptInfo.js";
import { dbSagre } from "../mysql/dbConnection.js";

async function checkPass(pass, user) {
  var sql = 'SELECT password from utente where username="' + user + '"';
  var error = false;
  try {
    const value = await dbSagre.promise().query(sql);
    if (value[0].length <= 0) {
      //if I can't find the specified user
      console.log("[ERR] - User not found!");
      return false;
    } else {
      //if I found the user, i'll check the pwd
      const pwd = await verifyPassword(pass, value[0][0].password);
      return pwd;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function generateAccessToken(username, password) {
  if (username && password) {
    const result = checkPass(password, username).then((res) => {
      if (res === true) {
        console.log("[OK] - User " + username + " logged successfully");
        return {
          data: jwt.sign({ username: username }, process.env.SECRETTOKENJWT, {
            expiresIn: "8h",
          }),
          status: 200,
          error: false,
        };
      } else {
        console.log("[ERR] - Password not valid!");
        return {
          data: "Username o password errate!",
          status: 403,
          error: true,
        };
      }
    });
    return result;
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
    "\n\n[CHECK] - Requested path " + req.route.path + " verifying token JWT"
  );
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.error("[ERR] No token provided!");
    return res.status(401).send({ data: "No token provided!", error: true });
  } else {
    jwt.verify(token, process.env.SECRETTOKENJWT, (err, user) => {
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
