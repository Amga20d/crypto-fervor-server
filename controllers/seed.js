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


 //to seed the data 
 axios.get("https://api.coincap.io/v2/assets").then((res) => {
   const seed = res.data.data;
 
   Currency.insertMany(seed).then((data) => {
     console.log('seeded')
   }) });