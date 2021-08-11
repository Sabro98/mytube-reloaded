import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true, unique: true },
  avartarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, trim: true, unique: true },
  password: { type: String, trim: true },
  name: { type: String, required: true },
  location: String,
});

userSchema.pre("save", async function () {
  if (this.password) this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;
