const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let inventory = [
  { id: 1, name: "Laptop", quantity: 10 },
  { id: 2, name: "Mouse", quantity: 50 },
  { id: 3, name: "Keyboard", quantity: 25 },
];

// Get all inventory items
app.get("/api/inventory", (req, res) => {
  res.json(inventory);
});

// Update item quantity
app.put("/api/inventory/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { quantity } = req.body;
  const item = inventory.find((i) => i.id === id);
  if (item) {
    item.quantity = quantity;
    res.json({ message: "Item updated", item });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.listen(port, () => {
  console.log(`InventoryHub server running on http://localhost:${port}`);
});
