import React from 'react';
import { Link } from "react-router-dom";

export default function Friend({id, name}) {
    return (
        <div>
          <Link to={`/${id}`}>
            <h4>{name}</h4>
          </Link>
        </div>
    )
}
