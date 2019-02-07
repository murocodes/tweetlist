import React, { Component } from "react";
import TweetsList from "../Tweets/TweetsList/TweetsList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <TweetsList></TweetsList>
      </div>
    );
  }
}

export default App;

