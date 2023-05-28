import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd, MdDone, MdDelete, MdEdit } from 'react-icons/md';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-x: auto;
`;

const CircleButton = styled.button`
  background: #ff8200;
  &:hover {
    background: #ff9100;
  }
  &:active {
    background: #ffaf0a;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    css`
      background: #cd4646;
      &:hover {
        background: #cd0000;
      }
      &:active {
        background: #dc6e6e;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: orange;
  border: none;
  border-radius: 10px;
  font-size: 22px;
  color: #006400;
  font-weight: 700;
`;

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [listChanged, setListChanged] = useState(false);
  const [todo, setTodo] = useState('');
  const [open, setOpen] = useState(false);

  const onToggle = () => setOpen(!open);

  const todoHandler = (e) => {
    e.preventDefault();
    setTodo(e.target.value);
  };

  async function submitHandler(e) {
    e.preventDefault();
    if (todo.length !== 0) {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            apikey: 'KDT5_nREmPe9B',
            username: 'KDT5_JuHaRim',
          },
          body: JSON.stringify({
            title: todo,
            done: false,
          }),
        },
      );
      await res.json().then(setListChanged(!listChanged));
      setTodo('');
      getTodos();
    } else {
      alert('할 일을 입력하시옹');
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  // Todo 목록을 불러옴
  const getTodos = async () => {
    try {
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos`,
        {
          method: 'GET',
          headers: {
            apikey: 'KDT5_nREmPe9B',
            username: 'KDT5_JuHaRim',
          },
        },
      );
      const json = await res.json();
      setTodos(json);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TodoListBlock>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          title={todo.title}
          done={todo.done}
          todoId={todo.id}
          getTodos={getTodos}
        />
      ))}
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={submitHandler}>
            <Input
              autoFocus
              placeholder="너의 할 일은"
              value={todo}
              onChange={todoHandler}
            />
            <Button type="submit">추가하기</Button>
          </InsertForm>
        </InsertFormPositioner>
      )}

      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </TodoListBlock>
  );
}

export default TodoList;
