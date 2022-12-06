import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NewResForm from "./NewResForm";



function NewReservation() {

  const initial = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    people: 0,
    reservation_date: "",
    reservation_time: "",
    status: "",
  }

  const [form, setForm] = useState({ ...initial });
  const [showError, setShowError] = useState(false);
  const history = useHistory();
  const abortController = new AbortController();

  // Format Date
  function formatDate(date) {
    let formatDate = date.split('');
    formatDate.splice(10); 
    formatDate = formatDate.join('');
    return formatDate;
  }

  // Format Time 
  function formatTime(time) {
    let formatTime = time.split('');
    formatTime.splice(5)
    formatTime = formatTime.join('');
  }


  // handleChange for text
  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch(name) {
      case "people":
        setForm({ ...form, [name]: parseInt(value) });
        break;
      case "reservation_date":
        setForm({ ...form, [name]: formatDate(value) });
        break;
      case "reservation_time":
        setForm({ ...form, [name]: formatTime(value) });
        break; 
      default:
        setForm({ ...form, [name]: value });
    };
  };

  // Handle Submit 
  async function handleSubmit(event) {
    event.preventDefault();
    setShowError(false)
    const newRes = {
      first_name: form.first_name,
      last_name: form.last_name,
      mobile_number: form.mobile_number,
      people: Number(form.people),
      reservation_date: form.reservation_date,
      reservation_time: form.reservation_time,
      status: "booked",
    };
    try {
      // await createReservation(newRes, abortController.signal);
      setForm(initial);
      history.push(`/dashboard?date=${newRes.reservation_date}`)
    } catch (error) {
      if (error.name !== "AbortError") setShowError(error);
    }
    return () => { 
      abortController.abort();
    }
  }

  return (
    <div className="container fluid">
      {/* <ErrorAlert error={showError} /> */}
      <NewResForm 
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default NewReservation;
