import React from "react";
import { Link } from "react-router-dom";

export default function FriendList(props) {
  return (
    <div>
      {props.friends.map(friend => (
        <div>
          <Link to={`/${friend.id}`}>
            <h4>{friend.name}</h4>
          </Link>
        </div>
      ))}
    </div>
  );
}
