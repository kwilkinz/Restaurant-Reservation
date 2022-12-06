const service = require("./tables.service");
const reservationService = require("../reservations/reservation.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// ================ middleware ===================
const validProperties = ["capacity", "table_name"];

// hasValidProperties 
function hasValidProperties(req, res, next) {
    const { data } = req.body; 
    if (!data) {
        return next({
            status: 400,
            message: "requries information in body"
        });
    };
};

// What are the valid properties? 

// what about seats? notSeated?
// reservationExists
// seatTable 
// tableExists & if its occupied by tableBusy
// validRequest + validTable
// ===============================================

//create 

// list 

// read

