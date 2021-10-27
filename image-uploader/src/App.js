import "./ImageUpload.css";
import React from "react";
import imagePlaceholder from './images/placeholder.svg'

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="container">
        <div id="card">
          <Upload />
        </div>
      </div>
    );
  }
}

export default ImageUpload;

function Upload() {
  return (
    <div id="upload-container">
      <h3>Upload your image</h3>
      <p>File sould be Jpeg, Png, ...</p>
      <div id="image-uploader">
        <img src={imagePlaceholder} alt="Upload Placeholder" width="30%" />
      </div>
      <h6>Or</h6>
      <button>Choose a file</button>
    </div>
  );
}
