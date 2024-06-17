import exp from 'express';
import expressAsyncHandler from 'express-async-handler';
import jsonWebToken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const userApp = exp.Router();

userApp.use(exp.json());

// route for sign up
userApp.post('/register-user', expressAsyncHandler(async (request, response) => {
  const userscollection = request.app.get('userscollection');
  const newUser = request.body;
  
  const userOfDb = await userscollection.findOne({ username: newUser.username });
  
  if (userOfDb) {
    response.status(200).send({ message: "Username already exists" });
  } else {
    const hashedPassword = await bcryptjs.hash(newUser.password, 7);
    newUser.password = hashedPassword;
    await userscollection.insertOne(newUser);
    response.status(201).send({ message: "New user registered" });
  }
}));

// route for logging the user
userApp.post('/login-user', expressAsyncHandler(async (request, response) => {
  const userscollection = request.app.get('userscollection');
  const userTryingToLogin = request.body;
  
  const userInDb = await userscollection.findOne({ username: userTryingToLogin.username });

  if (!userInDb) {
    response.status(404).send({ message: "Incorrect Username." });
  } else {
    const isPassEqual = await bcryptjs.compare(userTryingToLogin.password, userInDb.password);
    
    if (!isPassEqual) {
      response.status(401).send({ message: "Incorrect Password" });
    } else {
      const jwtToken = jsonWebToken.sign({ username: userInDb.username }, '1234', { expiresIn: "1h" });
      response.status(200).send({ message: "login success", token: jwtToken, loggedUserDetails: userInDb });
    }
  }
}));

export default userApp;
