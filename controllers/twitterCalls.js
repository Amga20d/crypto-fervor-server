import {TwitterApi} from 'twitter-api-v2';
import mongoose from "mongoose";
import Currency from "../models/CurrencyModel.js";


mongoose
  .connect("mongodb://localhost:27017/currency", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Open With Mongodb!");
  })
  .catch((err) => {
    console.log("Oh No Error!!");
    console.log(err);
  });

  const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAEYUaAEAAAAAOXUV45gabVAEBjqs7Z35nagQ6vI%3DS54tmnCcIBlC6KTeP9rd9nc2vdrHD8md5yfHgjKeTiHmkAey9G');

  const sleep = (mili) => {
      return new Promise(resolve => setTimeout(resolve, mili))
    };
    
    //doing twitter calls by looping through db 
Currency.find({}).then((datas) =>{
  async function asyncCall() {
  for(let curr of datas) {
    await sleep(500);
      const recentTweetsWithNode = await client.v2.tweetCountRecent(`${curr.name}`, {granularity: "day"});
      
      Currency.updateOne(
        { id: curr.id },
        { prevCount: recentTweetsWithNode.data[5].tweet_count,
          currCount: recentTweetsWithNode.data[6].tweet_count,
        }
            ).then((data) => {
              console.log("data seeded");
            }); 


    }}

    asyncCall();
  
} );