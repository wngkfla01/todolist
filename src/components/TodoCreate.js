// import React, { useState } from 'react';
// import styled, { css } from 'styled-components';
// import { MdAdd } from 'react-icons/md';

// const CircleButton = styled.button`
//   background: #38d9a9;
//   &:hover {
//     background: #63e6be;
//   }
//   &:active {
//     background: #20c997;
//   }

//   z-index: 5;
//   cursor: pointer;
//   width: 80px;
//   height: 80px;
//   display: block;
//   align-items: center;
//   justify-content: center;
//   font-size: 60px;
//   position: absolute;
//   left: 50%;
//   bottom: 0px;
//   transform: translate(-50%, 50%);
//   color: white;
//   border-radius: 50%;
//   border: none;
//   outline: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   transition: 0.125s all ease-in;
//   ${(props) =>
//     props.open &&
//     css`
//       background: #ff6b6b;
//       &:hover {
//         background: #ff8787;
//       }
//       &:active {
//         background: #fa5252;
//       }
//       transform: translate(-50%, 50%) rotate(45deg);
//     `}
// `;

// const InsertFormPositioner = styled.div`
//   width: 100%;
//   bottom: 0;
//   left: 0;
//   position: absolute;
// `;

// const InsertForm = styled.form`
//   background: #f8f9fa;
//   padding-left: 32px;
//   padding-top: 32px;
//   padding-right: 32px;
//   padding-bottom: 72px;

//   border-bottom-left-radius: 16px;
//   border-bottom-right-radius: 16px;
//   border-top: 1px solid #e9ecef;
// `;

// const Input = styled.input`
//   padding: 12px;
//   border-radius: 4px;
//   border: 1px solid #dee2e6;
//   width: 100%;
//   outline: none;
//   font-size: 18px;
//   box-sizing: border-box;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 12px;
//   background: orange;
//   border: none;
//   border-radius: 4px;
//   font-size: 18px;
// `;

// function TodoCreate() {
//   const [todo, setTodo] = useState('');
//   const [open, setOpen] = useState(false);

//   const onToggle = () => setOpen(!open);

//   const todoHandler = (e) => {
//     e.preventDefault();
//     setTodo(e.target.value);
//   };

//   async function submitHandler(e) {
//     e.preventDefault();

//     const res = await fetch(
//       'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
//       {
//         method: 'POST',
//         headers: {
//           'content-type': 'application/json',
//           apikey: 'KDT5_nREmPe9B',
//           username: 'KDT5_JuHaRim',
//         },
//         body: JSON.stringify({
//           title: todo,
//         }),
//       },
//     );
//     await res.json();
//   }

//   return (
//     <>
//       {open && (
//         <InsertFormPositioner>
//           <InsertForm onSubmit={submitHandler}>
//             <Input
//               autoFocus
//               placeholder="또 니가 해야 할 일은"
//               value={todo}
//               onChange={todoHandler}
//             />
//             <Button type="submit">산더미같은 할 일에 또하나 더하기</Button>
//           </InsertForm>
//         </InsertFormPositioner>
//       )}
//       <CircleButton onClick={onToggle} open={open}>
//         <MdAdd />
//       </CircleButton>
//     </>
//   );
// }

// export default TodoCreate;
