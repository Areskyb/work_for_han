import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-bidirectional-infinite-scroll";

export default function Bidirectional() {
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
  const renderDates = () => {
    let result = data.map((date, index) => {
      return isSameDay(today, date) ? (
        <React.Fragment key={index}>
          <li style={{ fontWeight: "bold", color: "#494949" }}>
            {" "}
            >> TODAY {date.toDateString()}
          </li>
        </React.Fragment>
      ) : (
        <React.Fragment key={index}>
          <li style={{ color: "#494949" }}>{date.toDateString()}</li>
        </React.Fragment>
      );
    });
    return result;
  };

  const handleScroll = (position) => {};
  const element = document.getElementById("list");

  return (
    <>
      <h1 style={{ color: "#494949" }}> Total Dates : {data.length}</h1>
      <ul
        id="list"
        style={{
          listStyleType: "none",
          overflow: "auto",
          height: 200,
        }}
      >
        <InfiniteScroll
          onScroll={(position) => handleScroll(position)}
          onReachBottom={() =>
            setData([...data.concat(getMoreDays(2, "past"))])
          }
          onReachTop={() => setData(getMoreDays(2).concat(...data))}
        >
          {renderDates()}
        </InfiniteScroll>
      </ul>
    </>
  );
}
