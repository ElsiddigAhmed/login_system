const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: { type: Schema.Types.String, required: true, min: 3, max: 15 },
  email: { type: Schema.Types.String, unique: true, required: true },
  phone: { type: Schema.Types.Number, required: true },
  address: { type: Schema.Types.String, required: true },
  gender: { type: Schema.Types.String, required: true },
  password: { type: Schema.Types.String, required: true },
  // you can put as much data as you want here, its totally depend on your scenario
});

module.exports = model("user", UserSchema);
