import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import { UserContext } from "./../../index";

export const Link = props => {
  const context = useContext(UserContext);

  const handleClick = evt => {
    evt.preventDefault();
    context.linkHandler(props.to);
  };
  const activeClass = context.route === props.to ? "active" : "";
  return (
    <a className={activeClass} onClick={handleClick} href="#">
      {props.children}
    </a>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired
};
