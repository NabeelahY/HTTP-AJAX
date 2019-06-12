import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import FriendForm from "./FriendContainer/FriendForm";
import FriendList from "./FriendContainer/FriendList";

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

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        {this.state.loader && <div className="loading">Loading friends...</div>}
        {this.state.friendData && (
          <Router>
            <FriendForm friends={this.state.friendData} />
            <Route
              path="/"
              render={props => (
                <FriendList friends={this.state.friendData} {...props} />
              )}
            />
          </Router>
        )}
      </div>
    );
  }
}
