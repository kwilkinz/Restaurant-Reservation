import React from "react";
import { useHistory } from "react-router-dom";

function NewResForm({ form, handleChange, handleSubmit }) {
    const history = useHistory(); 

    return (
        <div>
          <h1>Make a New Reservation</h1>
          <form className="d-flex flex-column" onSubmit={handleSubmit}>
            {/* First Name */}
            <label htmlFor="first_name"> First Name: </label>
            <input
              className="form-control my-1"
              id="first_name"
              type="text"
              name="first_name"
              onChange={handleChange}
              value={form["first_name"]}
              placeholder="Jane"
            />
    
            {/* Last Name */}
            <label htmlFor="last_name"> Last Name: </label>
            <input
              className="form-control my-1"
              id="last_name"
              type="text"
              name="last_name"
              onChange={handleChange}
              value={form["last_name"]}
              placeholder="Doe"
            />
    
            {/* Phone Number */}
            <label htmlFor="mobile_number"> Phone Number: </label>
            <input
              className="form-control my-1"
              id="mobile_number"
              type="tel"
              name="mobile_number"
              onChange={handleChange}
              value={form["mobile_number"]}
              placeholder="(---) --- ----"
            />
    
            {/* Reservation Date */}
            <label htmlFor="reservation_date"> Reservation Date: </label>
            <input
              className="form-control my-1"
              id="reservation_date"
              type="date"
              name="reservation_date"
              onChange={handleChange}
              value={form["reservation_date"]}
              pattern="\d{4}-\d{2}-\d{2}"
              placeholder="YYYY-MM-DD"
            />
    
             {/* Time Reservation */}
             <label htmlFor="reservation_time"> Reservation Time: </label>
            <input
              className="form-control my-1"
              id="reservation_time"
              type="time"
              name="reservation_time"
              onChange={handleChange}
              value={form["reservation_time"]}
              pattern="[0-9]{2}:[0-9]{2}"
              placeholder="HH:MM"
            />
    
             {/* People in Reservation */}
             <label htmlFor="people"> People In Party: </label>
            <input
              className="form-control my-1"
              id="people"
              type="number"
              name="people"
              onChange={handleChange}
              value={form["people"]}
              min={1}
              placeholder="2"
            />
    
            {/* Submit Button */}
            <button className="btn btn-primary"> Submit </button>
    
            {/* Cancel Button goes back previous page */}
            <button className="btn btn-secondary" onClick={() => history.goBack()}> Cancel </button>
          </form>
        </div>
      );
}

export default NewResForm;