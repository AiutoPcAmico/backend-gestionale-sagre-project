import { generateAccessToken } from "../router/authMiddleware.js";

async function apiPostLoginBearer(req, res) {
  console.log("\n\n[POST] - Required Bearer Token");
  var authObj = undefined;
  try {
    authObj = new Buffer.from(
      req.headers.authorization.split(" ").pop(),
      "base64"
    )
      .toString("ascii")
      .split(":");
  } catch (error) {
    res.status(401).send({ data: "Auth not provided!", error: true });
    return 0;
  }

  const response = await generateAccessToken(authObj[0], authObj[1]);

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

export { apiPostLoginBearer };
