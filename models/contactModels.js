const mongoose = require("mongoose");

const contactSchema =mongoose.Schema({
name:{
    type:String,
    required:[true, "Please add the contact name"]

},
email:{
    type:String,
    required:[true, "Please add the contact email address"]

},
phone:{
    type:String,
    required:[true,"Please add the contact number"]

}
},
{
    timestamps:true
}
);

//creation and export of model using schema
module.exports=mongoose.model("contact", contactSchema); //contact is supposed to be singular of collection