import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import FriendForm from "./components/FriendForm";
import FriendSection from "./components/FriendSection";
import Friend from "./components/Friend";

const StyledFriend = styled.div`
  text-align: center;
  margin: 0 auto;
  padding: 1rem;
  width: 50%;
`;

const StyledNav = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  background-color: #a2d3c2;
  width: 100%;

  div {
    padding: 1rem;
    a {
      text-decoration: none;
      color: #230c0f;
    }
  }

  nav {
    display: flex;
    padding: 0.5rem;
    a {
      margin: 0.5rem;
      text-decoration: none;

      div {
        color: #230c0f;
      }
    }
  }
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendData: null,
      errorMessage: "",
      loader: false,
      isEditing: false
    };
  }

  changeEditStatus = () => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing
    }));
  };

  componentDidMount() {
    this.fetchFriendWithAxios();
  }

  fetchFriendWithAxios = () => {
    this.setState({ loader: true });
    axios
      .get("http://localhost:5000/friends")
      .then(res => {
        this.setState({ friendData: res.data });
      })
      .catch(err => {
        this.setState({ errorMessage: err.message });
      })
      .finally(() => {
        this.setState({ loader: false });
      });
  };

  setFriends = friends => {
    this.setState({
      friendData: friends
    });
  };

  render() {
    return (
      <Router>
        <StyledNav>
          <div>
            <NavLink to="/">
              <h3>Friend's Ville</h3>
            </NavLink>
          </div>
          <nav>
            <NavLink to="/">
              <div>Home</div>
            </NavLink>
            <NavLink to="/add-friend">
              <div>Add Friend</div>
            </NavLink>
          </nav>
        </StyledNav>

        <StyledFriend>
          {this.state.loader && (
            <div className="loading">Loading friends...</div>
          )}

          {this.state.friendData && (
            <div>
              <Route
                exact
                path="/"
                render={props => (
                  <FriendSection friends={this.state.friendData} {...props} />
                )}
              />

              <Route
                exact
                path="/update-friend/:id"
                render={props => (
                  <FriendForm
                    setFriends={this.setFriends}
                    editing={true}
                    friends={this.state.friendData}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/add-friend"
                render={props => (
                  <FriendForm setFriends={this.setFriends} {...props} />
                )}
              />

              <Route
                exact
                path="/friend/:id"
                render={props => (
                  <Friend
                    setFriends={this.setFriends}
                    friends={this.state.friendData}
                    {...props}
                  />
                )}
              />
            </div>
          )}
        </StyledFriend>
      </Router>
    );
  }
}
