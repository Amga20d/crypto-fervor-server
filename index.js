import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cron from "node-cron";
import helmet from "helmet";
import axios from "axios";
import {TwitterApi} from 'twitter-api-v2';
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

  app.listen(5000, () => {
    console.log("Server is Listening on Port 5000!")
  })
  
  app.get('/home', async (req, res) => {
    const currencyData = await Currency.find({});
    res.json(currencyData);
    console.log('endpoint reached');
  });


  cron.schedule('45 */1 * * *', function() {
    Updating();
  });

  cron.schedule('46 */1 * * *', function() {
    twitterCalls();
  });

  cron.schedule('48 */1 * * *', function() {
    fervorCalc();
  });
 
 

// const sleep = (mili) => {
//   return new Promise(resolve => setTimeout(resolve, mili))
// };


   
            
  // const recentTweetsWithNode = await client.v2.tweetCountRecent('tron', {granularity: "day"});
  // console.log(recentTweetsWithNode.data[5].tweet_count);
  // console.log(recentTweetsWithNode.data[6].tweet_count);



//doing twitter calls by looping through db 
// Currency.find({}).then((datas) =>{
//   async function asyncCall() {
//   for(let curr of datas) {
//     await sleep(500);
//       const recentTweetsWithNode = await client.v2.tweetCountRecent(`${curr.id}`, {granularity: "day"});
      
//       Currency.updateOne(
//         { id: curr.id },
//         { prevCount: recentTweetsWithNode.data[5].tweet_count,
//           currCount: recentTweetsWithNode.data[6].tweet_count,
//         }
//             ).then((data) => {
//               console.log("data seeded");
//             }); 


//     }}

//     asyncCall();
  
// } );


//calculating fervor and updating db.
// Currency.find({}).then((data) => {
//   for(let curr of data) {
//     const fervor = Math.round(100 * (curr.currCount - curr.prevCount)/curr.prevCount);
    
//     Currency.updateOne(
//               { id: curr.id },
//               { fervorChange: fervor,
                
//               }
//                   ).then((data) => {
//                     console.log(data);
//                   }); 

//   }
// });




  
//to update the data //
// axios.get("https://api.coincap.io/v2/assets").then((res) => {
//   const seed = res.data.data;

//   for (let curr of seed) {
//     Currency.updateOne(
//       { id: curr.id },
//       {
//         rank: curr.rank,
//         symbol: curr.symbol,
//         name: curr.name,
//         supply: curr.supply,
//         maxSupply: curr.maxSupply,
//         marketCapUsd: curr.marketCapUsd,
//         volumeUsd24Hr: curr.volumeUsd24Hr,
//         priceUsd: curr.priceUsd,
//         changePercent24Hr: curr.changePercent24Hr,
//         vwap24Hr: curr.vwap24Hr,
//         explorer: curr.explorer,
//       }
//     ).then((data) => {
//       console.log("data seeded");
//     });
//   }
// });



// to seed the data //
// axios.get("https://api.coincap.io/v2/assets").then((res) => {
//   const seed = res.data.data;

//   Currency.insertMany(seed).then((data) => {
//     console.log('seeded')
//   }) });

