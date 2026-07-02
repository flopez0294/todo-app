import { useEffect, useState } from "react";

type Todo = {
  id: string;
  text: string;
  complete: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  // Load all todos from Electron backend
  const loadTodos = async () => {
    const data = await window.api.getTodos();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;

    const updated = await window.api.addTodo(input);
    setTodos(updated);
    setInput("");
  };

  const toggleTodo = async (id: string) => {
    const updated = await window.api.completeTodo(id);
    setTodos(updated);
  };

  const deleteTodo = async (id: string) => {
    const updated = await window.api.deleteTodo(id);
    setTodos(updated);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-zinc-900 rounded-2xl shadow-xl p-6">

        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Todo App
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 px-4 py-2 rounded-xl bg-zinc-800 outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
          />

          <button
            onClick={addTodo}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition"
          >
            Add
          </button>
        </div>

        {/* List */}
        <div className="space-y-2">
          {todos.length === 0 && (
            <p className="text-zinc-500 text-center">
              No todos yet
            </p>
          )}

          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between bg-zinc-800 p-3 rounded-xl"
            >
              {/* Left side */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4 accent-indigo-500"
                />

                <span
                  className={
                    todo.complete
                      ? "line-through text-zinc-500"
                      : ""
                  }
                >
                  {todo.text}
                </span>
              </div>

              {/* Delete */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-400 hover:text-red-300 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}