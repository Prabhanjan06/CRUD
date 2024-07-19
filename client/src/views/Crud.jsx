import React, { useState } from "react";
import FormInputs from "../component/FormInputs";
import Buttons from "../component/Buttons";
import axios from "axios";

function Crud() {
  const [endPoint, setEndPoint] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [responseMessage, setResponseMessage] = useState(""); // State for response message
  const [label, setLabel] = useState("");
  const [rest, setRest] = useState("post");
  const [products, setProducts] = useState([]); // State for products

  function handleClicked(event) {
    const name = event.target.name;
    setEndPoint(name);
    console.log(name);
    if (name === "Create") {
      setRest("post");
      setResponseMessage("");
    } else if (name === "Update") {
      setRest("patch");
      setResponseMessage("");
    } else if (name === "Delete") {
      setRest("delete");
      setResponseMessage("");
    } else if (name === "Show") {
      setRest("get");
      setResponseMessage("");
    }

    setLabel(name + " Product");
    console.log("Endpoint set to:", name); // For debugging
  }

  const submit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with:", { name, price });

    const config = {
      method: rest,
      url: `http://localhost:8000/${endPoint}`,
      data: { name, price }, // Request body for POST, PATCH
    };

    // Adjust the request config for DELETE and GET methods
    if (rest === "delete" || rest === "get") {
      delete config.data; // Remove request body for DELETE and GET
      if (rest === "delete") {
        config.params = { name }; // Send params for DELETE
      }
    }

    try {
      const response = await axios(config);
      console.log("Response:", response.data);
      if (endPoint === "Show") {
        setProducts(response.data.products || []); // Set the products data
      } else {
        setResponseMessage(response.data.message); // Set the response message
        setName("");
        setPrice("");
      }
    } catch (e) {
      console.log("Error:", e);
      setResponseMessage("Error in Product"); // Set error message
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-around p-2">
        <Buttons
          className="btn btn-primary"
          name="Create"
          label="Create Product"
          type="button"
          onClick={handleClicked}
        />
        <Buttons
          className="btn btn-primary"
          name="Update"
          label="Update Product"
          type="button"
          onClick={handleClicked}
        />
        <Buttons
          className="btn btn-primary"
          name="Delete"
          label="Delete Product"
          type="button"
          onClick={handleClicked}
        />
        <Buttons
          className="btn btn-primary"
          name="Show"
          label="Show Product"
          type="button"
          onClick={handleClicked}
        />
      </div>
      <div className="container p-2">
        {endPoint && <h1>{endPoint} Product</h1>}
        {endPoint && (
          <form onSubmit={submit} className="form-floating">
            {endPoint !== "Show" && (
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
            )}
            {endPoint !== "Delete" && endPoint !== "Show" && (
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
            )}
            <Buttons
              className="btn btn-primary"
              type="submit"
              name="submit"
              label={label}
            />

            {responseMessage && (
              <div className="alert alert-info mt-3" role="alert">
                {responseMessage}
              </div>
            )}
          </form>
        )}
      </div>
      {endPoint === "Show" && products.length > 0 && (
        <div className="container">
          <div className="mt-3">
            <h2>Product List</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price $</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Crud;
