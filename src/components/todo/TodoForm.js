import React from "react";
import { PropTypes } from "prop-types";

export const TodoForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <input
        type="text"
        onChange={props.handleInputChange}
        value={props.currentTodo}
      ></input>
    </form>
  );
};
TodoForm.propTypes = {
  currentTodo: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
