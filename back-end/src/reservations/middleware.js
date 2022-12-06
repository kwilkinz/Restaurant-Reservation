const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// middleware (valid properties, booked, valid day)
// reservation exists

// from utils api 
const dateFormatted = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
const timeFormatted = /[0-9]{2}:[0-9]{2}/;

// valid Days 
const days = [
    "Sunday",
    "Monday", 
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

// Valid Properties
const validProperties = [
    "first_name", 
    "last_name", 
    "mobile_number", 
    "people",
    "reservation_date",
    "reservation_time",
];

