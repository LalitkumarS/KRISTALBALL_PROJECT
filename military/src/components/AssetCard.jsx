import React from "react";
import "./AssetCard.css";

function AssetCard({ title, quantity }) {
  return (
    <div className="asset-card">
      <h3 className="asset-title">{title}</h3>
      <p className="asset-quantity">{quantity}</p>
    </div>
  );
}

export default AssetCard;
