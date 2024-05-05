import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div<{ show: boolean }>`
  //width: 100%;
  //height: 5px;
  //background: #151515;
  //position: relative;
  visibility: ${ ({ show }) => show ? 'visible' : 'hidden' };
  margin: 30px 0;
  justify-content: center;
  display: flex;
`;

const Load = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid #212020;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;


  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

`;

const Loader = ({ show }: { show: boolean }) => {

    return (
        <Wrapper show={ show }>
            <Load/>
        </Wrapper>
    )
}

export default Loader;