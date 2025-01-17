import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const StyledForm = styled.div`
 width: 100%;
  h4 {
    color:  #230C0F;
    font-size: 2rem;
    margin: 0.5rem 0;
  }
 form {
  width: 60%;
  display:block;
  padding: 1rem;
  margin: 0 auto;
   input {
     width: 100%;
     padding: 1.5rem 0;
     margin: 0.5rem 0;
     border: 1px #A2D3C2 solid;
     border-radius: 0.2rem;
     text-align: center;
   }
   button {
     width: 100%
     border: none;
     border-radius: 0.2rem;
     padding: 1.5rem;
     background-color: #A2D3C2;
     color: #230C0F;
   }
 }
`;

export default function FriendForm(props) {
  const [name, updateName] = useState("");
  const [age, updateAge] = useState("");
  const [email, updateEmail] = useState("");

  

  useEffect(() => {
    const friendId = props.match.params.id;
    if (friendId) {
      const editFriend = props.friends.find(
        friend => friend.id === JSON.parse(friendId)
      );
      updateName(editFriend.name);
      updateAge(editFriend.age);
      updateEmail(editFriend.email);
    }
  }, [props.match.params.id, props.friends]);

  const addFriend = e => {
    e.preventDefault();
    const id = props.match.params.id;

    if (props.editing) {
      axios
        .put(`http://localhost:5000/friends/${id}`, { name, age, email })
        .then(res => props.setFriends(res.data))
        .catch(err => console.log(err.message))
        .finally(() => props.history.push("/"));
    } else {
      axios
        .post(`http://localhost:5000/friends`, { name, age, email })
        .then(res => props.setFriends(res.data))
        .catch(err => console.log(err))
        .finally(() => props.history.push("/"));
    }

    updateName("");
    updateAge("");
    updateEmail("");
  };

  return (
    <StyledForm>
      <h4>{props.editing ? 'Edit Friend' : 'Add a Friend' }</h4>
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
    </StyledForm>
  );
}
