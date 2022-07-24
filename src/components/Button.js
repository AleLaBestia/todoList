import React from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
};

function Button({ variant, type, children, ...rest }) {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      {...rest}
      className={getClasses([
        styles.button,
        styles[`button--${buttonTypes[variant]}`],
      ])}
    >
      {children}
    </button>
  );
}

function SelectButton({ children, id, ...rest }) {
  return (
    <select className={getClasses([styles.button, styles.button__select])}>
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
