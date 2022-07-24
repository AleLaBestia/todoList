import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import styles from "../styles/modules/app.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {sortedTodoList?.map((todo, id) => (
          <TodoItem todo={todo} key={id} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
