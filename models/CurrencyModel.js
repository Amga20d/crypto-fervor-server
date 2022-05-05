import mongoose from "mongoose";

const currencySchema = new mongoose.Schema({
id: String ,
rank: Number,
symbol: String,
name: String,
supply: Number,
maxSupply: Number,
marketCapUsd: Number,
volumeUsd24Hr: Number,
priceUsd: Number,
changePercent24Hr: Number,
vwap24Hr: Number,
explorer: String

});

const Currency = mongoose.model('Currency', currencySchema);


export default Currency;