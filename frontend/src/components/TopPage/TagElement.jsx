import React from "react";
import "./TagElement.css";

const TagElement = ({ tag }) => {
  return (
    <span className="tag-element-style">
      {tag.text}
      {tag.tag_name}
    </span>
  );
};

export default TagElement;
