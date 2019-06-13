import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import FriendForm from "./FriendContainer/FriendForm";
import FriendSection from "./FriendContainer/FriendSection";
import Friend from "./FriendContainer/Friend";

const StyledFriend = styled.div`
  text-align: center;
  margin: 0 auto;
  padding: 1rem;
  width: 50%;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendData: null,
      errorMessage: "",
      loader: false
    };
  }

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

  render() {
    console.log(this.state.friendData);

    const setFriends = friends => {
      this.setState({
        friendData: friends
      });
    };
    return (
      <StyledFriend>
        <Router>
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
                path="/add-friend"
                render={props => <FriendForm setFriends={setFriends} {...props} />}
              />

              <Route
                exact
                path="/friend/:id"
                render={props => (
                  <Friend
                    setFriends={setFriends}
                    friends={this.state.friendData}
                    {...props}
                  />
                )}
              />
            </div>
          )}
        </Router>
      </StyledFriend>
    );
  }
}
