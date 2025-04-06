import React from "react";

// This is a reusable component that displays information about one envelope.
// It accepts props from the parent component: name, status, and order.
function EnvelopeCard(props) {
    return(
        <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
            <h2>Signer: {props.name}</h2>
            <p>Status: {props.status}</p>
            <p>Order: {props.order}</p>
            
            {/* Delete button calls the parent's handler with this envelope's ID */}
            <button onClick={() => props.onDelete(props.id)}>Delete</button>
        </div>
    )
}

export default EnvelopeCard;