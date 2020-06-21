import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-bidirectional-infinite-scroll";
import styled from "styled-components";

export default function Bidirectional() {
  const [data, setData] = useState([]);
  const today = new Date();

  useEffect(() => {
    if (!data.length) {
      addFirstDates();
    }
    return () => {};
  });

  const addFirstDates = () => {
    let prevDates = [];
    let postDates = [];
    //  miliseconds in a day 8.64e+7;
    for (let i = 1; i <= 10; i++) {
      prevDates.unshift(new Date(today.getTime() - i * 8.64e7));
      postDates.push(new Date(today.getTime() + i * 8.64e7));
    }

    return setData([...prevDates, today, ...postDates]);
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
        <li key={index} style={{ fontWeight: "bold", color: "#494949" }}>
          {" "}
          🎉 TODAY {date.toDateString()} 🎉
        </li>
      ) : (
        <li key={index} style={{ color: "#494949" }}>
          {date.toDateString()}
        </li>
      );
    });
    return result;
  };

  return (
    <>
      <Header style={{}}> Total Dates : {}</Header>
      <Container style={{ height: 200, listStyleType: "none" }}>
        <InfiniteScroll
          onReachBottom={() =>
            setData([...data.concat(getMoreDays(10, "past"))])
          }
          onReachTop={() => setData(getMoreDays(10).concat(...data))}
        >
          {renderDates()}
        </InfiniteScroll>
      </Container>
    </>
  );
}

const Header = styled.h1`
  color: #494949;
`;
const Container = styled.div``;
