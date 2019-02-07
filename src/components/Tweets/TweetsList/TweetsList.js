import React, { Component } from "react";
import { interval, merge } from "rxjs";
import { Card } from "element-react";
import moment from "moment";
import { map } from "rxjs/operators";
import "element-theme-default";

export class TweetsListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: []
    };
  }
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

    tweets.subscribe(tweet =>
        this.setState({ tweets: [...this.state.tweets, tweet] }, () => {
          setTimeout(() => {
            this.setState({ tweets: this.state.tweets.filter(i => i !== tweet) });
          }, 30000);
        })
      );
  }

  render() {
    const { tweets } = this.state;
    const descSortedTweets = [
      ...tweets.sort((a, b) => a.timestamp < b.timestamp)
    ];

    if (tweets.length === 0) {
      return (
        <div>
          <h1>no tweets available</h1>{" "}
        </div>
      );
    } else {
      return (
        <div>
          {descSortedTweets.map((tweet, index) => {
            return (
              <Card bodyStyle={{ padding: 0 }}>
                <div key={index} style={{ padding: 8 }}>
                  <span>{tweet.account}</span>
                  <br />
                  <span>{tweet.content}</span>
                  <div className="bottom clearfix">
                    <time className="time">
                      {moment(tweet.timestamp).format()}
                    </time>
                  </div>
                  <div />
                </div>
              </Card>
            );
          })}
        </div>
      );
    }
  }
}

export default TweetsListComponent;
