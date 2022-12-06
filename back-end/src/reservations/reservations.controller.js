const service = require("./reservation.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// from utils api 
const dateFormatted = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
const timeFormatted = /[0-9]{2}:[0-9]{2}/;

async function list(req, res) {
  res.json({
    data: [],
  });
}

// Create 

// middleware (valid properties, booked, valid day)

// 
module.exports = {
  list,
  create: asyncErrorBoundary(create),
};
