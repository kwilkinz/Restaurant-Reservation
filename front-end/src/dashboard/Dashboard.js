import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { next, previous, today } from "../utils/date-time";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../layout/errors/ErrorAlert";
import ViewAllReservation from "./ViewReservations";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 */

function Dashboard({ date }) {

  // useStates
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  const history = useHistory();


  // to get the date to change
  useEffect(() => {
   
  }, []);
  useEffect(loadDashboard, [date]);
  


  // calls the listReservations from utils.api
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  };

  // reservations List - print all the reservations 
  const reservationList = reservations.map((reservation) => {
    if (reservation.status === "finished" || reservation.status === "canceled") return null;
    <ViewAllReservation key={reservation.reservation_id} reservation={reservation} />   
  });

  // tables List 
  const tablesList = tables.map((table) => {
    // have a table View here > key={table.table_id} table={table}
  });

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <button className="btn btn-info" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}> Previous </button>
        <button className="btn btn-info" onClick={() => history.push(`/dashboard?date=${today(date)}`)}> Today </button>
        <button className="btn btn-info" onClick={() => history.push(`/dashboard?date=${next(date)}`)}> Next </button>
      </div>
      <div>
        <h2>Reservations for {date} </h2>
      </div>

      <div>
        <div className="container fluid">{reservationList}</div>
      </div>

      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
    </main>
  );
}

export default Dashboard;
