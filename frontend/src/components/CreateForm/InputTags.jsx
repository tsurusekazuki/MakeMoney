import React, { useState, useEffect } from "react";
import { WithContext as ReactTags } from "react-tag-input";

import "./InputTags.css";

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const InputTags = ({
  tags,
  cosmes,
  handleDelete,
  handleAddition,
  handleDrag
}) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    cosmes && setSuggestions(cosmes);
  }, [cosmes]);

  return (
    <ReactTags
      tags={tags}
      suggestions={suggestions}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      delimiters={delimiters}
      placeholder="利用したコスメ名を入力"
    />
  );
};

export default InputTags;
