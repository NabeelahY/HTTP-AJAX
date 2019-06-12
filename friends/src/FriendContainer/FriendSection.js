import React from "react";
import FriendForm from './FriendForm'
import Friend from "./Friend";

export default function FriendSection({ friends }) {
  const friendList = friends.map(friend => (
    <Friend key={friend.id} id={friend.id} name={friend.name} />
  ))
  
  return (
    <div>
      <FriendForm friends={friends}/>

      {friendList}
    </div>
  );
}
