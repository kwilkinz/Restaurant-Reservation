const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

/**
 * Defines the router for reservation resources.
 */

// - US-02 - return list of all movies
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

// - retrives reservation id 
router.route("/:reservation_id")
    // .get()
    // .put()
    .all(methodNotAllowed);

// - US-06 - displays status of the reservation
router.route("/:reservation_id/status")
    // .put()
    .all(methodNotAllowed);

module.exports = router;
