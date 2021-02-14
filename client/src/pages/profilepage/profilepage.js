import React, { useEffect, useState, useContext } from "react";
import "./profilepage.styles.css";
import { UserContext } from "../../App";
const ProfilePage = () => {
  const [myposts, setMyPosts] = useState([]);
  const { state } = useContext(UserContext);
  const fetchData = async () => {
    const response = await fetch("/myposts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const data = await response.json();
    setMyPosts(data.posts);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-image">
          <img
            style={{ height: "180px", width: "180px", borderRadius: "50%" }}
            alt="profile-dp"
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div className="profile-content">
          <h4>{state && state.name}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "110%",
            }}
          >
            <h6>40 followers</h6>
            <h6>40 followers</h6>
            <h6>40 followers</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {myposts.map((post) => (
          <img key={post._id} className="item" alt="post" src={post.imageUrl} />
        ))}
      </div>
    </div>
  );
};
export default ProfilePage;
