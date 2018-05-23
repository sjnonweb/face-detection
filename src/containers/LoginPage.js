import React, { Component } from 'react';

// third party
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Row,  
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';

// actions
import { getUser } from '../actions/userAction';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      incorrectCreds: false,
    }
  }  

  handleEmail = (e) => {
    e.preventDefault();
    this.setState({
      email: e.target.value,
    })
  }

  handlePassword = (e) => {
    e.preventDefault();
    this.setState({
      password: e.target.value,
    })
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.props.getUser(this.state.email, this.state.password, this.props.history)
      .then((success) => {
        if (success) {
          this.props.history.push({
            pathname: '/app',
          });
        } else {
          this.setState({
            incorrectCreds: true
          })
        }
      })
  }

  render() {
    const { isLoggedIn } = this.props;
    const { email, password, incorrectCreds } = this.state;

    if (isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/app",
            state: { from: this.props.location }
          }}
        />
      )
    }

    return (
      <Row className="login-page-container">
        <div className="backlayer">
          <div className="site-title">            
            <div className="name">Face Detection</div>
          </div>
          <div className="site-info">
            Upload an image to detect information about a face.
          </div>
        </div>
        <div className="login-form-container">          
          <div className="welcome-title">
            Welcome
          </div>
          <div className="welcome-message">
            Please Login to Continue
          </div>
          <Form className="login-form" onSubmit={this.handleLogin}>
            <FormGroup>
              <ControlLabel>
                Enter your registered email address
              </ControlLabel>
              <FormControl
                type="text"
                value={email}
                onChange={this.handleEmail}
                placeholder="Email Address"
                required
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                Enter your password
              </ControlLabel>
              <FormControl
                type="password"
                value={password}
                onChange={this.handlePassword}
                placeholder="Password"
                required
              />
            </FormGroup>
            <FormGroup>              
              <FormControl
                type="submit"
                value="Login"                                                
                className="submit-button"                
              />          
              {incorrectCreds &&
                <HelpBlock className="incorrect-creds">
                  Email and password don't match!
                </HelpBlock>
              }              
            </FormGroup>
          </Form>
        </div>        
      </Row>    
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
})

const mapDispatchToProps = {
  getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
