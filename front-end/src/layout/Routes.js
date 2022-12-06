import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./errors/NotFound";
import { today } from "../utils/date-time";
import NewReservation from "./components/reservation/NewReservation";

/**
 * Defines all the routes for the application.
 */
function Routes() {
// useStates 
  const [date, setDate] = useState(today());

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>

      {/* This links to dashboard */}
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>


      {/* links to New Reservation */}
      <Route exact={true} path="/reservations/new">
        <NewReservation />
      </Route>

      {/* This links to Search */}

      {/* This links to New Table */}


      <Route path="/dashboard">
        <Dashboard date={date} setDate={setDate}/>
      </Route>

      {/* Not Found */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
