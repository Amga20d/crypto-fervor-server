import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import {TwitterApi} from 'twitter-api-v2';
import Currency from "./models/CurrencyModel.js";

const app = express();
const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAEYUaAEAAAAAOXUV45gabVAEBjqs7Z35nagQ6vI%3DS54tmnCcIBlC6KTeP9rd9nc2vdrHD8md5yfHgjKeTiHmkAey9G');

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/currency", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Open!");
  })
  .catch((err) => {
    console.log("Oh No Error!!");
    console.log(err);
  });






  // const recentTweetsWithNode = await client.v2.tweetCountRecent('tron', {granularity: "day"});
  // console.log(recentTweetsWithNode.data[5].tweet_count);
  // console.log(recentTweetsWithNode.data[6].tweet_count);


Currency.find({}).then((datas) =>{
  for(let curr of datas) {
    async function asyncCall() {
      const recentTweetsWithNode = await client.v2.tweetCountRecent(`${curr.id}`, {granularity: "day"});
      console.log(recentTweetsWithNode.data[6].tweet_count);
    }
    asyncCall();
  }
} );



  
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

