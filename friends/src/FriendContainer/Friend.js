import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

export default function Friend(props) {

  const [friend, updateFriend] = useState(null);

  useEffect(() => {
    const friendId = props.match.params.id;
    getFriend(friendId);
  });

  const getFriend = id => {
    axios
      .get(`http://localhost:5000/friends/${id}`)
      .then(res => updateFriend(res.data))
      .catch(error => {
        console.error(error);
      });
  };
  
  if (!friend) {
    return <div>Loading friend's information...</div>;
  }

  return (
    <div>
      <h4>Name: {friend.name}</h4>
      <p>Age: {friend.age}</p>
      <p>Email: {friend.email}</p>
    </div>
  );
}
