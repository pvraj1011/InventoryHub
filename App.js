import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      await axios.put(`http://localhost:5000/api/inventory/${id}`, {
        quantity: newQuantity
      });
      fetchInventory();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className="App">
      <h1>InventoryHub Dashboard</h1>
      {isLoading ? (
        <p>Loading inventory...</p>
      ) : (
        <ul>
          {inventory.map(item => (
            <li key={item.id}>
              {item.name} — Quantity: {item.quantity}
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+1</button>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-1</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
