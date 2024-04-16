import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Login from "./Login";
const Home = ({ userName, isLoggedIn }) => {
  // State to hold the list of todos
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [id, setId] = useState([]);

  //get todo
  useEffect(() => {
    const getTodo = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/gettodo/${userName}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        const fetchedId = data.map((id) => id.id);
        setId(fetchedId);
        const fetchedTodo = data.map((todo) => todo.todo);
        setTodos(fetchedTodo);
      } catch (error) {
        console.log("error is: " + error.message);
      }
    };

    getTodo();
  }, [userName, todos]);

  //add todo
  const addTodo = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/addtodo/${userName}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ todo: todoInput }),
        credentials: "include",
      });
      if (res.status === 500) {
        toast.error("Add something to your todo first");
      }

      if (res.ok) {
        toast.success("Todo added");
        setTodoInput(" ");
      }
    } catch (error) {
      console.log("Error is:" + error);
    }
  };

  //delete todo

  const deleteTodo = async (id) => {
    try {
      console.log(id);
      const res = await fetch(`http://localhost:4000/api/deletetodo/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      if (res.ok) {
        toast("Todo Deleted");
      }
    } catch (error) {
      console.log(`Error is ${error.message}`);
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <div className="w-full flex justify-center px-5 items-center">
          <form
            className="bg-white lg:w-3/4 md:w-3/4 w-full rounded-lg p-6 shadow-md z-50"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="mb-4 flex gap-10 flex-col overflow-scroll h-[400px] scroll">
              <div className="flex gap-5 sticky top-0">
                <input
                  type="text"
                  name="todoInput"
                  placeholder="Todo"
                  value={todoInput}
                  onChange={(e) => setTodoInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1"
                />
                <button
                  type="submit" // Change button type to submit
                  className="bg-green-500 text-white hover:bg-green-600 active:bg-green-700 p-2 rounded-md flex-2"
                  onClick={addTodo}
                >
                  Add Todo
                </button>
              </div>
              <ul>
                {todos.map((todo, index) => (
                  <div
                    key={id[index]}
                    className="flex gap-10 mb-5 items-center w-full p-2"
                  >
                    <li className="flex-1">{todo}</li>
                    <button
                      className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white p-3"
                      onClick={() => deleteTodo(id[index])}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </ul>
            </div>
          </form>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
