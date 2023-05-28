import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete, MdEdit, MdCheck } from 'react-icons/md';

const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    transition: 0.4s;
    color: #006400;
  }
  // display: none;
`;
const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    transition: 0.4s;
    color: #ff6b6b;
  }
  // display: none;
`;

const TodoItemBlock = styled.form`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const CheckCircle = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #006400;
      color: #329632;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const EditTitle = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 80%;
  outline: none;
  font-size: 20px;
  box-sizing: border-box;
`;

function TodoItem({ done, title, todoId, getTodos }) {
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const todoDeleteHandler = async (e) => {
    e.preventDefault();
    if (window.confirm('⚠️ 진짜 삭제할텨 ⁉️ 👀') === true) {
      try {
        const res = await fetch(
          `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todoId}`,
          {
            method: 'DELETE',
            headers: {
              apikey: 'KDT5_nREmPe9B',
              username: 'KDT5_JuHaRim',
            },
          },
        );
        await res.json();
        alert('‼️ 삭제했슈 ‼️');
      } catch (err) {
        console.error(err);
      }
      getTodos();
    } else {
      alert('‼️ 삭제 취소했슈 ‼️');
    }
  };

  const titleHandler = (e) => {
    e.preventDefault();
    setEditTitle(e.target.value);
  };

  const editHandler = async (params, e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todoId}`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            apikey: 'KDT5_nREmPe9B',
            username: 'KDT5_JuHaRim',
          },
          body: JSON.stringify({
            title: params.title,
            done: params.done,
          }),
        },
      );
      await res.json().then(getTodos());
    } catch (err) {
      console.error(err);
    }
  };

  const editTitleHandler = (params, e) => {
    e.preventDefault();
    setEditMode(false);
    editHandler({ title: params.title, done: params.done }, e);
  };

  return (
    <TodoItemBlock>
      <CheckCircle
        onClick={(e) => {
          editHandler({ title: title, done: !done }, e);
        }}
        done={done}
      >
        {done && <MdDone />}
      </CheckCircle>

      {done === true ? (
        <Text done={done}>{title}</Text>
      ) : editMode === true ? (
        <>
          <EditTitle
            // autoFocus
            done={done}
            placeholder={title}
            value={editTitle}
            onChange={titleHandler}
          />
          <Edit
            onClick={(e) => {
              editTitleHandler({ title: editTitle, done: done }, e);
            }}
          >
            <MdCheck />
          </Edit>
        </>
      ) : (
        <>
          <Text done={done}>{title}</Text>
          <Edit
            onClick={() => {
              setEditMode(true);
            }}
          >
            <MdEdit />
          </Edit>
        </>
      )}

      <Remove
        onClick={(e) => {
          todoDeleteHandler(e);
        }}
      >
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;
