const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

/**
 * Defines the router for reservation resources.
 * URL = "/"
 */

// - return list of all movies
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;
