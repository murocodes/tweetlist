import React, { Component } from "react";
import { interval, merge } from "rxjs";
import {Card} from "element-react"
import moment from "moment"
import { map } from "rxjs/operators";

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

    tweets.subscribe(tweet => {
      this.setState({ tweets: [...this.state.tweets, tweet] });
    });
  }

  render() {
      const { tweets } = this.state;
    return (
            <div>
            {tweets.map((tweet) => {
                return (
                  <Card bodyStyle={{ padding: 0 }}>
                    <div style={{ padding: 8 }}>
                      <span>{tweet.account}</span>
                      <br />
                      <span>{tweet.content}</span>
                      <div className="bottom clearfix">
                        <time className="time">
                          {moment(tweet.timestamp).format()}
                        </time>
                      </div>
                      <div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            );
  }
}

export default TweetsListComponent;
