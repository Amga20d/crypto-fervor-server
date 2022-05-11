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

  //calculating fervor and updating db.
function fervorCalc() {Currency.find({}).then((data) => {
  for(let curr of data) {
    const fervor = (100 * (curr.currCount - curr.prevCount)/curr.prevCount).toFixed(2);
    
    Currency.updateOne(
              { id: curr.id },
              { fervorChange: fervor,
                
              }
                  ).then((data) => {
                    console.log(data);
                  }).catch((err) => {
                    console.log("Oh No Error with updating fervor in db!!");
                    console.log(err);
                  });; 

  }
}).catch((err) => {
  console.log("Oh No Error with fetching db for fervor calc!!");
  console.log(err);
});;};




export default fervorCalc;