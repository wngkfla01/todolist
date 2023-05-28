import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TodoHeadBlock = styled.div`
  padding: 48px 32px 24px 32px;
  border-bottom: 4px solid #ff8200;
  h1 {
    margin: 0px;
    font-size: 40px;
    font-weight: 900;
    color: #b22222;
  }
  h2 {
    margin-top: 5px;
    font-size: 25px;
    span {
      font-size: 15px;
    }
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
`;

function TodoHead() {
  const date = new Date();
  const today = date.getDay();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const todayLabel = week[today];

  return (
    <TodoHeadBlock>
      <h1>투-두-리st.</h1>
      <h2>
        {yyyy}년 {mm}월 {dd}일, {todayLabel}요일 <span>(벌써?)</span>
      </h2>
    </TodoHeadBlock>
  );
}

export default TodoHead;
