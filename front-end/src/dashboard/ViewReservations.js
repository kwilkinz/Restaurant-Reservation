import React, { useState } from "react";

function ViewAllReservation({ reservation }) {

    // useStates
    const [showError, setShowError] = useState(null);

    // Canceling a reservation 

    // UI
    return (
        <div>
            <p> {reservation.status} </p> 
            <p> Name: {reservation.first_name} {reservation.last_name}</p>
            <p> Mobile: {reservation.mobile_number}</p>
            <p> Party Size: {reservation.people} </p>
            <p> {reservation.reservation_date} at {reservation.reservation_time} </p>
        </div>
    )
}

export default ViewAllReservation;