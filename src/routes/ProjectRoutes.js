
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../container/App'

// Switch between one screen to another screen
const ProjectRoutes = () => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        component={props => <App {...props} />}
      />
    </Switch>
  </Router>
)

export default ProjectRoutes