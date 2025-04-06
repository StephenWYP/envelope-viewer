import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import EnvelopeCard from "./EnvelopeCard";

// This is the main component of the app
function App() {

  // Store all envelop data (fetched from "server")
  const [allEnvelopes, setAllEnvelopes] = useState([]);
  // useState hook is used to store currently displayed envelope
  // Initially, we show all envelopes
  const [filteredEnvelopes, setFilteredEnvelopes] = useState([]);
  const [nameFilter, setNameFilter] = useState(""); //Store user input

  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newOrder, setNewOrder] = useState("");
  
  // useEffect simulates fetching data from server when the page first loads
  useEffect(() => {
    // Simulate API delay using setTimeout
    const fetchData = () => {
      const mockData = [
        { id: 1, name: "Alice", status: "Completed", order: 1},
        { id: 2, name: "Bob", status: "Pending", order: 2},
        { id: 3, name: "Charlie", status: "Pending", order: 3},  
      ];

      // Simulate delay (like fetch API)
      setTimeout(() => {
        setAllEnvelopes(mockData); // Save to full data
      }, 1000); // 1 second delay
    };

    fetchData(); // Run the function
  }, [])

  // Function to show all envelopes (no filter)
  const showAll = () => {
    setFilteredEnvelopes(allEnvelopes);
  }

  // Show only pending envelopes
  const showPending = () => {
    const pending = allEnvelopes.filter((env) => env.status === "Pending");
    setFilteredEnvelopes(pending);
  }

  // Filter by name using imput text
  const filterByName = () => {
    const filtered = allEnvelopes.filter((env) => 
      env.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
    setFilteredEnvelopes(filtered);
  };

  // Add a new envelope (simulate POST request)
  const handleAddEnvelope = () => {

    if (!newName || !newStatus || !newOrder) {
      alert("Please fill in all fields!");
      return;
    }

    const newEnvelope = {
      id: allEnvelopes.length + 1,
      name: newName,
      status: newStatus,
      order: parseInt(newOrder)
    };

    setTimeout(() => {
      const updatedList = [...allEnvelopes, newEnvelope];
      setAllEnvelopes(updatedList);
      setFilteredEnvelopes(updatedList);
      setNewName("");
      setNewStatus("");
      setNewOrder("");
    }, 500);
  };

  // Delete an envelope by ID
  const handleDeleteEnvelope = (idToDelete) => {
    const updated = allEnvelopes.filter((env) => env.id !== idToDelete);
    setAllEnvelopes(updated);
    setFilteredEnvelopes(updated);
  };

  return (
    <div>
      <h1>Envelope Viewer</h1>

      {/* Filter buttons */}
      <button onClick={showAll}>Show All</button>
      <button onClick={showPending}>Show Pending</button>
      
      {/* Name Filter Input */}
      <input 
        type = "text"
        placeholder = "Enter name.."
        value = {nameFilter}
        onChange = {(e) => setNameFilter(e.target.value)}
      />
      <button onClick={filterByName}>Filter by Name</button>

      {/*
       * Envelope Cards Display
       * If still loading, show a message
       */}
      {allEnvelopes.length === 0 ? (
        <p> Loading envelopes...</p>
      ) : (
        // Render the filtered list of envelopes
        filteredEnvelopes.map((env) => (
          <EnvelopeCard
          key = {env.id}
          id = {env.id}
          name = {env.name}
          status = {env.status}
          order = {env.order}
          onDelete = {handleDeleteEnvelope}
          />
        ))
      )}

      <hr />
      <h2>Add New Envelope</h2>
      {/* Form for adding a new envelope*/}
      <input
        type="text"
        placeholder="Enter name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter status"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter order"
        value={newOrder}
        onChange={(e) => setNewOrder(e.target.value)}
      />
      <button onClick={handleAddEnvelope}>Add Envelope</button>

    </div>
  );
}

export default App;
