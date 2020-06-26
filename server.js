var express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require("path");
const workout = require("./models/workout.js")


const PORT = process.env.PORT || 3000;

const db = require("./models");

var app = express();


app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
//require("./routes/api-routes.js")(app);
//require("./routes/html-routes.js")(app);



mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutnew", { useNewUrlParser: true });

//db.workout.create({ name: "Workout FUNN" })
 // .then(dbexersise => {
 //   console.log(dbexersise);
 // })
 // .catch(({message}) => {
 //   console.log(message);
 // });


 app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

  app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "../develop/public/exercise.html"));
  });

  app.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "../develop/public/stats.html"));
  });


  app.put("/api/workouts/:id", (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
  
  workout.update({
  
      _id: req.params.id
      },
  
      {
      $push: { exercises: req.body }
      }
  
      ).then(function (Workout) {
          res.json(Workout)
      })
  });



app.get("/api/workouts", (req, res) => {
  
  workout.find({})
      .then(dbWorkout => {
          res.json(dbWorkout)
      })
      .catch(err => {
          res.status(400).json(err);
      });
});



app.post("/api/workouts", (req, res) => {
  workout.create({
    type: req.body.type,
    name: req.body.name,
    duration: req.body.duration,
    weight: req.body.weight,
    reps: req.body.reps,
    sets: req.body.sets,
    distance: req.body.distance


  })
  .then(function(dbWorkout) {
    res.json(dbWorkout);
  });
});


app.get("/api/workouts/range", (req, res) => {
  
  workout.find({})
      .then(dbWorkout => {
          res.json(dbWorkout)
      })
      .catch(err => {
          res.status(400).json(err);
      });
});



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});