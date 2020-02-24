import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import TagElement from "./TagElement";

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPurchased: false
    };
    this.handlePurchase = this.handlePurchase.bind(this);
  }

  handlePurchase() {
    const { price } = this.props.postDetail;
    const isOk = window.confirm(`${price}円です。購入しますか？`);
    isOk &&
      this.setState({
        isPurchased: !this.state.isPurchased
      });
  }

  tagsRender() {
    return this.props.tags.map((tag, i) => <TagElement tag={tag} key={i} />);
  }

  render() {
    const {
      title,
      image_after_url,
      image_before_url,
      price,
      content
    } = this.props.postDetail;

    const newContent = content && content.slice(0, 200);
    return (
      <>
        <Grid container style={{ marginBottom: "100px" }}>
          <Grid item xs={12} md={3} lg={4}></Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card className="card">
              <CardActionArea>
                <Grid container>
                  <Grid item xs={12}>
                    <p className="before">Before</p>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      image={image_before_url}
                      width="300px"
                      height={window.innerWidth > 1100 ? "480px" : "300px"}
                      className="object-fit"
                      title="Contemplative Reptile"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <p className="after">After</p>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      image={image_after_url}
                      width="300px"
                      height={window.innerWidth > 1100 ? "480px" : "300px"}
                      className="object-fit"
                      title="Contemplative Reptile"
                    />
                  </Grid>
                  <p>
                    <span className="money">{price}円</span>
                  </p>
                  <Grid item xs={12}>
                    <CardContent>
                      <p style={{ marginTop: "-10px" }}>{this.tagsRender()}</p>
                      <Typography gutterBottom variant="h5" component="h2">
                        {title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="div"
                      >
                        {this.state.isPurchased ? (
                          <>{content}</>
                        ) : (
                          <>
                            {newContent}
                            <span
                              style={{ color: "black", fontWeight: "bold" }}
                              onClick={this.handlePurchase}
                            >
                              ...もっと見る
                            </span>
                          </>
                        )}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={3} lg={4}></Grid>
        </Grid>
        <Link to={`/create_post`} className="add-button-style">
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
        <Link to={`/`} className="back-button-style-create-form">
          <Fab color="secondary" aria-label="edit">
            <ArrowBackIosIcon style={{ marginLeft: "10px" }} />
          </Fab>
        </Link>
      </>
    );
  }
}

export default PostDetail;
