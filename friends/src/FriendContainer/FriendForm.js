import React, { useState } from "react";
import axios from "axios";

export default function FriendForm() {
  const [name, updateName] = useState("");
  const [age, updateAge] = useState("");
  const [email, updateEmail] = useState("");

  const addFriend = e => {
    const newFriendInput = {
      name: name,
      age: age,
      email: email
    };

    axios
      .post(`http://localhost:5000/friends`, newFriendInput)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    updateName("");
    updateAge("");
    updateEmail("");
  };

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
          type="number"
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
