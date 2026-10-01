import { useMemo, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import useLocalStorage from "./hooks/useLocalStorage";
import { initialTasks } from "./tasks";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { darkMode } = useTheme();
  const [tasks, setTasks] = useLocalStorage("mini-task-manager-tasks", initialTasks);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const addTask = (title) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title, completed: false }
    ]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchFilter =
        filter === "all" ||
        (filter === "active" && !task.completed) ||
        (filter === "completed" && task.completed);

      return matchSearch && matchFilter;
    });
  }, [tasks, filter, search]);

  const completed = tasks.filter((task) => task.completed).length;
  const active = tasks.length - completed;

  return (
    <main className={darkMode ? "app dark" : "app"}>
      <section className="card">
        <Header />

        <TaskForm onAdd={addTask} />

        <div className="controls">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Tất cả ▼</option>
            <option value="active">Chưa làm</option>
            <option value="completed">Hoàn thành</option>
          </select>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm..............."
          />
        </div>

        <div className="stats">
          Tổng: {tasks.length} &nbsp;|&nbsp; Chưa làm: {active} &nbsp;|&nbsp; Hoàn thành: {completed}
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </section>
    </main>
  );
}

export default App;