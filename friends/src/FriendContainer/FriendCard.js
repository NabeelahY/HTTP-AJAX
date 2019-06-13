import React from "react";
import axios from "axios";
import styled from "styled-components";

const StyledFriendCard = styled.div`
  padding: 1rem 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1);
  h4 {
    color: #230c0f;
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    padding: 0.5rem 0;
  }
  h3 {
    text-decoration: underline;
  }

  button {
    border: none;
    background-color: #a2d3c2;
    color: #230c0f;
    padding: 1rem;
    margin: 0.5rem;
  }
`;

const FriendCard = props => {
  const { friend, setFriends  } = props;
  console.log(props)

  const deleteFriend = id => {
      console.log(props.history)
    axios
      .delete(`http://localhost:5000/friends/${id}`)
      .then(res => setFriends(res.data))
      .catch(error => {
        console.error(error);
      })
      .finally(() => props.history.push('/'))
      
  };

  const cardId = props.match.params.id;

  return (
    <StyledFriendCard>
      <h4>{friend.name}</h4>
      <h3>Age</h3>
      <p>{friend.age} years</p>
      <h3>Email</h3>
      <p>{friend.email}</p>

      <div>
        <button>Update</button>
        <button onClick={() => deleteFriend(cardId)}>Delete</button>
      </div>
    </StyledFriendCard>
  );
};

export default FriendCard;
