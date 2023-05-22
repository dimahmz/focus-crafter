const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticated");
const SettingsServices = require("../services/settingsServices")

router.put("/settings", auth, async (req, res) => {
  try{
    await SettingsServices.changeSettings(req.user._id, req.body.settingsUpdate);
    res.status(200).send("settings has been updated!");
  }catch(e){
    res.status(500).send(e.message);

  }
});