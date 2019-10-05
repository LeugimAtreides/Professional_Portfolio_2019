import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import randomGenerator from "crypto-random-string";
import Logger from "./Logger";

const User = mongoose.model("User");
const { SECRET } = process.env;

export default {
  async genVistorKey(id) {
    const key = await randomGenerator(256);
    await User.findOneAndUpdate(
      { _id: id },
      { VisitorKey: key },
      {
        useFindAndModify: false,
        new: true,
        runValidators: true
      }
    );
    return { VisitorKey: key };
  },

  async getUserByVistorKey(key) {
    return User.findOne({ VisitorKey: key });
  },

  async deleteUser(_id) {
    return User.deleteOne({ _id });
  },

  async createToken(userObj) {
    const token = jwt.sign(
      {
        id: userObj._id,
        isMe: userObj.isMe
      },
      SECRET
    );
    return token;
  }
};
