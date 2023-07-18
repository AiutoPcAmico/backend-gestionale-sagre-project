import { generateAccessToken } from "../router/authMiddleware.js";

async function apiPostLoginBearer(req, res) {
  console.log("[POST] - Required Bearer Token");
  console.log("Username:" + req.body.username);
  const response = await generateAccessToken(
    req.body.username,
    req.body.password
  );
  if (response.error) {
    res
      .status(response.status)
      .send({ data: response.data, error: response.error });
  } else {
    res
      .status(response.status)
      .send({ data: response.data, error: response.error });
  }
}

export { apiPostLoginBearer };
