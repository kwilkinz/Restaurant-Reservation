import React, { useEffect, useState } from "react";
import { listTables, listReservations, freeTable } from "../utils/api";
import { next, previous, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
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
 

  const history = useHistory();
  
  // fetches date from Url query 
  const query = useQuery().get("date");
  if (query) {date = query}

  useEffect(loadDashboard, [date]);
  

  // Fetch - all reservations by date from the database.
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);

    listReservations({ date }, abortController.signal) 
      .then(setReservations)
      .catch(setReservationsError);
    // listTables({}, abortController.signal) // not implemented in backend yet
    //   .then(setTables)
    return () => abortController.abort();
  };

  // Handler to clear a table
  async function finishedHandler(event) {
    const abortController = new AbortController();
    event.preventDefault();
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
      await freeTable(event.target.name, abortController.signal);
      history.go(0);
    };
  };

 
// UI
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4> 
      </div> 
        
        <button className="btn btn-dark" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}> Previous </button>
        <button className="btn btn-info" onClick={() => history.push(`/dashboard?date=${today(date)}`)}> Today </button>
        <button className="btn btn-dark" onClick={() => history.push(`/dashboard?date=${next(date)}`)}> Next </button>

      <div>
        <ViewAllReservation reservations={reservations}/>
      </div>
        <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
