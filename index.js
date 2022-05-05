import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import Currency from "./models/CurrencyModel.js";

const app = express();

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

// const newData = [
//     {
//         _id: "ethereum",
//         rank: "2",
//         symbol: "ETH",
//         name: "Ethereum",
//         supply: "119880438.7490000000000000",
//         maxSupply: null,
//         marketCapUsd: "313228751163.6303119819161928",
//         volumeUsd24Hr: "8329228723.7507440706627783",
//         priceUsd: "2612.8428827279642807",
//         changePercent24Hr: "2.8034642781265238",
//         vwap24Hr: "2564.3688417347285146",
//         explorer: "https://etherscan.io/",

//       },
//       {
//         _id: "tether",
//         rank: "3",
//         symbol: "USDT",
//         name: "Tether",
//         supply: "80029556459.0952900000000000",
//         maxSupply: null,
//         marketCapUsd: "80172914816.1241230151681820",
//         volumeUsd24Hr: "25598388830.9448151677229918",
//         priceUsd: "1.0017913176502747",
//         changePercent24Hr: "0.0104642188215222",
//         vwap24Hr: "1.0004199917025462",
//         explorer: "https://www.omniexplorer.info/asset/31",

//       },
//       {
//         _id: "binance-coin",
//         rank: "4",
//         symbol: "BNB",
//         name: "BNB",
//         supply: "166801148.0000000000000000",
//         maxSupply: "166801148.0000000000000000",
//         marketCapUsd: "64408427417.0368197723496960",
//         volumeUsd24Hr: "628008172.2928194683953300",
//         priceUsd: "386.1389935819675520",
//         changePercent24Hr: "0.5990191979214473",
//         vwap24Hr: "383.3175063991919219",
//         explorer:
//           "https://etherscan.io/token/0xB8c77482e45F1F44dE1745F52C74426C631bDD52",

//       }
// ];

// for (let curr of newData){
//     Currency.updateOne(
//    {_id: curr._id},{
//     rank: curr.rank,
//     symbol: curr.symbol,
//     name: curr.name,
//     supply: curr.supply,
//     maxSupply: curr.maxSupply,
//     marketCapUsd: curr.marketCapUsd,
//     volumeUsd24Hr: curr.volumeUsd24Hr,
//     priceUsd: curr.priceUsd,
//     changePercent24Hr: curr.changePercent24Hr,
//     vwap24Hr: curr.vwap24Hr,
//     explorer: curr.explorer }
//     ).then(data => {
//         console.log("data seeded")
//         console.log(data)
//     })

// };
// (async ) axios.get("https://api.coincap.io/v2/assets").then((res) => {
//     return res.data;
// }).then(sa => {
//     Currency.insertMany(sa).then( datas => {
//         console.log(datas)
//     })
// })
axios.get("https://api.coincap.io/v2/assets").then((res) => {
    const seed = res.data.data;

    for (let curr of seed){
            Currency.updateOne(
           {id: curr.id},{
            rank: curr.rank,
            symbol: curr.symbol,
            name: curr.name,
            supply: curr.supply,
            maxSupply: curr.maxSupply,
            marketCapUsd: curr.marketCapUsd,
            volumeUsd24Hr: curr.volumeUsd24Hr,
            priceUsd: curr.priceUsd,
            changePercent24Hr: curr.changePercent24Hr,
            vwap24Hr: curr.vwap24Hr,
            explorer: curr.explorer }
            ).then(data => {
                console.log("data seeded")
                
            })
        }
});



// Currency.insertMany(seed).then(data => {
//             console.log("data seeded")
//             console.log(data)
//         });
