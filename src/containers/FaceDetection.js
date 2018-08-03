import React, { Component } from 'react';

// third party
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Row,  
  Col,  
} from 'react-bootstrap';

// actions
import { detectFace } from '../actions/faceAction';

// assets
import spinner from '../logo.svg'

class FaceDetection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedImage: '',
      imgUrl: ','
    }
  }

  handleImage = (e) => {
    //console.log(e.target.files);
    let file = e.target.files[0]
    let reader = new FileReader();
    let self = this;
    reader.onloadend = function() {
      //console.log(reader.result)
      self.setState({
        uploadedImage: reader.result
      })
      self.props.detectFace(reader.result);
    }
    reader.readAsDataURL(file)
  }

  handleImageUrl = (e) => {
    this.setState({
      imgUrl: e.target.value,      
    })
  }

  handleImageUrlUpload = () => {
    this.setState({
      uploadedImage: this.state.imgUrl
    })
    this.props.detectFace(this.state.imgUrl)
  }

  render() {
    const { isLoggedIn, isDetecting, error, faces } = this.props;
    const { uploadedImage } = this.state;

    const face = ((faces.length > 0) && faces[0]) || null;
    const attributes = (face && face.attributes) || null;
    let age = 0;
    let race = '';
    let gender = '';
    let glasses = '';
    let lips = '';
    if (attributes) {
      // finding race
      let races = [
        {name: 'asian', val: attributes.asian},
        {name: 'black', val: attributes.black},
        {name: 'hispanic', val: attributes.hispanic},
        {name: 'white', val: attributes.white},
        {name: 'other', val: attributes.other},
      ]
      races.sort((a, b) => b.val - a.val);
      race = races[0].name;

      // finding age
      age = attributes.age;

      // finding gender
      gender = attributes.gender.type === "F" ? "female" : "male";

      // finding glasses
      glasses = attributes.glasses;

      // finding lips
      lips = attributes.lips
    }  

    if (!isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/"            
          }}
        />
      )
    }
    return (
      <Row className="face-detection-container">
        <Col md={6} className="left">
          <div className="input-container">
            <img
              className="uploaded-image center-block"
              src={uploadedImage}
              alt=""
            />
            <div className="input-buttons">
              <input
                type="file"
                accept="image/*"
                onChange={this.handleImage}
                onClick={(event) => event.target.value = null}
                id="upload-image-input"                
              />
              <label htmlFor="upload-image-input">
                <i className="fas fa-upload"></i>Upload Image
              </label>
              <input
                className="img-url text-center"
                type="text"
                onChange={this.handleImageUrl}
                placeholder="Image URL"

              />
              <button
                className="img-url-submit"
                onClick={this.handleImageUrlUpload}
              >
                Go
              </button>
            </div>            
          </div>            
        </Col>
        <Col md={6} className="right">
          <div className="output-container">
            {isDetecting &&
              <img className="loading-spinner" src={spinner} alt=""/>
            }
            {!isDetecting && !error &&
              <div>
                <div className="attr-item gradient-1">
                  <div className="attr-key">
                    <i className="fas fa-fw fa-heartbeat"></i>
                    Age:
                  </div>
                  {age > 0 &&
                    <div className="attr-val text-capitalize">                                        
                      {age} Years
                    </div>
                  }
                </div>
                <div className="attr-item gradient-2">
                  <div className="attr-key">
                    <i className="fas fa-fw fa-globe"></i>
                    Race:
                </div>
                  <div className="attr-val text-capitalize">
                    {race}
                </div>
                </div>
                <div className="attr-item gradient-3">
                  <div className="attr-key">
                    <i className={`fas fa-fw fa-transgender`}></i>
                    Gender:
                </div>
                  <div className="attr-val text-capitalize">
                    {gender}
                </div>
                </div>
                <div className="attr-item gradient-4">
                  <div className="attr-key">
                    <i className="fas fa-fw fa-eye"></i>
                    Glasses:
                </div>
                  <div className="attr-val text-capitalize">
                    {glasses}
                </div>
                </div>
                <div className="attr-item gradient-5">
                  <div className="attr-key">
                    <i className="fas fa-fw fa-user"></i>
                    Lips:
                  </div>
                  <div className="attr-val text-capitalize">
                    {lips}
                  </div>
                </div>
              </div>
            }
            {error &&
              <div className="error-msg text-capitalize">
                {error.length > 0 &&
                  error[0].Message
                }
                {error.length === 0 &&
                  `There was an error!!`
                }
              </div>
            }           
          </div>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  isDetecting: state.face.isDetecting,
  error: state.face.error,
  faces: state.face.faces,
})

const mapDispatchToProps = {
  detectFace,
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceDetection);
