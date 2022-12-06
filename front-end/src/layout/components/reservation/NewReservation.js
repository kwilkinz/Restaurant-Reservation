import React from "react";

function NewReservation() {
  return (
    <div>
      <h1>Connected to Form</h1>
      <form >
      {/* <form name="newReservation" onSubmit={handleSubmit}> */}
        <label htmlFor="first_name"> First Name: 
        <input 
            id="first_name"
            type="text"
            name="first_name"
            // onChange={handleChange}
            
        
        /> 
        </label>

      </form>
    </div>
  );
}

export default NewReservation;
