import exp from 'express';
import mongodb from 'mongodb';
import { fileURLToPath } from 'url';
import path from 'path';
import userApp from './APIs/userApp.js';
import otpRoute from './APIs/otpRequest.js';
import changePassRoute from './APIs/changePassword.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = exp();

app.use(exp.static(path.join(__dirname, '../dist')));

const mongoClient = mongodb.MongoClient;

mongoClient.connect('mongodb://127.0.0.1:27017/')
  .then(dbRef => {
    const dbObject = dbRef.db('foodappdb');
    const usersCollection = dbObject.collection('userscollection');
    app.set('userscollection', usersCollection);
    console.log("Connected to the Database Successfully.");
  })
  .catch(error => {
    console.log("Error while connecting the database is ", error)
  });

app.use('/user-api', userApp);
app.use('/otp-route',otpRoute);
app.use('/pass-reset',changePassRoute);

const PORT = 4000;
app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});

const errorHandlingMiddleware = (error, request, response) => {
  response.send({ message: error.message });
};

const pathHandlingMiddleware = (request, response, next) => {
  response.send({ message: "Invalid Path" });
};

app.use(pathHandlingMiddleware);

// Serve static files from the 'dist' directory
app.use(exp.static(path.join(__dirname, '../dist')));
