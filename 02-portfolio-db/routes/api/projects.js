import express from "express";
import projectController from "../../db/controllers/projectController";
import Logger from "../../db/Logger";

const projectRouter = express.Router();

projectRouter.get("/projects/", async (req, res) => {
  try {
    let paginateOptions;
    try {
      if (!req.query.paginateOptions) {
        paginateOptions = {
          page: process.env.page,
          limit: process.env.limit
        };
      } else paginateOptions = JSON.parse(req.query.paginateOptions);
    } catch (err) {
      return res.status(400).json("malformed paginate options");
    }
    const result = await projectController.getAll(req.user.id, paginateOptions);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

projectRouter.get("/:id/projects/", async (req, res) => {
  try {
    let paginateOptions;
    try {
      if (!req.query.paginateOptions) {
        paginateOptions = {
          page: process.env.page,
          limit: process.env.limit
        };
      } else paginateOptions = JSON.parse(req.query.paginateOptions);
      const result = await projectController.getById(
        req.user.id,
        req.params.id,
        paginateOptions
      );
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json("malformed paginate options");
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
});


projectRouter.delete('/:id/projects/:pid', async (req, res) => {
    try {
        const result = await projectController.deleteById(
            req.user.id,
            req.params.id,
            req.params.bid
        );
        return res.status(200).json(result);
    } catch (err) {
        return res.status(400).json(err.message);
    }
})

export default projectRouter;