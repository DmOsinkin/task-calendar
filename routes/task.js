var express = require('express');
var router = express.Router();
var Task = require('../models/Task.js');

/* GET ALL BOOKS */
router.get('/', function (req, res, next) {
  Task.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function (req, res, next) {
  Task.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET BOOKS BY DATE */
router.get('/:year/:month/:day', function (req, res, next) {
  var startDate = new Date(req.params.year, req.params.month, req.params.day); // this is the starting date that looks like ISODate("2014-10-03T04:00:00.188Z")

  startDate.setSeconds(0);
  startDate.setHours(0);
  startDate.setMinutes(0);

  var dateMidnight = new Date(startDate);
  dateMidnight.setHours(23);
  dateMidnight.setMinutes(59);
  dateMidnight.setSeconds(59);

  var query = {
    end_date: {
      $gte: startDate,
      $lte: dateMidnight
    }
  };

  Task.find(query, function (err, products) {
    if (err) return next(err);
    console.log("==============================\n" + products + "\n==============================");
    res.json(products);
  });
});

/* SAVE BOOK */
router.post('/', function (req, res, next) {
  Task.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE BOOK */
router.put('/:id', function (req, res, next) {
  Task.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function (req, res, next) {
  Task.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;