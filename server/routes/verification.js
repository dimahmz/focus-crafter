const express = require("express");
const router = express.Router();
const { User }=require("../models/user");
const logger = require("../middleware/logger");

router.get("/verify/:user_id/:verify_token", async (req, res) => {
  let user = await User.findById(req.params.user_id).select("name verified_account verifivation_token");
  if(!user) return res.status(400).send("invalid activation link.");

  if(user.verifivation_token != req.params.verify_token) 
      return res.status(400).send("invalid activation link!");
  if(user.verified_account) return res.status(200).send("account is already verified!");

  try{
    user= await User.findByIdAndUpdate(req.params.user_id, { "verified_account": true });
    res.status(200).send(`hi ${user.name}, you have successfully verified your account! `);
  } 
  catch(e){
    logger.error(e.message);
    res.status(500).send("an internal error occurred, could not verify account!");
  } 
});

module.exports= router;