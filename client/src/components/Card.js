import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import style from "../Style/cardStyle.css";

const Card = (props) => {
  const monthNumber = Number(props.date.substring(5, 7));
  const dateArray = [
    "",
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  // Deleting the Card
  const handleClick = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/task/delete-task/${props.id}`
      );

      if (data?.success) {
        alert("Task is completed");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error while deleting error");
    }
  };

  return (
    <div>
      <div className="card">
        {props.status && (
          <button type="button" className={`btn btn-${props.status}`}>
            {props.date.substring(8, 10) +
              "-" +
              dateArray[monthNumber] +
              "-" +
              props.date.substring(0, 4)}
          </button>
        )}

        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>

          <p className="card-text">{props.description}</p>
          <li className="list-group-item">
            <input
              className="form-check-input me-1"
              type="checkbox"
              defaultValue
              id="firstCheckboxStretched"
              onChange={handleClick}
            />
            <label
              className="form-check-label stretched-link"
              htmlFor="firstCheckboxStretched"
            >
              Done
            </label>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Card;
