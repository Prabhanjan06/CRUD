import React, { useState } from "react";
import FormInputs from "../component/FormInputs";
import Buttons from "../component/Buttons";
import axios from "axios";

function CrudForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [responseMessage, setResponseMessage] = useState(""); // State for response message

  const submit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with:", { name, price });

    try {
      const response = await axios.post("http://localhost:8000/create", {
        name,
        price,
      });
      console.log("Response:", response.data);
      setResponseMessage(response.data.message); // Set the response message
      setName("");
      setPrice("");
    } catch (e) {
      console.log("Error:", e);
      setResponseMessage("Error creating product"); // Set error message
    }
  };

  return (
    <div className="container d-flex justify-content-center flex-column">
      <h1>Products</h1>
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
        <FormInputs
          type="number"
          className="form-control"
          name="price"
          id="price"
          placeHolder="Enter product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          label="Price"
        />
        <Buttons
          className="btn btn-primary"
          type="submit"
          name="submit"
          label="Create Product"
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

export default CrudForm;
