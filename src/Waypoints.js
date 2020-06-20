import React, { useState, useEffect } from "react";
import "./App.css";
import { Waypoint } from "react-waypoint";

function Waypoints() {
  const [data, setData] = useState([]);
  const today = new Date();

  useEffect(() => {
    if (!data.length) {
      addFirstDates();
    }
    return () => {};
  }, []);

  const addFirstDates = () => {
    let prevDates = [];
    let postDates = [];
    //  miliseconds in a day 8.64e+7;
    for (let i = 1; i <= 10; i++) {
      prevDates.unshift(new Date(today.getTime() - i * 8.64e7));
      postDates.push(new Date(today.getTime() + i * 8.64e7));
    }

    setData([...prevDates, today, ...postDates]);
  };

  const isSameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const getMoreDays = (amount, time = "prev") => {
    let dates = [];
    if (time === "past") {
      const lastDate = data[data.length - 1];
      for (let i = 1; i < amount; i++) {
        dates.push(new Date(lastDate.getTime() + i * 8.64e7));
      }
    } else {
      for (let i = 1; i < amount; i++) {
        dates.unshift(new Date(data[0].getTime() - i * 8.64e7));
      }
    }
    return dates;
  };

  const handleWaypoint = (index) => {
    if (index === 5) {
      console.log("render more prev dates");
      let prevDays = getMoreDays(20, "prev");
      setData(prevDays.concat(...data));
    }
    if (index === data.length - 7) {
      setData([...data.concat(getMoreDays(50, "past"))]);
    }
  };

  const renderDates = () => {
    let result = data.map((date, index) => {
      return isSameDay(today, date) ? (
        <React.Fragment key={index}>
          <li style={{ fontWeight: "bold" }}>
            {" "}
            >> TODAY {date.toDateString()}
          </li>
          <Waypoint onEnter={() => handleWaypoint(index)} />
        </React.Fragment>
      ) : (
        <React.Fragment key={index}>
          <li>{date.toDateString()}</li>
          <Waypoint onEnter={() => handleWaypoint(index)} />
        </React.Fragment>
      );
    });

    return result;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1> total dates => {data.length}</h1>
      <ul
        style={{
          listStyleType: "none",
          overflow: "auto",
          height: 200,
        }}
      >
        {renderDates()}
      </ul>
    </div>
  );
}

export default Waypoints;
