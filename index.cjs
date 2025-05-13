const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/api/women", require("./routes/products.cjs"));
app.use("/api/men", require("./routes/products.cjs"));
app.use("/api/sale", require("./routes/products.cjs"));
app.use("/api/products", require("./routes/products.cjs"));
app.use("/api/new-in", require("./routes/products.cjs"));
app.use("/api/product", require("./routes/productById.cjs"));
app.listen(5000, () => console.log("Server running on port 5000"));