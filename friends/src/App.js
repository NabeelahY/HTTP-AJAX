import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
                    toggleEditing={this.changeEditStatus}
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
