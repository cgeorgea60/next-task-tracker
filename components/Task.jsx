import { FaTimes } from "react-icons/fa";

import Modal from "./Modal";

const Task = ({ onIsOpen, onClose, task, onDelete, onToggle, onOpen }) => {
 
  return (
    <div
      className={`task ${task.reminder ? "reminder" : " "}`}
      onDoubleClick={() => onToggle(task._id)}
      >
      <h3>
        {task.text}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={onOpen}
          />
      </h3>
      <p style={{ fontSize: "small" }}>{task.day}</p>
      <Modal
        onIsOpen={onIsOpen}
        onClose={onClose}
        onDelete={onDelete}
        task={task}
      />
    </div>
  );
};

export default Task;
