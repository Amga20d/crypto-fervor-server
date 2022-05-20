import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cron from "node-cron";
import helmet from "helmet";
import Currency from "./models/CurrencyModel.js";
import Updating from "./controllers/update.js";
import twitterCalls from "./controllers/twitterCalls.js";
import fervorCalc from "./controllers/fervorCalc.js";
import "dotenv/config.js"

const app = express();


app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(helmet());
app.use(cors());




mongoose
  .connect(process.env.MONGO_API, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Open With Mongodb!");
  })
  .catch((err) => {
    console.log("Oh No Error connecting to db!!");
    console.log(err);
  });
 
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is Listening on Port ${ PORT }!`);
  });
  
  app.get('/home', async (req, res) => {
    const currencyData = await Currency.find({});
    res.json(currencyData);
    console.log('endpoint reached');
  });


  cron.schedule('5 */1 * * *', function() {
    Updating();
  });

  cron.schedule('6 */1 * * *', function() {
    twitterCalls();
  });

  cron.schedule('9 */1 * * *', function() {
    fervorCalc();
  });
 
 
