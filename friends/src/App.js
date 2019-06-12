import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import FriendSection from "./FriendContainer/FriendSection";

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
    return (
      <div>
        {this.state.loader && <div className="loading">Loading friends...</div>}
        {this.state.friendData && (
          <Router>
            <Route
              path="/"
              render={props => (
                <FriendSection friends={this.state.friendData} {...props} />
              )}
            />
          </Router>
        )}
      </div>
    );
  }
}
