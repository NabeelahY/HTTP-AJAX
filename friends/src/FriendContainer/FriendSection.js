import React from "react";
import { Link } from "react-router-dom";

export default function FriendSection({ friends }) {
  const friendList = friends.map(friend => (
    <div key={friend.id}>
      <Link to={`/friend/${friend.id}`}>
        <h4 id={friend.id}>
          {friend.name}
        </h4>
      </Link>
    </div>
  ));

  return <div>{friendList}</div>;
}
