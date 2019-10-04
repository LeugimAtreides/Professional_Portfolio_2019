import mongoose from "mongoose";
import Logger from "./Logger";

const Project = mongoose.model("Project");

export default {
  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      Logger.info("Project ID format is invalid");
    }
    return Promise.reject(new Error("Invalid Company ID"));
  },

  async getAll() {
    return Project.find({})
  },

  async deleteById(id) {
      if (!mongoose.Types.ObjectId.isValid(id)){
          Logger.info('Project ID is invalid');
          return Promise.reject(new Error('Invalid Project ID'));
      }
      return Project.findOneAndUpdate(
          {_id: id},
          { deleted: true },
          {
              useFindAndModify: false,
              new: true,
              runValidators: true
          }
      )
  },

  async deleteAll() {
      return Project.updateMany({}, { deleted: true });
  }
};
