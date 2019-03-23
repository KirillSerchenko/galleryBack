const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'../gallery/build/index.html'))})


module.exports = router;