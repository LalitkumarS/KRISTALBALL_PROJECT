import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Purchases.css";

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    api.getPurchases().then((res) => setPurchases(res.data));
  }, []);

  const handleAdd = async () => {
    if (!item || !quantity) return;
    const res = await api.addPurchase({ item, quantity });
    setPurchases([...purchases, res.data]);
    setItem("");
    setQuantity("");
  };

  return (
    <div className="purchases-page">
      <h2 className="page-title">Purchases</h2>

      <div className="purchase-form">
        <input
          type="text"
          placeholder="Enter Item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleAdd}>➕ Add Purchase</button>
      </div>

      <div className="purchases-list">
        {purchases.map((p) => (
          <div key={p._id} className="purchase-card">
            <h3>{p.item}</h3>
            <p>Quantity: {p.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Purchases;
