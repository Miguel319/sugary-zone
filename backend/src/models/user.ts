const bcrypt = require("bcryptjs");
import mongoose from "mongoose";
const jwt = require('jsonwebtoken');
import variables from '../../variables';

const { JWT_SECRET, JWT_EXPIRE } = variables;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      min: [3, "The username must have at least 3 characters."],
      max: [15, "The username can't have more than 15 characters."]
    },
    email: {
      type: String,
      required: [true, "The email field is mandatory."],
      unique: true
    },
    password: {
      type: String,
      required: [true, "The password field is mandatory."],
      select: false,
      min: [5, "The password must have at least 5 characters."],
      max: [25, "The password can't have more than 25 characters."]
    },
    passwordConfirmation: {
      type: String,
      select: false
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function(next: any) {
  const salt = await bcrypt.genSalt(10);
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function(password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJWTToken = function() {
  return jwt.sign({
    id: this.id
  }, 
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  );

}

const User = mongoose.model("User", UserSchema);

export default User;
