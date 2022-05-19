import axios from "axios";
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

  //to update the data //
   function Updating() {
    axios.get(process.env.COIN_API).then((res) => {
  const seed = res.data.data;

  for (let curr of seed) {
    Currency.updateOne(
      { rank: curr.rank },
      {
        id: curr.id,
        symbol: curr.symbol,
        name: curr.name,
        supply: curr.supply,
        maxSupply: curr.maxSupply,
        marketCapUsd: curr.marketCapUsd,
        volumeUsd24Hr: curr.volumeUsd24Hr,
        priceUsd: curr.priceUsd,
        changePercent24Hr: curr.changePercent24Hr,
        vwap24Hr: curr.vwap24Hr,
        explorer: curr.explorer,
      }
    ).then((data) => {
      console.log("data seeded");
    }).catch((err) => {
      console.log("Oh No Error with updating db from api!!");
      console.log(err);
    });;
  }
}).catch((err) => {
  console.log("Oh No Error with updating from api!!");
  console.log(err);
});;
  };

  




export default Updating;