const path = require("path");
const router = require("express").Router();
const projectRoutes = require("./projects");

// Project Routes
router.use("/projects", projectRoutes);

// Render the html page otherwise
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"))
});

module.exports = router;