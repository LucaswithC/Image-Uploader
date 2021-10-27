import "./ImageUpload.css";
import React from "react";
import imagePlaceholder from './images/placeholder.svg'
import Check from './images/ok-1976099.svg'

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 0,
    };

    this.changeState = this.changeState.bind(this);

  }

  componentDidMount() {
    setInterval( this.changeState, 2000 )
  }

  changeState() {
    let now = this.state.order + 1 === 3 ? 0 : this.state.order + 1
    this.setState((state) => ({
      order: now
    }))
  }

  render() {

    let sites = [<FileSelect />, <Upload />, <Success />]

    return (
      <div id="container">
        <div id="card">
          {sites[this.state.order]}
        </div>
      </div>
    );
  }
}

export default ImageUpload;

function FileSelect() {
  return (
    <div>
      <h3>Upload your image</h3>
      <p>File sould be Jpeg, Png, ...</p>
      <div id="image-uploader">
        <img src={imagePlaceholder} alt="Upload Placeholder" width="30%" />
        <h6>Drag & Drop your Image here</h6>
      </div>
      <h6>Or</h6>
      <button>Choose a file</button>
    </div>
  );
}


function Upload() {
  return(
    <div id="upload">
      <h3>Uploading...</h3>
      <progress max="100" value="80"></progress>
    </div>
  )
}

function Success() {
  return(
    <div>
      <img src={Check} alt="Checkmark" width="60px" />
      <h3>Uploaded Successfully!</h3>
      <img src={imagePlaceholder} alt="User Photograph" width="100%" id="user-image" />
      <div id="img-link">
      <input type="text" value="https://upload.wikimedia.org/wikipedia/commons/commons" /><button>Copy Link</button>
      </div>
    </div>
  )
}