import React, { useState } from "react";

export default function FriendForm({ friends }) {
  const [friendArr, updateFriendArr] = useState(friends);
  const [name, updateName] = useState("");
  const [age, updateAge] = useState("");
  const [email, updateEmail] = useState("");
  //   const changeHandler = e => {
  //     e.persist();
  //     updateNewFriend({ ...newFriend, [e.target.name]: e.target.value });
  //   };

  const addFriend = e => {
    e.preventDefault();
    const newFriendInput = {
      name: name,
      age: age,
      email: email
    };

    updateFriendArr([...friendArr, newFriendInput]);
    updateName("");
    updateAge("");
    updateEmail("");
  };

  // const { newFriend, addFriend, changeHandler } = props;
  return (
    <div>
      <form onSubmit={addFriend}>
        <input
          name="name"
          value={name}
          onChange={e => updateName(e.target.value)}
          type="text"
          placeholder="Enter name..."
        />

        <input
          name="age"
          value={age}
          onChange={e => updateAge(e.target.value)}
          type="text"
          placeholder="Enter age..."
        />

        <input
          name="email"
          value={email}
          onChange={e => updateEmail(e.target.value)}
          type="email"
          placeholder="Enter email..."
        />

        <button type="submit">Sumbit</button>
      </form>
    </div>
  );
}
