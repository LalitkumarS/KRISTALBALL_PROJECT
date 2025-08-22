import React, { useEffect, useState } from "react";
import api from "../services/api";
import AssetCard from "../components/AssetCard";
import "./Dashboard.css"; // import css

function Dashboard() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    api.getAssets()
      .then((res) => setAssets(res.data))
      .catch((err) => console.error("Error fetching assets:", err));
  }, []);

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">📊 Military Assets Dashboard</h2>

      <div className="asset-grid">
        {assets.map((asset) => (
          <AssetCard
            key={asset._id}
            title={asset.name}
            quantity={asset.quantity}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
