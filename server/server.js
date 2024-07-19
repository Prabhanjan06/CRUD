import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Product from "./src/mongodb.js";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// create
app.post("/Create", async (req, res) => {
  const { name, price } = req.body;
  console.log("Received data:", { name, price });

  const product = new Product({
    name,
    price,
  });

  try {
    await product.save();
    res.json({ message: "Product created!", product });
  } catch (error) {
    console.error("Error inserting product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
});

// update
app.patch("/Update", async (req, res) => {
  const { name, price } = req.body;
  console.log("Received data:", { name, price });

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { name: name },
      { $set: { price: price } },
      { new: true }
    );

    if (updatedProduct) {
      res.json({ message: "product updated!", product: updatedProduct });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
});

// delete
app.delete("/Delete", async (req, res) => {
  const { name } = req.query; // Use query parameters for DELETE requests
  console.log("Received data:", { name });

  try {
    const deleteProduct = await Product.deleteOne({ name: name });

    if (deleteProduct.deletedCount > 0) {
      res.json({ message: "Product deleted!" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
});

// show product
app.get("/Show", async (req, res) => {
  try {
    const showProduct = await Product.find();

    if (showProduct.length > 0) {
      res.json({ message: "Displaying products!", products: showProduct });
    } else {
      res.status(404).json({ message: "Products not found", products: [] });
    }
  } catch (error) {
    console.error("Error showing products:", error);
    res.status(500).json({ message: "Error showing products", products: [] });
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
