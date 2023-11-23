const express = require("express");
const imageController = require("../controller/Image");
const router = express.Router();

router.post("/", imageController.createImage);

exports.router = router;
