import exp from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import jsonwebtoken from 'jsonwebtoken';

const changePassRoute = exp.Router();

changePassRoute.use(exp.json());
// Middleware to verify JWT token
const verifyToken = (request, response, next) => {
  // Get the token from Authorization header
  const bearerToken = request.headers.authorization;

  // Check if token is undefined
  if (!bearerToken) {
    return response.status(403).send({ message: "Unauthorized Request" });
  }

  // Extract token from Bearer <token>
  const token = bearerToken.split(" ")[1];

  try {
    // Verify JWT token
    const decoded = jsonwebtoken.verify(token, "1234");
    request.decoded = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return response.status(401).send({ message: "Invalid Token", reason: err.message });
  }
};

// POST route for password change
changePassRoute.post('/password-change', verifyToken, expressAsyncHandler(async (request, response) => {
  const passwordsFromClient = request.body;
  const username = request.decoded.username;
  const userscollection = request.app.get('userscollection');
  console.log(passwordsFromClient);
  try {
    // Find the user in the database
    const userInDb = await userscollection.findOne({ username });
    // console.log(userInDb);

    if (!userInDb) {
      return response.status(404).send({ message: "User not found" }); // Return early after sending response
    }

    // Check if the current password matches
    const passwordMatch = await bcrypt.compare(passwordsFromClient.password, userInDb.password);

    if (!passwordMatch) {
      return response.status(400).send({ message: "Current password is incorrect" }); // Return early after sending response
    }


    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(passwordsFromClient.newpassword, 10);

    // Update user's password in the database
    await userscollection.updateOne({ username }, { $set: { password: hashedNewPassword } });

    // Respond with success message
    response.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    response.status(500).send({ message: "Error updating password", error: error.message });
  }
}));

export default changePassRoute;
