import React, { Component } from "react";
import { interval, merge } from "rxjs";
import { map } from "rxjs/operators";

export class TweetsListComponent extends Component {

  componentDidMount() {
    const createTweetSource = (frequency, account, attribute) => {
      return interval(frequency).pipe(
        map(i => ({
          account,
          timestamp: Date.now(),
          content: `${attribute} Tweet number ${i + 1}`
        }))
      );
    };

    const tweets = merge(
      createTweetSource(5000, "AwardsDarwin", "Facepalm"),
      createTweetSource(3000, "iamdevloper", "Expert"),
      createTweetSource(5000, "CommitStrip", "Funny")
    );

    tweets.subscribe(console.log.bind(console));
  }

  render() {
      return (
        <div>
            TweetsList Component
        </div>
      );  
  }
}

export default TweetsListComponent;
