const express = require("express");
const router = express.Router();
const {getContacts,getContact, createContact, updateContact,deleteContact,getIntent }=require("../controllers/contactController")


router.route("/contacts").get(getContacts).post(createContact);

router.route("/contacts/:id").get(getContact).put(updateContact).delete(deleteContact);

router.route("/dialogflow").post(getIntent); //dialogflow route


// router.route("/name").delete((req,res) => {   //use as query parameter
//     // const userName=req.query.name;
//     res.status(200).json({
//         message:`Delete contact for ${req.query.nameid}`})

// });

module.exports=router;