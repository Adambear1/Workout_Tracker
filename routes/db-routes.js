require("dotenv").config();
const router = require("express").Router();
const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout_tracker",
  { useNewUrlParser: true, useFindAndModify: false }
);
// Get
router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
// Get One
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .sort({ day: -1 })
    .limit(1)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
// Post
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch(({ message }) => {
      res.send(message);
      console.log(message);
    });
});
// Update One
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
    { upsert: true, new: true }
  )
    .then((data) => {
      let duration = data.calcDuration();
      db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { totalDuration: duration } }
      ).then((updated) => {
        res.json(updated);
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
