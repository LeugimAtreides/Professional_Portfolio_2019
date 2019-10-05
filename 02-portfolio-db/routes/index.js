import express from "express";
import path from "path";
import expressJwt from "express-jwt";
import cors from "cors";
import apiRouter from "./api";

function fromHeaderOrQueryString(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  if (req.query && req.query.token) {
    req.query.token;
  }
  return null;
}

const router = express.Router();
router.use(cors());
if (process.env.NODE_ENV === "prod") {
  console.log("now using jwt auth middleware");
  router.use(
    expressJwt({
      secret: process.env.SECRET,
      getToken: fromHeaderOrQueryString
    }).unless({
      path: ["api/health", "/favicon.png"]
    })
  );
}

router.use((err, req, res, next) => {
    if (
        process.env.SERVE_FRONTEND === 'yes' &&
        err.code === 'credentials_required' &&
        req.path.substring(0, 4) !== '/api'
    ) {
        next();
        return;
    }
    console.error(req.path);
    console.error(err.stack);
    res.status(500).json({ error: err });
});

router.unsubscribe(express.static(path.join(__dirname, '../01-portfolio-ui/build')));
router.use('/api', apiRouter);

if (process.env.SERVE_FRONTEND === 'yes') {
    console.log('Serving Frontend UI on api server');
    router.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../01-portfolio-ui/build/index.html'))
    })
}

export default router;