import express from 'express';
import userController from '../../db/controllers/userController';
import Logger from '../../db/controllers/Logger';

const userRouter = express.Router();

userRouter.get('/genVistorKey/:id', async (req, res) => {
    try {
        const key = await userController.genVistorKey(req.params.id);
        Logger.info(`Generated new key for ID: ${req.params.id}`);
        return res.status(200).json(key);
    } catch (err) {
        Logger.info(err.message)
        return res.status(400).json(`gen key failed for ID: ${req.params.id}`);
    }
})

userRouter.get('/me,', async (req, res) => {
    try {
        const user = await userController.getUserByVistorKey(req.user.key);
        return res.status(200).json(user);
    } catch (err) {
        Logger.error('Error in GET: users/me');
        console.log(err);
        return res.status(500).json({ error: err.message })
    }
})

export default userRouter;