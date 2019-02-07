import React, { Component } from "react";
import { interval, merge } from "rxjs";
import { Card, Button, Tabs } from "element-react";
import moment from "moment";
import { map } from "rxjs/operators";
import "element-theme-default";

export class TweetsListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      likedTweets: []
    };
  }
  like = tweet => {
    this.setState({
      likedTweets: [...this.state.likedTweets, tweet]
    });
  };
  unLike = tweet => {
    this.setState({
      likedTweets: [...this.state.likedTweets.filter(i => i !== tweet)]
    });
  };
  deleteAllTweets = () => {
    this.setState({
      tweets: [],
      likedTweets: [],
      descSortedTweets: []
    });
  };
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
    const { tweets, likedTweets } = this.state;
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
          <Tabs activeName="1" onTabClick={tab => console.log(tab.props.name)}>
            <Tabs.Pane label="All Tweets" name="1">
              <Button
                onClick={() => this.deleteAllTweets()}
                type="primary"
                size="large"
                className="button"
              >
                delete tweets
              </Button>
              <p>liked tweets counter:{likedTweets.length}</p>
              {descSortedTweets.map((tweet, index) => {
                return (
                  <Card bodyStyle={{ padding: 0 }}>
                    <div
                      style={{
                        backgroundColor: likedTweets.includes(tweet)
                          ? "#E8E8E8"
                          : "",
                        padding: 8
                      }}
                    >
                      <span>{tweet.account}</span>
                      <br />
                      <span>{tweet.content}</span>
                      <div className="bottom clearfix">
                        <time className="time">
                          {moment(tweet.timestamp).format()}
                        </time>
                      </div>
                      <div>
                        {likedTweets.includes(tweet) ? (
                          <Button
                            onClick={() => this.unLike(tweet)}
                            type="text"
                            size="large"
                            className="button"
                          >
                            <i class="el-icon-star-on" />
                          </Button>
                        ) : (
                          <Button
                            onClick={() => this.like(tweet)}
                            type="text"
                            size="large"
                            className="button"
                          >
                            <i class="el-icon-star-off" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </Tabs.Pane>
            <Tabs.Pane label="liked Tweets" name="2">
            <Button
                onClick={() => this.deleteAllTweets()}
                type="primary"
                size="large"
                className="button"
              >
                delete tweets
              </Button>
              <p>liked tweets counter:{likedTweets.length}</p>
              {likedTweets.map((tweet, index) => {
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
                        <Button
                          onClick={() => this.unLike(tweet)}
                          type="text"
                          size="large"
                          className="button"
                        >
                          <i class="el-icon-star-on" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </Tabs.Pane>
          </Tabs>
        </div>
      );
    }
  }
}

export default TweetsListComponent;
