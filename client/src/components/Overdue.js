import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "../Style/contentStyle.css";
import Card from "./Card";
import { toast } from "react-hot-toast";

const Overdue = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const myYear = new Date().getFullYear();
  const myMonth = new Date().getMonth() + 1;
  const myDate = new Date().getDate();
  const [task, setTask] = useState([]);

  // Authentication
  if (!userId) {
    navigate("/login");
  }

  const getUserTask = async () => {
    try {
      const userTask = await axios.post(
        "http://localhost:8080/api/v1/task/user-task",
        { userId }
      );
      //   console.log(task.success);
      // console.log(userTask.data.task.length);
      if (userTask.data.success) {
        //
        const filterTask = userTask.data.task.filter((myTask) => {
          const taskYear = Number(myTask.date.substring(0, 4));
          const taskMonth = Number(myTask.date.substring(5, 7));
          const taskDate = Number(myTask.date.substring(8, 10));
          if (
            taskYear < myYear ||
            (taskYear === myYear && taskMonth < myMonth) ||
            (taskYear === myYear && taskMonth === myMonth && taskDate < myDate)
          ) {
            return myTask;
          }
        });
        //
        // console.log(filterTask.length);
        setTask(filterTask);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Error");
    }
  };
  useEffect(() => {
    getUserTask();
  }, []);

  return (
    <div className="container">
      {task.length === 0 && <h1 className="textH1">No task left</h1>}

      {task.map((myTask) => (
        <Card
          key={myTask._id}
          title={myTask.title}
          description={myTask.description}
          userId={myTask.userId}
          id={myTask._id}
          status={"danger"}
          date={myTask.date}
        />
      ))}
    </div>
  );
};

export default Overdue;
