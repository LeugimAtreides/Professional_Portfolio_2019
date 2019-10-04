const mongoose = require("mongoose");
const db = require ("../models");

// this file empties the Projects collection and inserts the project seeds

mongoose.connect(
    process.env.MONGOD_URI ||
    "mongodb://localhost/portfolio",
    {
        useCreateIndex: true,
        useNewUrlParser: true,
    }
);

const projectSeed = [
    {
        name: "Pupper",
        description: "Web application designed to save videos and create playlists for pet entertainment",
        image: "client/src/assets/img/projects/pupper-homepage.png",
        technologies: ["YouTube API", "Giphy API", "Materialize", "Firebase", "HTML5", "CSS3", "jQuery", "Node.js"],
        link: "https://leugimatreides.github.io/Pupper/",
        deleted: false
    },
    {
        name: "Google Books React",
        description: "Web application that dynamically displays google books results and allows saving, and deletion of books to mongo database",
        image: "client/src/assets/img/projects/Google-Books.png",
        technologies: ["React", "Bootstrap", "Google Books API", "MongoDB", "Mongoose", "Express", "Node.js"],
        link: "https://obscure-meadow-91700.herokuapp.com",
        deleted: false
    },
    {
        name: "Stranger Things Memory Game",
        description: "Web browser game that uses sorting algorithms to randomize and keep score",
        image: "client/src/assets/img/projects/React-Memory-Game.png",
        technologies: ["React", "Bootstrap", "GitHub Pages", "Node.js"],
        link: "https://leugimatreides.github.io/19-React-Memory-Game/",
        deleted: false
    },
    {
        name: "Stargazer",
        description: "Web application that searches and organizes photos of space",
        image: "C:/Users/MVill/Documents/Get-A-Job/Portfolio/Professional_Portfolio_2019/client/src/assets/img/projects/star-gazer-app.png",
        technologies: ["Express", "Express-Handlebars", "jQuery", "Bootstrap", "Eslint", "Heroku", "Node.js"],
        link: "https://frozen-dawn-34938.herokuapp.com/",
        deleted: false
    },
    {
        name: "Eat Da Burger",
        description: "C.R.U.D App that was used to practice functionality over UI design",
        image: "client/src/assets/img/projects/node-express-handlebars-burger.png",
        technologies: ["Express, Node, Handlebars", "mySQL", "Sequelize", "Node.js"],
        link: "https://sheltered-coast-73764.herokuapp.com/",
        deleted: false
    },
    {
        name: "Salutaris",
        description: "Full-Stack Web Application that will allow users to create accounts and tracks their health data defining outcomes based on several US health census surveys",
        image: "client/src/assets/img/projects/salutaris.png",
        technologies: ["Express", "Express-Handlebars", "Bootstrap", "mySQL", "Sequelize", "Passport.js", "Node.js"],
        link: "https://quiet-shore-47733.herokuapp.com/",
        deleted: false
    },
    {
        name: "Friend Finder",
        description: "Web application that takes in user survey data to match them with other users based on compatability",
        image: "client/src/assets/img/projects/friend-finder.png",
        technologies: ["Express", "Bootstrap", "JavaScript", "Node.js"],
        link: "https://warm-bayou-31491.herokuapp.com",
        deleted: false
    },
    {
        name: "Train Scheduler",
        description: "Web application that uses Firebase databases to show train schedules",
        image: "client/src/assets/img/projects/train-schedule.png",
        technologies: ["Firebase", "Bootstrap", "Moment.js", "JavaScript", "CSS3"],
        link: "https://leugimatreides.github.io/Train-Schedule-Application/",
        deleted: false
    },
    {
        name: "Link's Crystal Collectors",
        description: "Web Browser game that uses bootstrap and jQuery to create dynamic elements",
        image: "client/src/assets/img/projects/link-crystal-collectors.png",
        technologies: ["CSS3", "jQuery", "JavaScript"],
        link: "https://leugimatreides.github.io/unit-4-game/",
        deleted: false
    },
    {
        name: "Vacation Photo Project",
        description: "First attempt at a bootstrap project with mobile responsiveness",
        image: "client/src/assets/img/projects/disney-vacation-app.png",
        technologies: ["Bootstrap, GitHub"],
        link: "https://leugimatreides.github.io/Bootstrap-portfolio/",
        deleted: false
    },
    {
        name: "Goin' Postal Website",
        description: "First project utilizing Wix website creator for local company",
        image: "client/src/assets/img/projects/goin-postal.png",
        technologies: ["Wix"],
        link: "https://www.goinpostaloviedo.com/",
        deleted: false
    },
    {
        name: "Kafitt USA Website with Webstore",
        description: "First project utilizing Wordpress along with their webstore widgets",
        image: "client/src/assets/img/projects/kafitt-usa.png",
        link: "https://kafitt-usa.com/",
        deleted: false
    }

];

db.Project
    .deleteMany({})
    .then(() => db.Project.insertMany(projectSeed))
    .then(data => {
        console.log(data + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    })