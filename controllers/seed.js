import axios from "axios";
import mongoose from "mongoose";
import Currency from "../models/CurrencyModel.js";




mongoose
  .connect("mongodb+srv://Amga20d:202601Amgad@cluster0.73wf9.mongodb.net/currency?retryWrites=true&w=majority", {
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
   }) }).catch((err) => {
    console.log("Oh No Error with seeding!!");
    console.log(err);
  });;
