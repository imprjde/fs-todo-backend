const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileImageSchema = new Schema({
  image: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const virtual = profileImageSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

profileImageSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.ProfileImage = mongoose.model("ProfileImage", profileImageSchema);
