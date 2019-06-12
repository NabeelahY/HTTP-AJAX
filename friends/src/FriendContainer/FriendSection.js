import React from "react";

export default function FriendSection({ friends }) {
  const friendList = friends.map(friend => (
    <h4 key={friend.id} id={friend.id}>{friend.name}</h4>
  ))
  
  return (
    <div>
      {friendList}
    </div>
  );
}
