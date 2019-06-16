import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledFriendSection = styled.div `
  background-color: #A2D3C2;
  width: 40%;
  padding: 1rem;
  margin: 0.5rem auto;

  &:hover {
    background-color: #D6F49D;
  }

  a {
    color: #230C0F;
    text-decoration: none;
  }
  
`

export default function FriendSection({ friends }) {
  const friendList = friends.map(friend => (
    <StyledFriendSection key={friend.id}>
      <Link to={`/friend/${friend.id}`}>
        <h4 id={friend.id}>
          {friend.name}
        </h4>
      </Link>
    </StyledFriendSection>
  ));

  return <div>{friendList}</div>;
}
