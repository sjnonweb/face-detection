import React, { Component } from 'react';

// third party
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { Provider } from 'react-redux';


// components
import LoginPage from './containers/LoginPage';
import FaceDetection from './containers/FaceDetection';

// redux store
import { configureStore } from './store/configureStore';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Grid fluid={true}>        
            <Switch>
              <Route exact path="/" component={LoginPage} />            
              <Route path="/app" component={FaceDetection} />
            </Switch>
          </Grid>
        </Router>
      </Provider>            
    );
  }
}

export default App;
