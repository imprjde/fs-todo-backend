const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  todoTitle: { type: String, required: true },
  createdOn: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
  isDone: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const virtual = todoSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

todoSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Todo = mongoose.model("Todo", todoSchema);

