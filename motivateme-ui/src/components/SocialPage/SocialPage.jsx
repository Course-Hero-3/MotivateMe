import React from "react";
import "./SocialPage.css";
import apiClient from "../../../services/apiclient";
import { useState } from "react";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import GraphCard from "../GraphCard/GraphCard";
import moment from "moment";

export default function SocialPage({ user, setCurrPage }) {
  const [rightTabState, setRightTabState] = useState("friends");
  const [friends, setFriends] = useState(null);
  const [allPeople, setAllPeople] = useState(null); // need endpoint for this (also add to apiClient)
  const [activity, setActivity] = useState(null);
  const [friendQuery, setFriendQuery] = useState("");
  const [exploreQuery, setExploreQuery] = useState("");
  const [refresh, setRefresh] = useState(false);

  React.useEffect(() => {
    const getInfo = async () => {
      let tempActivity = await apiClient.getActivity();
      if (tempActivity?.data) {
        setActivity(tempActivity.data.activity);
      }
      let tempFriends = await apiClient.following();
      if (tempFriends?.data) {
        setFriends(tempFriends.data.following);
      }
      let tempAllPeople = await apiClient.notFollowing();
      if (tempAllPeople?.data) {
        setAllPeople(tempAllPeople.data.otherUsers);
      }
      // if error when fetching user from token (happens if use refreshes)
    };

    getInfo();
    //if user logged in, set the curr page to "social"
    if (user !== undefined && user !== null) {
      setCurrPage("social");
    }
  }, [refresh]);

  const handleOnFriendQueryChange = (event) => {
    setFriendQuery(event.target.value);
  };
  const handleOnExploreQueryChange = (event) => {
    setExploreQuery(event.target.value);
  };

  const handleOnFollow = async (username) => {
    const { error } = await apiClient.follow({ username: username });
    if (!error) {
      setRefresh(!refresh);
    }
  };

  const handleOnUnfollow = async (username) => {
    const { error } = await apiClient.unfollow({ username: username });
    if (!error) {
      setRefresh(!refresh);
    }
  };

  const friendFilter = friends?.filter((friend) => {
    try {
      if (
        friend.username.toLowerCase().match(friendQuery.toLowerCase()) !==
          null ||
        `${friend.firstName} ${friend.lastName}`
          .toLowerCase()
          .match(friendQuery.toLowerCase()) !== null
      ) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  });
  const exploreFilter = allPeople?.filter((stranger) => {
    try {
      if (
        stranger.username.toLowerCase().match(exploreQuery.toLowerCase()) !==
          null ||
        `${stranger.firstName} ${stranger.lastName}`
          .toLowerCase()
          .match(exploreQuery.toLowerCase()) !== null
      ) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  });

  return (
    <>
      {user !== null && user !== undefined ? (
        <>
          <div className="social-page">
            <h1 className="main-title">Social Page</h1>
            <div className="social-date-area">
              <h4 className="social-date">
                {moment(new Date()).format("llll")}
              </h4>
            </div>
            <div className="social-content">
              <div className="activity-feed">
                <h2 className="activity-title">Activity Feed</h2>
                <div className="main-feed">
                  {activity?.length === 0 ? (
                    <h3 className="no-feed">
                      Follow friends to see how others are doing!
                    </h3>
                  ) : (
                    <>
                      {activity?.map((singleActivity, idx) => (
                        <div className="activity-card" key={idx}>
                          <div className="activity-user-info">
                            <h3 className="activity-card-username">{`@${singleActivity?.username} - `}</h3>
                            <h3 className="activity-card-name">
                              {singleActivity?.firstName}{" "}
                              {singleActivity?.lastName}
                            </h3>
                          </div>

                          {singleActivity.hasOwnProperty("publicGraph") &&
                          singleActivity.publicGraph !== null ? (
                            <div className="activity-user-graph">
                              <GraphCard
                                chartInformation={singleActivity?.publicGraph}
                              />
                            </div>
                          ) : (
                            <div className="chart-card">
                              Friend has not completed any tasks yet.
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
              <div className="right-panel">
                <div className="friends-content">
                  <div className="buttons">
                    <button
                      type="button"
                      className={`button-right-tab ${
                        rightTabState === "explore" ? "active" : ""
                      }`}
                      onClick={() => {
                        setRightTabState("explore");
                      }}
                    >
                      Explore
                    </button>
                    <button
                      type="button"
                      className={`button-right-tab ${
                        rightTabState === "friends" ? "active" : ""
                      }`}
                      onClick={() => {
                        setRightTabState("friends");
                      }}
                    >
                      Friends
                    </button>
                  </div>
                  <div className="friend-section">
                    {rightTabState === "friends" ? (
                      <>
                        <h2 className="friend-text">Friends List</h2>
                        <form className="social-query-form">
                          <input
                            type="search"
                            value={friendQuery}
                            onChange={handleOnFriendQueryChange}
                            id="query"
                            name="q"
                            className="social-form-search"
                            placeholder="Search for other users"
                            role="search"
                            aria-label="Search through site content"
                          />
                          <button className="task-form-btn">
                            {" "}
                            <svg viewBox="0 0 1024 1024">
                              <path
                                className="path1"
                                d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"
                              ></path>
                            </svg>
                          </button>
                        </form>
                        <div className="show-users-list">
                          {friendFilter?.length > 0 ? (
                            <>
                              {friendFilter?.map((friend, idx) => (
                                <div className="user-card" key={idx}>
                                  <div className="user-info">
                                    <img
                                      className="user-pfp"
                                      src={friend.profilePicture}
                                      alt="PFP"
                                      onError={(event) => {
                                        event.target.src =
                                          "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png";
                                        event.onerror = null;
                                      }}
                                    />
                                    <div className="user-text-info">
                                      <h4 className="user-username">
                                        @{friend.username}
                                      </h4>
                                      <h4 className="user-name">
                                        {friend.firstName} {friend.lastName}
                                      </h4>
                                    </div>
                                  </div>

                                  <div className="unfollow-and-follow">
                                    <button
                                      type="button"
                                      className="unfollow"
                                      onClick={() => {
                                        handleOnUnfollow(friend.username);
                                      }}
                                    >
                                      Unfollow
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </>
                          ) : (
                            <>
                              <p className="no-friends">
                                Add friends from the explore section!
                              </p>
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <h2 className="friend-text">Other Users</h2>
                        <form className="social-query-form">
                          <input
                            type="search"
                            value={exploreQuery}
                            onChange={handleOnExploreQueryChange}
                            id="query"
                            name="q"
                            className="social-form-search"
                            placeholder="Search for your friends"
                            role="search"
                            aria-label="Search through site content"
                          />
                          <button className="task-form-btn">
                            {" "}
                            <svg viewBox="0 0 1024 1024">
                              <path
                                className="path1"
                                d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"
                              ></path>
                            </svg>
                          </button>
                        </form>
                        <div className="show-users-list">
                          {exploreFilter?.length > 0 ? (
                            <>
                              {exploreFilter?.map((stranger, idx) => (
                                <div className="user-card" key={idx}>
                                  <div className="user-info">
                                    <img
                                      className="user-pfp"
                                      src={stranger?.profilePicture}
                                      alt="PFP"
                                      onError={(event) => {
                                        event.target.src =
                                          "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png";
                                        event.onerror = null;
                                      }}
                                    />
                                    <div className="user-text-info">
                                      <h4 className="user-username">
                                        @{stranger?.username}
                                      </h4>
                                      <h4 className="user-name">
                                        {stranger?.firstName}{" "}
                                        {stranger?.lastName}
                                      </h4>
                                    </div>
                                  </div>

                                  <div className="unfollow-and-follow">
                                    <button
                                      type="button"
                                      className="follow"
                                      onClick={() => {
                                        handleOnFollow(stranger.username);
                                      }}
                                    >
                                      Follow
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </>
                          ) : (
                            <>
                              <p className="no-friends">
                                You follow every user on MotivateMe already!
                              </p>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="recommended-section">
                    <div className="recommended-content">
                      <h2 class="recommended-text">Recommended</h2>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <AccessForbidden setCurrPage={setCurrPage} />
      )}
    </>
  );
}
//social page now has recommended
