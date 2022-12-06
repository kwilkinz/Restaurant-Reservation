const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

/**
 * Defines the router for reservation resources.
 */

// - US-02 - return list of all movies
router.route("/")
    .get(controller.list)
    // .post(controller.create)
    .all(methodNotAllowed);

// - retrives reservation id 
router.route("/:reservation_id")
    // .get(controller.read)
    // .put(controller.update)
    .all(methodNotAllowed);

// - US-06 - displays status of the reservation
router.route("/:reservation_id/status")
    // .put(controller.updateStatus)
    .all(methodNotAllowed);

module.exports = router;
