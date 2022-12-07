const knex = require("../db/connection");

//list 
const list = (knex) => {
    return knex("reservations")
        .select("*");
};


// read(reservation_id)
const read = (knex, reservation_id) => {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first();
};

// create(reservation)
const create = (knex, reservation_id) => {
    return knex("reservations")
        .insert(reservation)
        .returning("*");
};

// update(reservation)
const update = (knex, reservation_id, updatedRes) => {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .update(updatedRes, "*");
};

// list the reservations by certain dates 
const listByDate = (knex, date) => {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .whereNot({ status: "Finished" })
        .whereNot({ status: "Cancelled" })
        .orderBy("reservation_time", "asc");
}

// Search 
const search = () => {
    return knex() 
}


// delete the corresponding reservation id
const destroy = () => {
    return knex("reservations")
        .where({ reservation_id })
        .del();
};

module.exports = {
    list, 
    read,
    create,
    update,
    listByDate,
    search,
    destroy,
};