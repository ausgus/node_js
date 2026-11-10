import express from "express";
export const router = express.Router();

import { getAllContacts, createContact, getContact, updateContact, deleteContact, addContactForm } from "../controllers/contactController.js";


router.route("/")
  .get(getAllContacts)
  .post(createContact);


// /contacts/add
router.route("/add")
  .get(addContactForm)
  .post(createContact);


router.route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);
