import React, { Component } from "react";
import "./CreateForm.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "firebase/app";
import config from "../../firebase";
import "firebase/storage";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Spinner from "../common/Spinner";
import InputTags from "./InputTags";

const firebaseApp = firebase.initializeApp(config);

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      money: "",
      beforeImg: "",
      beforeImgDownLoaded: true,
      afterImg: "",
      afterImgDownLoaded: true,
      isLoading: false,
      tags: []
    };
  }

  componentDidMount() {
    this.props.getCosmes();
  }

  render() {
    const handleDelete = i => {
      this.setState({
        tags: this.state.tags.filter((tag, index) => index !== i)
      });
    };

    const handleAddition = tag => {
      this.setState({
        tags: [...this.state.tags, tag]
      });
    };

    const handleDrag = (tag, currPos, newPos) => {
      const newTags = this.state.tags.slice();

      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);
      this.setState({
        tags: newTags
      });
    };

    const submitPost = async e => {
      e.preventDefault();
      const data = {
        title: this.state.title,
        content: this.state.content,
        price: this.state.money,
        image_before_url: this.state.beforeImg,
        image_after_url: this.state.afterImg
      };

      await this.props.submitPost(data);
      await setTimeout(() => {
        this.props.submitCosmes(this.state.tags);
      }, 1500);
      window.scrollTo(0, 0);
      this.setState({
        isLoading: true
      });
      await setTimeout(() => {
        this.props.history.push("/");
      }, 2000);
    };

    const onChangeTitle = value => {
      this.setState({
        title: value
      });
    };

    const onChangeContent = value => {
      this.setState({
        content: value
      });
    };

    const onChangeMoney = value => {
      this.setState({
        money: value
      });
    };

    const ImgB64Resize = (imgB64_src, width, height, callback, rotate) => {
      // Image Type
      const img_type = imgB64_src.substring(5, imgB64_src.indexOf(";"));
      // Source Image
      const img = new Image();
      let newFile;
      img.onload = function() {
        // New Canvas
        const canvas = document.createElement("canvas");
        const userAgent = navigator.userAgent;
        if (
          userAgent.indexOf("iPhone") > 0 ||
          userAgent.indexOf("iPod") > 0 ||
          userAgent.indexOf("Android") > 0 ||
          userAgent.indexOf("Mobile") > 0
        ) {
          // スマホの回転対応のため以下を使用
          canvas.width = height;
          canvas.height = width;
        } else {
          canvas.width = width;
          canvas.height = height;
        }

        // canvas.width = width;
        // canvas.height = height;

        // Draw (Resize)
        const ctx = canvas.getContext("2d");
        if (rotate && rotate > 0) {
          ctx.rotate((rotate * Math.PI) / 180);
          if (rotate === 90) {
            ctx.translate(0, -height);
          }
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Destination Image
        const imgB64_dst = canvas.toDataURL(img_type);
        // base64のデコード
        const bin = atob(imgB64_dst.replace(/^.*,/, ""));
        // バイナリデータ化
        const buffer = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) {
          buffer[i] = bin.charCodeAt(i);
        }
        // ファイルオブジェクト生成(この例ではjpegファイル)
        newFile = new File([buffer.buffer], "name", {
          type: "image/png"
        });
        callback(newFile);
      };
      img.src = imgB64_src;
    };

    const uniqueId = Math.random()
      .toString(36)
      .slice(-8);
    const goFirebaseBefore = newFile => {
      firebaseApp
        .storage()
        .ref()
        .child(`images/${uniqueId}`)
        .put(newFile)
        .then(s => {
          firebaseApp
            .storage()
            .ref()
            .child(`images/${uniqueId}`)
            .getDownloadURL()
            .then(url => {
              this.setState({ beforeImg: url, beforeImgDownLoaded: true });
            });
        });
    };
    const uniqueId2 = Math.random()
      .toString(36)
      .slice(-8);
    const goFirebaseAfter = newFile => {
      firebaseApp
        .storage()
        .ref()
        .child(`images/${uniqueId2}`)
        .put(newFile)
        .then(s => {
          firebaseApp
            .storage()
            .ref()
            .child(`images/${uniqueId2}`)
            .getDownloadURL()
            .then(url => {
              this.setState({ afterImg: url, afterImgDownLoaded: true });
            });
        });
    };

    const beforeUploadImg = e => {
      this.setState({ beforeImgDownLoaded: false });
      const file = this.fileInput.files[0];
      const fr = new FileReader();
      fr.onload = e => {
        ImgB64Resize(e.target.result, 300, 300, goFirebaseBefore, 90);
      };
      fr.readAsDataURL(file);
    };

    const afterUploadImg = e => {
      this.setState({ afterImgDownLoaded: false });
      const file = this.fileInput2.files[0];

      const fr = new FileReader();
      fr.onload = e => {
        ImgB64Resize(e.target.result, 300, 300, goFirebaseAfter, 90);
      };
      fr.readAsDataURL(file);
    };

    const isDisabled =
      this.state.title &&
      this.state.content &&
      this.state.money &&
      this.state.beforeImg &&
      this.state.afterImg
        ? false
        : true;

    return (
      <React.Fragment>
        {this.state.isLoading && <Spinner />}
        <Grid container>
          <Grid item xs={12} md={3}></Grid>
          <Grid item xs={12} md={6}>
            <h4 className="createForm-h4">ビフォーアフター写真を投稿する</h4>
            <form
              noValidate
              autoComplete="off"
              className="createForm-form"
              onSubmit={submitPost}
            >
              <div>
                <InputTags
                  cosmes={this.props.cosmes}
                  tags={this.state.tags}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                />
              </div>

              <div className="createForm-title">
                <TextField
                  label="タイトル"
                  onChange={e => onChangeTitle(e.target.value)}
                />
              </div>

              <div className="createForm-button">
                <Button
                  variant="outlined"
                  color="primary"
                  component="label"
                  htmlFor="myfile"
                  width="150px"
                >
                  Before写真
                </Button>
                <input
                  accept="image/*"
                  id="myfile"
                  multiple
                  type="file"
                  style={{ display: "none" }}
                  onChange={beforeUploadImg}
                  ref={el => (this.fileInput = el)}
                />
                <div
                  className="createForm-circle"
                  style={{
                    display: this.state.beforeImgDownLoaded ? "none" : "block"
                  }}
                >
                  <CircularProgress className="createForm-circle" />
                </div>
                <div className="createForm-image" style={{ marginTop: "20px" }}>
                  <img src={this.state.beforeImg} width="200px" />
                </div>
              </div>

              <div className="createForm-button2">
                <Button
                  variant="outlined"
                  color="secondary"
                  component="label"
                  htmlFor="myfile2"
                  width="150px"
                >
                  After写真
                </Button>
                <input
                  accept="image/*"
                  id="myfile2"
                  multiple
                  type="file"
                  style={{ display: "none" }}
                  onChange={afterUploadImg}
                  ref={el => (this.fileInput2 = el)}
                />
                <div
                  className="createForm-circle"
                  style={{
                    display: this.state.afterImgDownLoaded ? "none" : "block"
                  }}
                >
                  <CircularProgress className="createForm-circle" />
                </div>
                <div className="createForm-image" style={{ marginTop: "20px" }}>
                  <img src={this.state.afterImg} width="200px" />
                </div>
              </div>

              <div className="createForm-content">
                <TextField
                  label="詳細"
                  multiline
                  rows="20"
                  variant="outlined"
                  onChange={e => onChangeContent(e.target.value)}
                />
              </div>

              <div className="createForm-money">
                <TextField
                  id="金額"
                  label="金額"
                  type="number"
                  onChange={e => onChangeMoney(e.target.value)}
                />
              </div>

              <div className="createForm-money2">
                <Link to={`/`} className="back-button-style-create-form">
                  <Fab color="secondary" aria-label="edit">
                    <ArrowBackIosIcon style={{ marginLeft: "10px" }} />
                  </Fab>
                </Link>
                <button
                  className={isDisabled ? "button-disabled" : "button-button"}
                  disabled={isDisabled ? true : false}
                >
                  {isDisabled ? "全て入力してください" : "送信"}
                </button>
              </div>
            </form>
          </Grid>
          <Grid item xs={12} md={3}></Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withRouter(CreateForm);
