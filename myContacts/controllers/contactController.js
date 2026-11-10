//async handler 사용 준비
//async handler 를 사용하면 async의 catch(error) 부분을 알아서 잡아줌

import expressAsyncHandler from "express-async-handler";
const asyncHandler = expressAsyncHandler;

import Contact from "../models/contactModel.js";



//Get All contacts
//GET / contacts
export const getAllContacts = asyncHandler( async (req, res) => {
  const contacts = await Contact.find();
  res.render("index", { contacts : contacts });
});


//View add Contact form
//GET /contacts/add

export const addContactForm = (req, res) => {
  res.render("add");
};



//Create Contacts
//POST / contacts

export const createContact = asyncHandler( async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if ( !name || !email || !phone ) {
    return res.send("필수 값이 입력되지 않았습니다.");
  };

  const contact = await Contact.create({
    name,
    email,
    phone
  });

  res.redirect("/contacts");
});



//Get the Contact
//GET / contacts / id

export const getContact = asyncHandler( async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("update", { contact : contact });
});

//Update the Contact
//PUT / contacts / id

export const updateContact = asyncHandler( async (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new error("Contact not found.");
  }

  //해당 id의 기존값을 요청값으로 바꿔주기
  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  await contact.save(); // 변경된 정보 저장

  res.redirect("/contacts");
});

//Delete the Contact
//DELETE / contacts / id

export const deleteContact = asyncHandler( async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);

  res.redirect("/contacts");
});
