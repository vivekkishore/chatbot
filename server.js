const express =require("express");
const errorHandler = require("./middleware/errorhandler"); //gets added once add errorHandler for use
const connectDb = require("./config/dbconnection");
const dotenv=require("dotenv").config();

connectDb();
const app=express();
const port=process.env.PORT || 5000;


app.use(express.json());   //middleware for json object parser
app.use("/api",require("./routes/contactRoutes")); //called middleware
app.use(errorHandler);  //middleware for error handling

app.listen(port,()=> {
    console.log(`server running on port ${port}`);
});

