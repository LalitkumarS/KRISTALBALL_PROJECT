import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "./Reports.css";

const data = [
  { name: "Helmet", quantity: 300 },
  { name: "Night Vision Goggles", quantity: 40 },
  { name: "Radio", quantity: 80 },
  { name: "Rifle", quantity: 120 },
  { name: "red", quantity: 60 },
];

const COLORS = ["#2f5597", "#e69138", "#cc0000", "#6aa84f", "#674ea7"];

const Reports = () => {
  return (
    <div className="reports-container">
      <h2 className="reports-title">📊 Reports</h2>
      <div className="charts-wrapper">
        {/* Bar Chart */}
        <div className="chart-card">
          <h3>Asset Quantities (Bar)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#2f5597" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="chart-card">
          <h3>Asset Distribution (Pie)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey="quantity"
                nameKey="name"
                outerRadius={150}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
