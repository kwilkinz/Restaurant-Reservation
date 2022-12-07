import React from "react";
import { useHistory, Link } from "react-router-dom";
import { cancelReservation } from "../utils/api"; 

function ViewAllReservation({ reservations }) {

  const history = useHistory();

  //Canceling a reservation
  async function cancelReservation(res) {
    const abortController = new AbortController();

    if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
      await cancelReservation(res, abortController.signal) 
      history.go(0);
    };
  };


  return (
    <div>
      <h1>hi there</h1>
      {reservations.map((res) => (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{`${res.first_name} ${res.last_name} party of ${res.people}`}</h5>
            <p className="card-text">Reserved at: {res.reservation_time}</p>
            <p data-reservation-id-status={res.reservation_id}>{res.status}</p>
            {res.status === "Booked" && <a href={`/reservations/${res.reservation_id}/seat`}><button>seat</button></a>}
            <button name={res.reservation_id} data-reservation-id-cancel={res.reservation_id} onClick={() => cancelReservation(res.reservation_id)}>Cancel</button>
            <Link to={`/reservations/${res.reservation_id}/edit`}><button>Edit</button></Link>
          </div>
        </div>
      ))}
  </div>
  )
};

export default ViewAllReservation;
