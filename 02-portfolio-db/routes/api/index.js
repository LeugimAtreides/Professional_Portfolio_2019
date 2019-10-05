import express from 'express';
import userRouter from './users';
import projectRouter from './projects';
import adminRouter from './admin';

const apiRouter = express.Router();

apiRouter.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

apiRouter.use('/users', userRouter);
apiRouter.use('/projects', projectRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.get('/health', (req, res) => {
    res.status(200).json({
        health: 'OK'
    });
});
apiRouter.use('*', (req, res, next) => {
    res.status(404).json({
        code: '404 not found'
    })
})

export default apiRouter;