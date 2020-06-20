import React from "react";
import Bidirectional from "./Bidirectional";
import styled from "styled-components";

export default function App() {
  return (
    <Background>
      <Title>Using react-bidirectional-infinite-scroll</Title>
      <Bidirectional />
    </Background>
  );
}

const Background = styled.div`
  text-align: center;
  background: #fffdf6;
`;

const Title = styled.h5`
  color: #494949;
`;
