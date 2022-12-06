import React, { useState } from "react";
import { updateStatus } from "../utils/api";
import ErrorAlert from "../layout/errors/ErrorAlert";

function ViewAllReservation({ reservation }) {
  // useStates
  const [showError, setShowError] = useState(null);

  // Canceling a reservation
  async function handleCancel(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const message =
      "Do you want to cancel this reservation? This cannot be undone.";
    if (window.confirm(message)) {
      try {
        await updateStatus(
          reservation.reservation_id,
          "cancelled",
          abortController.signal
        );
        window.location.reload(true);
      } catch (error) {
        if (error.name !== "AbortError") setShowError(error);
      }
    }
  }

  // UI
  return (
    <div>
      <p> {reservation.status} </p>
      <p> Name: {reservation.first_name} {reservation.last_name}
      </p>
      <p> Mobile: {reservation.mobile_number}</p>
      <p> Party Size: {reservation.people} </p>
      <p>

        {reservation.reservation_date} at {reservation.reservation_time}{" "}
      </p>

      <div>
        {reservation.status === "booked" ? (
          <button >
            <a
              href={`/reservations/${reservation.reservation_id}/seat`}
              style={{ color: "white", textDecoration: "none" }}
            > Seat
            </a>
          </button>
        ) : null}
        <button>
          <a
            href={`/reservations/${reservation.reservation_id}/edit`}
            style={{ color: "white", textDecoration: "none" }}
          >
            Edit
          </a>
        </button>
        <button
          data-reservation-id-cancel={reservation.reservation_id}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>

      <ErrorAlert error={showError} />
    </div>
  );
}

export default ViewAllReservation;
