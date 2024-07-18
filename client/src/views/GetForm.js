import React, { useState } from "react";
import Buttons from "../component/Buttons";
import axios from "axios";

function GetForm() {
  const [responseMessage, setResponseMessage] = useState(""); // State for response message
  const [products, setProducts] = useState([]); // State for products

  const submit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.get("http://localhost:8000/showAll");
      console.log("Response:", response.data);
      setResponseMessage(response.data.message); // Set the response message
      setProducts(response.data.products || []); // Set the products data, default to empty array if undefined
    } catch (e) {
      console.log("Error:", e);
      setResponseMessage("Error showing products"); // Set error message
      setProducts([]); // Clear products on error
    }
  };

  return (
    <div className="container d-flex justify-content-center flex-column">
      <h1>Products</h1>
      <form onSubmit={submit} className="form-floating">
        <Buttons
          className="btn btn-primary"
          type="submit"
          name="submit"
          label="Show products"
        />
        {responseMessage && (
          <div className="alert alert-info mt-3" role="alert">
            {responseMessage}
          </div>
        )}
      </form>
      {products.length > 0 && (
        <div className="mt-3">
          <h2>Product List</h2>
          <ul>
            {products.map((product) => (
              <li key={product._id}>
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetForm;
