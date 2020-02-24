import axios from "axios";
import {
  POST_DETAIL,
  SUBMIT_POST,
  GET_POSTS,
  PATCH_POST_FOR_FAVORITE,
  GET_COSMES,
  SUBMIT_COSMES,
  GET_TAGS,
  GET_RELATED_COSMES
} from "./../constants/actionTypes";

const API_KEY = process.env.REACT_APP_API_KEY;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export const getCosmes = () => dispatch => {
  axios
    .get(`https://teamccosmeapp.herokuapp.com/tags`)
    .then(response => {
      const data = response.data;
      dispatch({ type: GET_COSMES, data });
    })
    .catch(data => {
      console.log("data:", data);
    });
};

export const getPostDetail = id => async dispatch => {
  const response = await axios.get(
    `https://teamccosmeapp.herokuapp.com/post/${id}`
  );
  dispatch({ type: POST_DETAIL, response });
};

export const submitPost = data => async dispatch => {
  axios
    .post(`https://teamccosmeapp.herokuapp.com/posts`, { post: data })
    .then(response => {
      dispatch({ type: SUBMIT_POST });
    })
    .catch(data => {
      console.log("data:", data);
    });
};

export const submitCosmes = data => async dispatch => {
  let length = 0;
  await axios
    .get(`https://teamccosmeapp.herokuapp.com/posts`)
    .then(response => {
      const data = response.data;
      length = data.length;
    })
    .catch(data => {
      console.log("data:", data);
    });

  const newData = data.map(element => {
    const Obj = {};
    if (element.id === element.text) {
      Obj["post_id"] = length;
      Obj["tag_id"] = null;
      Obj["name"] = element.text;
    } else {
      Obj["post_id"] = length;
      Obj["tag_id"] = String(element.id);
      Obj["name"] = element.text;
    }
    return Obj;
  });
  await axios
    .post(`https://teamccosmeapp.herokuapp.com/post/${length}/tags`, {
      post_tags: newData
    })
    .then(response => {
      dispatch({ type: SUBMIT_COSMES });
    })
    .catch(data => {
      console.log("data:", data);
    });
};

export const getPosts = () => async dispatch => {
  axios
    .get(`https://teamccosmeapp.herokuapp.com/posts`)
    .then(response => {
      const data = response.data;
      data.sort((a, b) => {
        if (a.favorite_count > b.favorite_count) return -1;
        if (a.favorite_count < b.favorite_count) return 1;
        return 0;
      });
      dispatch({ type: GET_POSTS, data });
    })
    .catch(data => {
      console.log("data:", data);
    });
};

export const patchPostFavorite = (id, data) => dispatch => {
  axios
    .patch(`https://teamccosmeapp.herokuapp.com/post/${id}`, { post: data })
    .then(response => {
      const data = response.data;
      dispatch({ type: PATCH_POST_FOR_FAVORITE, data });
    })
    .catch(data => {
      console.log("data:", data);
    });
};

export const getRelatedCosmes = id => dispatch => {
  axios
    .get(`https://teamccosmeapp.herokuapp.com/post/${id}/tags`)
    .then(response => {
      const data = response.data;
      dispatch({ type: GET_RELATED_COSMES, data });
    })
    .catch(data => {
      console.log("data:", data);
    });
};

export const getTags = () => async dispatch => {
  axios
    .get(`https://teamccosmeapp.herokuapp.com/posttags`)
    .then(response => {
      const data = response.data;
      dispatch({ type: GET_TAGS, data });
    })
    .catch(data => {
      console.log("data:", data);
    });
};
