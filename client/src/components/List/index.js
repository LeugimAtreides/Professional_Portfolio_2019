import React from "react";
import "./style.css";

// This component exports both the list and the list-item components

export const List = ({ children }) => (
    <ul className="list-group">
        {children}
    </ul>
);

export function ListItem({ children }) {
    return <li className="list-group-item">{ children }</li>
}