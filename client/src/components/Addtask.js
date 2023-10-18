import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "../Style/AddTaskStyle.css";
import toast from "react-hot-toast";

const Addtask = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  // const [imageLink, setImageLink] = useState("");
  const [dateValue, setDateValue] = useState("");

  // Authentication
  const loginNavigate = () => {
    if (!localStorage.getItem("userId")) {
      navigate("/login");
    }
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Authentication
    if (!imageTitle) {
      toast.error("Enter title");
      return;
    }

    if (!imageDescription) {
      toast.error("Enter Description");
      return;
    }

    if (!dateValue) {
      toast.error("Enter the date");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/task/add-task",
        {
          title: imageTitle,
          description: imageDescription,
          date: dateValue,
          userId: id,
        }
      );
      if (data?.success) {
        navigate("/today");
        toast.success("Task Created");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Error while adding task");
    }
  };

  useEffect(() => {
    loginNavigate();
  }, []);
  return (
    <div className="mainContainer3">
      <div className="container2">
        <h1>Add Task</h1>
        {/* <label htmlFor="fileInput" className="file-label">
        Choose an image
      </label> */}
        {/* <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleImageChange}
      /> */}
        {/* <div className="image-preview">
      {imagePreview && <img src={imagePreview} alt="Image Preview" />}
    </div> */}
        <form>
          <input
            type="text"
            id="imageTitle"
            placeholder="Title"
            value={imageTitle}
            onChange={(e) => setImageTitle(e.target.value)}
            required
          />
          <textarea
            id="imageDescription"
            placeholder="Description"
            value={imageDescription}
            onChange={(e) => setImageDescription(e.target.value)}
            required
          />
          {/* <textarea
            id="imageLink"
            placeholder="Link"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            required
          /> */}
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
          ></input>
          <button onClick={handleSubmit}>Add Post</button>
        </form>
      </div>
    </div>
  );
};

export default Addtask;
