const fs = require("fs");
const model = require("../model/ProfileImage");
const ProfileImage = model.ProfileImage;

exports.createImage = async (req, res) => {
  const profileImage = await ProfileImage.find({ userId: req.body.userId });

  if (profileImage.length > 0) {
    const updatedImage = await ProfileImage.findOneAndUpdate({
      userId: req.body.userId,
      image: req.body.image,
    });
    res.status(201).json({ message: "Profile Updated Successfully..!!" });
  } else {
    const image = new ProfileImage(req.body);
    image
      .save()
      .then((doc) => {
        res.status(201).json({ doc, message: "Profile Picture Created" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
};
