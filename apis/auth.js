import { generateAccessToken } from "../router/authMiddleware.js";

async function apiPostLoginBearer(req, res) {
  console.log("\n\n[POST] - Required Bearer Token");
  const response = await generateAccessToken(
    req.body.username,
    req.body.password
  );

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

export { apiPostLoginBearer };
