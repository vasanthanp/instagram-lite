import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import materialize from "materialize-css";
const CreatePost = () => {
  // const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const postToServer = async () => {
    const post = await fetch("/createpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        title,
        body,
        imageUrl,
      }),
    });
    const postResult = await post.json();
    if (postResult.error) {
      materialize.toast({ html: postResult.error, classes: "#f44336 red" });
      return;
    } else {
      materialize.toast({
        html: "created post successfully",
        classes: "#4caf50 green",
      });
    }
  };
  const clickHandler = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "vas");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/vas/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const imageDetails = await response.json();
    setImageUrl(imageDetails.secure_url);
  };
  //I think it not proper method
  useEffect(() => {
    if (imageUrl) {
      postToServer();
    }
  }, [imageUrl]);
  return (
    <div
      className="card input-field"
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div className="card-title">
        <h4>Instagram</h4> Add a new post
      </div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="text"
        placeholder="Body"
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn blue">
          <span>upload image</span>
          <input
            type="file"
            onChange={(event) => setImage(event.target.files[0])}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light blue"
        onClick={clickHandler}
      >
        add post
      </button>
    </div>
  );
};
export default CreatePost;
