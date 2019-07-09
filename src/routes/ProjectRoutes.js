import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../container/App';
import Products from '../container/Products';
// import Post from '../container/Post';
import ProductDetails from '../container/ProductDetails';

// Switch between one screen to another screen
const ProjectRoutes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={props => <App {...props} />} />
      <Route
        exact
        path="/productList"
        component={props => <Products {...props} />}
      />
      <Route
        exact
        path="/productDetails"
        component={props => <ProductDetails {...props} />}
      />
    </Switch>
  </Router>
);

export default ProjectRoutes;
