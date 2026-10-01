const TaskItem = ({ task, onToggle, onDelete }) => (
  <div className="task-item">
    <label>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className={task.completed ? "done" : ""}>{task.title}</span>
    </label>

    <button className="delete-btn" onClick={() => onDelete(task.id)}>
      [Xóa]
    </button>
  </div>
);

export default TaskItem;