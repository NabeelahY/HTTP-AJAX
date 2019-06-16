import React, { useState, useEffect } from "react";
import axios from "axios";
import FriendCard from "./FriendCard";

export default function Friend(props) {
  const [friend, updateFriend] = useState(props.friends);

  useEffect(() => {
    const friendId = props.match.params.id;
    const getFriend = id => {
      axios
        .get(`http://localhost:5000/friends/${id}`)
        .then(res => updateFriend(res.data))
        .catch(error => {
          console.error(error);
        });
    };
    getFriend(friendId);
  }, [props.match.params.id]);

  if (!friend) {
    return <div>Loading friend's information...</div>;
  }

  return (
    <FriendCard
      changeEditStatus={props.toggleEditing}
      setFriends={props.setFriends}
      friend={friend}
      {...props}
    />
  );
}
