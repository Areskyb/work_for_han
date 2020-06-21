import React from "react";
import styled from "styled-components";
import ReactWindow from "./ReactWindow";

export default function App() {
  return (
    <Background>
      <Title>Infinite Bidirectional Scroll</Title>
      {/* <Bidirectional /> */}
      <ReactWindow />
    </Background>
  );
}

const Background = styled.div`
  background: #fffdf6;
`;

const Title = styled.h5`
  color: #494949;
  margin-left: 10px;
`;
