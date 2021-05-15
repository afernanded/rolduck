import React, { useState, useEffect } from "react";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";
import Followers from './Followers'
import Following from './Following'
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Info = ({id, auth, profile, dispatch}) => {
  
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit){
      dispatch({ type: GLOBALTYPES.MODAL, payload: true})
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false})
    }
  }, [showFollowers, showFollowing, onEdit, dispatch])

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user._id}>
          <Avatar src={user.avatar} size="super-avatar" />
          <div className="info_content">
            <div className="info_content_title">
              {
                user.role !== 'verified'
                ? <h3 className="pr-4 pt-1">{user.username}</h3>
                : <h3 className="pr-2 pt-1">{user.username} <span className="material-icons text-primary">verified</span></h3>
              }
              
              {user._id === auth.user._id ? (
                <button
                  className="btn btn-outline-info"
                  onClick={() => setOnEdit(true)}
                >
                  Edit profile
                </button>
              ) : (
                <FollowBtn user={user}/>
              )}
            </div>
            <div className="follow_btn">
              <span className="mr-4" onClick={() => setShowFollowers(true)}>{user.followers.length} Followers</span>
              <span className="ml-4" onClick={() => setShowFollowing(true)}>{user.following.length} Following</span>
            </div>
            <h6 className="pt-2">
              {user.fullname} <span className="text-danger">{user.mobile}</span>
            </h6>
            <p className="m-0">{user.address}</p>
            <a href={user.website} target="_blank" rel="noreferrer">
              {user.website}
            </a>
            <p>{user.story}</p>
          </div>

          {
          onEdit && <EditProfile setOnEdit={setOnEdit} />
          }

          {
            showFollowers && 
            <Followers users={user.followers} setShowFollowers={setShowFollowers}/>
          }

          {
            showFollowing && 
            <Following users={user.following} setShowFollowing={setShowFollowing}/>
          }
        </div>
      ))}
    </div>
  );
};

export default Info;
