import { useState, useRef } from "react";

const TodoWithRef = () => {
  const [toDos, setTodos] = useState<
    Array<{ data: string; completed: boolean }>
  >([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    const text = inputRef.current?.value;
    if (!text || text == "") {
      alert("Can not add empty Todo");
      return;
    }

    setTodos((prev) => [{ data: text, completed: false }, ...prev]);
    inputRef.current.value = "";
  };

  const removeData = (index: number) => {
    setTodos((prev) => {
      return prev.filter((_, idx) => index !== idx);
    });
  };
  const checkTodos = (index: number) => {
    setTodos((prev) => {
      return prev.reduce<Array<{ data: string; completed: boolean }>>(
        (acc, curr, idx) => {
          if (index === idx) {
            return [...acc, { data: curr.data, completed: !curr.completed }];
          } else return [...acc, curr];
        },
        []
      );
    });
  };

  return (
    <>
      <div>
        <div>Total Number of Todos: {toDos.length}</div>
        <div>
          Number of pending Todos pending:
          {toDos.filter((item) => item.completed === false).length}
        </div>
        <div>
          completed Todos :
          {toDos.filter((item) => item.completed === true).length}
        </div>
        {/* <input type="text"  value ={text} onChange={(e)=>{setText(e.target.value)}}></input> */}
        <input type="text" ref={inputRef}></input>
        <button onClick={addTodo}>Add</button>
      </div>

      <div>
        <ul>
          {toDos.map((data, index) => {
            return (
              <div key={data.data}>
                <li className="text_data">
                  {data.data}
                  <button className="btn" onClick={() => removeData(index)}>
                    -
                  </button>
                  <input
                    checked={data.completed}
                    type="checkbox"
                    onChange={() => checkTodos(index)}
                  ></input>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default TodoWithRef;
