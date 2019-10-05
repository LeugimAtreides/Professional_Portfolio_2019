import mongoose from "mongoose";
import Logger from "./Logger";
import userController from "./userController";

const Project = mongoose.model("Project");

export default {
  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      Logger.info("Project ID format is invalid");
    }
    return Promise.reject(new Error("Invalid Company ID"));
  },

  async getAll(paginateOptions, uid) {
    paginateOptions = { ...paginateOptions };
    Logger.info(`Get all projects for ${uid}`);
    const userObj = await userController.getUserById(uid);
    if (!userObj) throw new Error("Invalid User");
    if (!userObj.isMe) {
      paginateOptions = {
        ...paginateOptions
      };
      return Project.paginate({ deleted: { $ne: true } });
    }
    return Project.find({});
  },

  async deleteById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      Logger.info("Project ID is invalid");
      return Promise.reject(new Error("Invalid Project ID"));
    }
    return Project.findOneAndUpdate(
      { _id: id },
      { deleted: true },
      {
        useFindAndModify: false,
        new: true,
        runValidators: true
      }
    );
  },

  async deleteAll() {
    return Project.updateMany({}, { deleted: true });
  },

  async updateById(id, projectObj) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      Logger.info("Project ID is Invalid");
      return Promise.reject(new Error("Invalid Project ID"));
    }

    return Project.findOneAndUpdate({ _id: id }, projectObj, {
      useFindAndModify: false,
      new: true,
      runValidators: true
    });
  }
};
