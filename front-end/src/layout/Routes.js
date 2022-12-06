import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./errors/NotFound";
import { today } from "../utils/date-time";
import NewReservation from "./components/reservation/NewReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
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
        <Dashboard date={today()} />
      </Route>

      {/* Not Found */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
