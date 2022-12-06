const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/")
    // .get()
    // .post()
    .all(methodNotAllowed);

router.route("/:table_id")
    // .get()
    .all(methodNotAllowed);

router.route("/:table_id/seat")
    // .put()
    // .delete()
    .all(methodNotAllowed);

module.exports = router;