import mongoose from "mongoose";
import Counter from "./counter.js"; // Ensure the extension .js is included

mongoose
  .connect("mongodb://localhost:27017/crud", {
    // Include the database name
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

productSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "productid" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.id = counter.seq;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
