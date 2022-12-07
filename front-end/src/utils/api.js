/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}


/**
 * clears a table based on the table id.
 */
export async function clearTable(table_id, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const options = {
    method: "DELETE",
    headers,
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * creates a new reservation.
 */
export async function createReservation(reservation, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
  return await fetchJson(url, options, reservation);
}




/**
 * creates a new reservation.
 */
export async function createTable(table, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: table }),
    signal,
  };
  return await fetchJson(url, options, table);
}





/**
 * reads reservations.
 */
export async function readReservation(reservation_id, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}`);
  return await fetchJson(url, { headers, signal }, {});
}


/**
 * creates a new seat reservation.
 */
export async function seatReservation(reservation_id, table_id, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { reservation_id: reservation_id } }),
    signal,
  };
  return await fetchJson(url, options, {});
}


export async function updateReservation(reservation, signal) {
  const url = new URL(
    `${API_BASE_URL}/reservations/${reservation.reservation_id}`
  );
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
  return await fetchJson(url, options, reservation);
}


/**
 * Updates the status of a reservation
 * @param reservation_Id
 * The reservation ID for the reservation
 * @param status
 * An object containing {status: "message"} that updates the status field of a reservation
 * @param signal
 * An optional abort signal
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function statusUpdate(reservationId, status, signal) {
  const url = `${API_BASE_URL}/reservations/${reservationId}/status`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(status),
    signal,
  };
  return await fetchJson(url, options)
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Retrieves all reservations of a certain date.
 * @param reservation_date
 * A date in YYYY-MM-DD format
 * @param signal
 * An optional abort signal
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

 export async function readByDate(reservation_date, signal) {
  const url = `${API_BASE_URL}/reservations/ByDate?reservation_date=${reservation_date}`;
  return await fetchJson(url, { signal })
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Unoccupy a table in the database.
 * @param tableId
 * The table_id for the table to be unseated. It's status field will be changed to "Free"
 * @param signal
 * An optional abort signal
 */

// --- IN USE on DASHBOARD

 export async function freeTable(id, signal){
  const url = new URL(`${API_BASE_URL}/tables/${id}/seat`);
  const destroy = {data: {
    table_id: parseInt(id)
   }}
   return await fetchJson(url, {signal, method: 'DELETE', body: JSON.stringify(destroy), headers});
  }

/**
 * retrieves all existing tables.
 */
 export async function listTables(params, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  return await fetchJson(url, { headers, signal }, []);
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */
 export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

// Dashboard - ViewReservations
export async function cancelReservation(id, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${id}/status`)
  const cancel = {data: { status: "cancelled" }}

  return await fetchJson(url, {signal, method: 'PUT', body: JSON.stringify(cancel), headers})
}