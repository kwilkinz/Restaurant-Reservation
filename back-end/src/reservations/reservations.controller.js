const service = require("./reservation.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


// ========== ============= ====== middleware ================ ================

// Valid Properties √
const VALID_PROPERTIES = [
  "first_name", 
  "last_name", 
  "mobile_number", 
  "people",
  "reservation_date",
  "reservation_time",
  "status",
  "reservation_id",
];


// checking if the req.body has these properties  √
function hasValidProperties(req, res, next) {
  const data = ({} = req.body);
  const invalidFields = Object.keys(data).filter((field) => 
      !VALID_PROPERTIES.includes(field))
  
  if (invalidFields.length) {
      return next({
          status: 400,
          message: `Invalid field(s): ${invalidFields.join('')}`,
      });
  };
  next();
};


// Check data to make sure it matches reservation critera 
function dataValidation(req, res, next) {
  const data = ( {} = req.body);
  // add timestamp of EOD to prevent timezone errors
  let adjusteDate = data.reservation_date + "23:59:59:999Z";
  let inputDate = new Date(adjusteDate);
  let compareDate = new Date(); 
  // resetting the times to compare 
  inputDate.setHours(0,0,0,0);
  compareDate.setHours(0,0,0,0);

  //  - Conditions to be Valid - 
  // has to be 1 or more people to a party. 
  if (data.people <= 0) {
      return next({ status: 400, message: "Not enough people in party, 1 is the minimum." });
  }
  // if our input date is less than our compare date - so user cant make a date in the past.
  if (inputDate < compareDate) {
      return next({ status: 400, message: "Reservation cannot be made for a day in the past." });
  }
  // When the Restaurant is closed = No Tuesdays
  if (inputDate.getUTCDay() === 2) {
      return next({ status: 400, message: "No Reservations on Tuesdays" }); 
  }
  // When the Restaurant is Open for business = between 10:30 & 21:30 
  if (data.reservation_time < "10:30" || data.reservation_time > "21:30") {
      return next({ status: 400, message: "Reservations must be between 10:30AM and 9:30PM" });
  }
  next();
}

// Check if the Reservation exists - using Id
async function ifReservationExists(req, res, next) {
  const { reservation_id } = req.params; 
  const reservation = await service.read(reservation_id); 
  if (reservation) {
    res.locals.reservation = reservation; 
    next();
    
  }
  return next({ status: 400, message: "Reservation cannot be found." });
}

// ============= ========== ================ ================== ==============


// List all Reservations on a specific date.
async function listByDate(req, res) {
  const { reservation_date } = req.query; 
  const { reservation_id } = req.params;
  if (!reservation_date) return next({ status: 400, message: "Reservation on this Date not found."});

  const foundReservation = await service.listByDate(reservation_id, reservation_date);
  res.json({ data: foundReservation })
};


// Create 
async function create(req, res) {
  const { reservation_id } = req.params; 
  const newReservation = await service.create(reservation_id, req.body);
  if (newReservation instanceof Error) {
    return next({ message: newReservation.message });
  }
  res.status(201).json({ data: newReservation });
};


// Read an Existing Reservation - by Id
async function read(req, res) {
  const { reservation_id } = req.params; 
  const reservation = res.locals.reservation;
  res.json({ data: reservation })
};

// update()
async function update(req, res) {
  const { reservation_id } = req.params; 
  await service.update(reservation_id, req.body.data); 
  res.json({ data: await service.getUpdatedRecord(reservation_id)})
};


// update the status of the Reservation 

// search 

module.exports = {
  listByDate: [asyncErrorBoundary(listByDate)],
  create: [
    asyncErrorBoundary(hasValidProperties),
    asyncErrorBoundary(dataValidation),
    create,
  ],
  read: [asyncErrorBoundary(ifReservationExists), read ],
};
