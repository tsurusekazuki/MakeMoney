import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

import reducer from "./reducers/rootReducer";
import TopPageContainer from "./containers/TopPageContainer";
import PostDetailContainer from "./containers/PostDetailContainer";
import CreateFormContainer from "./containers/CreateFormContainer";
import ScrollToTop from "./ScrollToTop";

const enhancer =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);
const store = createStore(reducer, enhancer);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <Switch>
              <Route path="/" component={TopPageContainer} exact />
              <Route
                path="/create_post"
                component={CreateFormContainer}
                exact
              />
              <Route path="/post/:id" component={PostDetailContainer} exact />
              <Redirect to="/" />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
