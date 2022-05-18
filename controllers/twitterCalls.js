import {TwitterApi} from 'twitter-api-v2';
import mongoose from "mongoose";
import "dotenv/config.js"
import Currency from "../models/CurrencyModel.js";


mongoose
  .connect(process.env.MONGO_API, {
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

  const client = new TwitterApi(process.env.TWITTER_API);

  const sleep = (mili) => {
      return new Promise(resolve => setTimeout(resolve, mili))
    };
    
    //doing twitter calls by looping through db 

function twitterCalls() {Currency.find({}).then((datas) =>{
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
            }).catch((err) => {
              console.log("Oh No Error with updating twitter calls!!");
              console.log(err);
            });; 


    }}

    asyncCall();
  
} )
.catch((err) => {
  console.log("Oh No Error withe twitter calls!!");
  console.log(err);
});;};




export default twitterCalls;