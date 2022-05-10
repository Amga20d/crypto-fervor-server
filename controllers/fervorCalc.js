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

  //calculating fervor and updating db.
Currency.find({}).then((data) => {
  for(let curr of data) {
    const fervor = Math.round(100 * (curr.currCount - curr.prevCount)/curr.prevCount);
    
    Currency.updateOne(
              { id: curr.id },
              { fervorChange: fervor,
                
              }
                  ).then((data) => {
                    console.log(data);
                  }); 

  }
});