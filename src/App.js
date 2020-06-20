import React from "react";
import Bidirectional from "./Bidirectional";
import styled from "styled-components";

export default function App() {
  return (
    <Background>
      <Bidirectional />
    </Background>
  );
}

const Background = styled.div`
  text-align: center;
  background: #fffdf6;
`;
