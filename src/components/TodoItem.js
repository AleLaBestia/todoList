import React, { useEffect, useState } from "react";
import styles from "../styles/modules/todoItem.module.scss";
import { getClasses } from "../utils/getClasses";
import { format } from "date-fns/esm";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "./redux/todoSlice";
import { toast } from "react-hot-toast";
import TodoModal from "./TodoModal";
import CheckButton from "./CheckButton";
import { motion } from "framer-motion";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (todo.status === "Done") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Task Deleted");
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
    console.log("updating");
  };

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(updateTodo({ ...todo, status: checked ? "incomplete" : "Done" }));
  };
  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === "Done" && styles["todoText--completed"],
              ])}
            >
              <b style={{ fontSize: "3rem" }}>{todo.title}</b>
            </p>
            <p className={styles.time}>
              <b style={{ color: "green" }}>Created: </b>{" "}
              {format(new Date(todo.time), "p- MM/dd/yyyy")}
            </p>
            <p className={styles.time}>
              <b style={{ color: "red" }}>Deadline: </b>
              {todo.deadline}
            </p>
            <p className={styles.time}>
              <b>Status: </b>
              {todo.status}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div className={styles.icon} onClick={handleDelete}>
            <MdDelete />
          </div>
          <div className={styles.icon} onClick={handleUpdate}>
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        todo={todo}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  );
}

export default TodoItem;
