import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/errors/ErrorAlert";
import viewAllReservation from "./ViewReservations";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  //
  


  // calls the listReservations from utils.api
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  // loop through the list to print all the reservations 
  const reservationList = reservations.map((reservation, index) => {
    if (reservation.status === "finished" || reservation.status === "canceled") return null;
    <viewAllReservation key={index} reservation={reservation} />   
  })

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
        <button className="btn btn-info px-3 py-2"> Previous </button>
        <button className="btn btn-info px-3 py-2"> Next </button>
        <button className="btn btn-info px-3 py-2"> Today </button>
      </div>
      <div>
        <div className="container fluid">{reservationList}</div>
      </div>

      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
