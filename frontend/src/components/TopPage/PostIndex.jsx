import React from "react";
import { withRouter } from "react-router";

import "./PostIndex.css";
import Grid from "@material-ui/core/Grid";

import PostElement from "./PostElement";

//　デモデータを使う場合は、以下を参照する.
// import { demoPosts } from "../../demo/posts";

const PostIndex = ({ posts, patchPostFavorite, allTags }) => {
  return (
    <>
      <Grid container style={{ marginBottom: "100px" }}>
        {posts.map(post => (
          <PostElement
            post={post}
            key={post.id}
            allTags={allTags}
            patchPostFavorite={patchPostFavorite}
          />
        ))}
      </Grid>
    </>
  );
};

export default withRouter(PostIndex);
