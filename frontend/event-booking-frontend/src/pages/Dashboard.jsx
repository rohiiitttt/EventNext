import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./Styles/Dashboard.css"; // Assuming you have a CSS file for styling
import { getDashboardData } from "../services/api";

const Dashboard = () => {
  const [data, setData] = useState({
    totalRevenue: 0,
    totalTickets: 0,
    salesData: [],
    topEvents: [],
    upcomingEvents: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        console.log("Dashboard Data:", response); // Log the response data
        setData(response);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Summary Cards */}
      <div className="stats">
        <div className="card">
          <h3>Total Revenue</h3>
          <p>${data.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Total Tickets Sold</h3>
          <p>{data.totalTickets.toLocaleString()}</p>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="chart-container">
        <h3>Ticket Sales Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#007bff" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Events */}
      <div className="events-container">
        <div className="event-section">
          <h3>Top Selling Events</h3>
          <ul>
            {data.topEvents.map((event) => (
              <li key={event._id}>{event.name} - {event.ticketsSold} tickets</li>
            ))}
          </ul>
        </div>

        {/* Upcoming Events */}
        <div className="event-section">
          <h3>Upcoming Events</h3>
          <ul>
            {data.upcomingEvents.map((event) => (
              <li key={event._id}>{event.name} - {event.date}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
