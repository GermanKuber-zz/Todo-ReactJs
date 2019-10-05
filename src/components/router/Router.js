import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./../../index";

const getCurrentPath = () => {
  const path = document.location.pathname;
  return path.substring(path.lastIndexOf("/"));
};

export const Router = props => {
  const routeContext = useContext(UserContext);

  routeContext.linkHandler = to => {
    routeContext.route = to;
    handleClick(to);
  };

  const [route, setRoute] = useState(getCurrentPath());
  useEffect(() => {
    window.onpopstate = () => {
      var route = getCurrentPath();
      setRoute(route);
    };
  });
  const handleClick = route => {
    setRoute(route);
    window.history.pushState(null, "", route);
  };
  return <div>{props.children}</div>;
};
