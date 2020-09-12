import React from "react";

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.like) classes += "-o";
  return (
    <i
      onClick={props.likeToggle}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
