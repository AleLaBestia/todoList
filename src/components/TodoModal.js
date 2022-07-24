import React, { useEffect, useState } from "react";
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "./redux/todoSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.7)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.7)",
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Incomplete");
  const [deadline, setDeadline] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
      setDeadline(todo.deadline);
    } else {
      setTitle("");
      setStatus("Incomplete");
      setDeadline("");
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(true);
    if (title && deadline && status) {
      switch (type) {
        case "add":
          dispatch(
            addTodo({
              id: uuid(),
              title,
              status,
              deadline,
              time: new Date().toLocaleString(),
            })
          );
          toast.success("Task Modifided ");
          setModalOpen(false);
          break;

        case "update":
          dispatch(
            updateTodo({
              ...todo,
              title,
              status,
              deadline,
            })
          );
          toast.success("Task Modifided ");
          setModalOpen(false);
          break;

        default:
          return;
      }
    } else {
      toast.error("Please complete all the fields");
    }
  };

  return (
    <>
      <>
        {modalOpen && (
          <motion.div
            className={styles.wrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.container}
              variants={dropIn}
              initial="hidden"
              exit={{
                transform: "scale(0.7)",
                opacity: 0,
              }}
              animate="visible"
            >
              <motion.div
                className={styles.closeButton}
                onKeyDown={() => setModalOpen(false)}
                onClick={() => setModalOpen(false)}
                role="button"
                tabIndex={0}
                // animation
                initial={{ top: 40, opacity: 0 }}
                animate={{ top: -10, opacity: 1 }}
                exit={{ top: 40, opacity: 0 }}
              >
                <MdOutlineClose />
              </motion.div>
              <form className={styles.form}>
                <h1 className={styles.formTitle}>
                  {type === "update" ? "Update" : "Add"} Task
                </h1>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => {
                      e.preventDefault();
                      setTitle(e.target.value);
                    }}
                  />
                </label>
                <label htmlFor="deadline">
                  Deadline
                  <input
                    type="text"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => {
                      setDeadline(e.target.value);
                    }}
                  />
                </label>
                <label htmlFor="status">
                  Status
                  <select
                    type="text"
                    id="status"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <option value="Done">Done</option>
                    <option value="Not Started">Not Started</option>
                    <option value="Incomplete">Incomplete</option>
                  </select>
                </label>
                <div className={styles.buttonContainer}>
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={(e) => handleSubmit(e)}
                  >
                    {type === "update" ? "Update" : "Add"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </>
    </>
  );
}

export default TodoModal;
