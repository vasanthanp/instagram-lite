import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import "./homepage.styles.css";
const HomePage = () => {
  const { state, dispatch } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const response = await fetch("/allposts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const data = await response.json();
    setPosts(data.posts);
  };
  useEffect(() => {
    getPosts();
    console.log(state);
  }, [state]);
  const likePost = async (id) => {
    console.log("before like ", posts);
    const response = await fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    });
    const data = await response.json();
    setPosts([...posts, data]);
  };

  useEffect(() => console.log("before like ", posts), [posts]);
  const unlikePost = async (id) => {
    const response = await fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    });
    const data = await response.json();
    // setPosts([...posts, data]);
  };
  return (
    <div className="home">
      {posts.map((post) => (
        <div className="card home-post" key={post._id}>
          <h5>{post.postedBy.name}</h5>
          <div className="card-image">
            <img alt="post" src={post.imageUrl} />
          </div>
          <div className="card-content">
            <i
              className={`material-icons ${
                post.likes.includes(state._id) && "red-text"
              }`}
              onClick={() =>
                post.likes.includes(state._id)
                  ? unlikePost(post._id)
                  : likePost(post._id)
              }
            >
              {post.likes.includes(state._id) ? "favorite" : "favorite_border"}
            </i>
            <p>{post.likes.length} likes</p>
            <h5>{post.title}</h5>
            <h6>{post.body}</h6>
            <input type="text" placeholder="leave comment" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default HomePage;
