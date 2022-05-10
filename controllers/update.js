import axios from "axios";
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

   function Updating() {
    axios.get("https://api.coincap.io/v2/assets").then((res) => {
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
    });
  }
});
  };

  //to update the data //




export default Updating;