import React, { useState } from "react";
import FormInputs from "../component/FormInputs";
import Buttons from "../component/Buttons";
import axios from "axios";

function DeleteForm() {
  const [name, setName] = useState("");
  const [responseMessage, setResponseMessage] = useState(""); // State for response message

  const submit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with:", { name });
    try {
      const response = await axios.delete("http://localhost:8000/delete", {
        data: { name },
      });
      console.log("Response:", response.data);
      setResponseMessage(response.data.message); // Set the response message
      setName("");
    } catch (e) {
      console.log("Error:", e);
      setResponseMessage("Error deleting product"); // Set error message
    }
  };

  return (
    <div className="container d-flex justify-content-center flex-column">
      <h1>Delete product</h1>
      <form onSubmit={submit} className="form-floating">
        <FormInputs
          type="text"
          className="form-control"
          name="name"
          id="proName"
          placeHolder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Product Name"
        />
        <Buttons
          className="btn btn-primary"
          type="submit"
          name="submit"
          label="Delete"
        />
        {responseMessage && (
          <div className="alert alert-info mt-3" role="alert">
            {responseMessage}
          </div>
        )}
      </form>
    </div>
  );
}

export default DeleteForm;
