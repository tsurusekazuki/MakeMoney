import React, { useState, useEffect } from "react";
import "./TopPage.css";
import PostIndex from "./PostIndex";
import Spinner from "../common/Spinner";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const TopPage = ({ posts, patchPostFavorite, allTags }) => {
  const [isLoading, setIsLoding] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoding(false), 1000);
  }, []);
  return (
    <>
      {isLoading && <Spinner />}
      <p className="center">
        <img src={logo} className="logo" />
      </p>
      <PostIndex
        posts={posts}
        patchPostFavorite={patchPostFavorite}
        allTags={allTags}
      />
      <Link to={`/create_post`} className="add-button-style">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </>
  );
};

export default TopPage;
