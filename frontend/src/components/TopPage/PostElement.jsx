import React, { useState, useEffect } from "react";
import "./PostElement.css";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import TagElement from "./TagElement";

const PostElement = props => {
  const [isPushFavorite, setIsPushFavorite] = useState(false);
  const {
    id,
    title,
    price,
    content,
    image_before_url,
    image_after_url,
    favorite_count
  } = props.post;

  // useEffect(() => {
  //   props.getRelatedCosmes(id);
  // }, [id, props]);

  const filterByID = item => {
    if (item.post_id === id) {
      return true;
    }
    return false;
  };

  const tagById = props.allTags.filter(filterByID);

  const onHandleToFavorite = () => {
    if (isPushFavorite) {
      setIsPushFavorite(false);
      const data = {
        favorite_count: favorite_count - 1
      };
      props.patchPostFavorite(id, data);
    } else {
      setIsPushFavorite(true);
      const data = {
        favorite_count: favorite_count + 1
      };
      props.patchPostFavorite(id, data);
    }
  };

  const tagByIdRender = () => {
    return tagById.map((tag, i) => <TagElement tag={tag} key={i} />);
  };

  const newContent = content.substr(0, 90);
  return (
    <>
      <Grid item xs={12} sm={12} md={4} className="relative">
        <Card className="card">
          <CardActionArea>
            <Link
              to={`/post/${id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <p className="before">Before</p>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    image={image_before_url}
                    width="200px"
                    height="200px"
                    className="object-fit"
                    title="Contemplative Reptile"
                  />
                </Grid>
                <Grid item xs={6}>
                  <p className="after">After</p>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    image={image_after_url}
                    width="200px"
                    height="200px"
                    className="object-fit"
                    title="Contemplative Reptile"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CardContent>
                    <p>{tagByIdRender()}</p>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className="title-postElement"
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="div"
                    >
                      {newContent} ...
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Link>
            <p>
              <span className="money">{price}円</span>
            </p>
            <div className="favorite-icon">
              {isPushFavorite ? (
                <FavoriteIcon
                  fontSize="large"
                  onClick={onHandleToFavorite}
                  color="secondary"
                />
              ) : (
                <FavoriteBorderIcon
                  fontSize="large"
                  onClick={onHandleToFavorite}
                />
              )}
              <span className="favorite-count">{favorite_count}</span>
            </div>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default PostElement;
