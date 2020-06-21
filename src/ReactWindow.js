import React, { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { Waypoint } from "react-waypoint";
import styled from "styled-components";

export default function ReactWindow() {
  useEffect(() => {
    if (!data.length) {
      addFirstDates();
    }
    // just the first render due to waypoint at index 0
    if (data.length === 520) scrollToToday();
    return () => {};
  });
  const listRef = React.createRef();
  const [data, setData] = useState([]);
  const [itemCount, setItemCount] = useState(20);
  const today = new Date();

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

  const handleWaypoint = (index) => {
    if (index === 0) {
      listRef.current.scrollToItem(499, "center");
      let prevDays = getMoreDays(500, "prev");
      setData(prevDays.concat(...data));
      setItemCount(itemCount + 500);
    } else if (index === data.length - 2) {
      setData([...data.concat(getMoreDays(500, "past"))]);
      setItemCount(itemCount + 500);
    }
  };

  const scrollToToday = () => {
    listRef.current.scrollToItem(
      data.findIndex((date) => isSameDay(date, today)),
      "center"
    );
  };

  const Row = ({ index, style, data }) => {
    if (!data[1]) return null;
    if (!data[index]) return null;
    let date = data[index];
    // return <div style={style}>Row {data[index].toDateString()}</div>;

    return isSameDay(today, date) ? (
      <div style={style}>
        <li key={index} style={{ fontWeight: "bold", color: "#494949" }}>
          {" "}
          🎉 TODAY {date.toDateString()} 🎉
        </li>
      </div>
    ) : (
      <div style={style}>
        <li key={index} style={{ color: "#494949" }}>
          {date.toDateString()}
        </li>
        <Waypoint onEnter={() => handleWaypoint(index)} />
      </div>
    );
  };

  return (
    <Container style={{ listStyleType: "none" }}>
      <Title>Total Dates: {data.length}</Title>
      <Button onClick={scrollToToday}>Today's date </Button>
      <List
        style={{ margin: 10 }}
        ref={listRef}
        height={150}
        itemCount={itemCount}
        itemSize={35}
        width={300}
        itemData={data}
      >
        {Row}
      </List>
    </Container>
  );
}

const Container = styled.div`
  margin-left: 10px;
`;
const Title = styled.h1`
  color: #494949;
`;

const Button = styled.button`
  background-color: #ece8d9
  border: none;
  color: #494949;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
`;
