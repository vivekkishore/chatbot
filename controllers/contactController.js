const asyncHandler=require("express-async-handler"); //any exception, handles it effectively
const Contact = require("../models/contactModels");
const {detectIntent} = require("../dialog");

//Creating labels
//@desc Get all contacts
//@route Get /api/contacts
//access public

const getContacts= asyncHandler(async (req,res) => {
    const contacts= await Contact.find();
    res.status(200).json(contacts);

});

//@desc Create contact
//@route POST /api/contacts
//access public

const createContact= asyncHandler (async (req,res) => {
    console.log("The request body is ",req.body);
    const{name,email,phone}=req.body;
    if (!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }

    const contact = await Contact.create(
        {
            name,email,phone
        }
    );
    res.status(201).json(contact);

});

//@desc Get contact for id
//@route GET /api/contacts/:id
//access public

const getContact= asyncHandler(async (req,res) => {

    const contact = await Contact.findById(req.params.id,{ "maxTimeMS": 5000 });

    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact); //use of :id as variable, puts value to req.params.id

});

//@desc Update contact for given id
//@route PUT /api/contacts/:id
//access public

const updateContact= asyncHandler (async (req,res) => {

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true} //this ensures updated contact is returned
    );

    res.status(200).json(updatedContact);

});

//@desc delete contact for given id
//@route DELETE /api/contacts/:id
//access public

const deleteContact=asyncHandler (async (req,res) => {
    const contact= await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne(contact, { "maxTimeMS": 5000 });
    res.status(200).json(contact);

});

//@desc chat with chatbot
//@route POST /api/dialogflow
//access public

const getIntent = asyncHandler (async (req,res) => {

    console.log("The request body is ",req.body);
    const{languageCode,queryText,sessionId}=req.body;
    if (!languageCode || !queryText || !sessionId)
    {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }

    let responseData = await detectIntent(languageCode, queryText, sessionId);

    res.status(200).json(responseData.response);

});


module.exports={getContacts,getContact, createContact, updateContact,deleteContact,getIntent };
