import "./ImageUpload.css";
import React from "react";
import imagePlaceholder from "./images/placeholder.svg";
import Check from "./images/ok-1976099.svg";
require('dotenv').config()

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      imgFile: '',
      error: ''
    };

    this.uploadImage = this.uploadImage.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
    this.inputUpload = this.inputUpload.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  uploadImage(e) {
    e.preventDefault();
    this.setState({
      status: 1,
      error: ''
    });
    this.uploadImg(e.dataTransfer.files[0]);
    e.target.classList.remove("image-uploader-active");
  }

  inputUpload(e) {
    this.setState({
      status: 1,
      error: ''
    });
    this.uploadImg(e.target.files[0]);
  }

  async uploadImg(img) {
    if (
      img.type === "image/png" ||
      img.type === "image/jpg" ||
      img.type === "image/jpeg" ||
      img.type === "image/gif"
    ) {

      let cloudname = process.env.REACT_APP_IMAGE_CLOUD_NAME

      const fileForm = new FormData();
      fileForm.append('file', img);
      fileForm.append('upload_preset', process.env.REACT_APP_IMAGE_CLOUD_PRESET);
      fileForm.append('cloud_name', cloudname);

      await fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, {
        method: 'POST',
        body: fileForm
      })
        .then(res => res.json())
        .then(data => {
          if(data.error) {
            this.setState(() => ({
              status: 0,
              error: 'An Error occurred while uploading. Please try again.'
            }));
          } else {
          this.setState(() => ({
            status: 2,
            imgFile: data.url
          }));
        }
        })
    } else {
      this.setState(() => ({
        status: 0,
        error: "Your File isn't a support Image Format."
      }));
    }
  }

  dragOver(e) {
    e.preventDefault();
    e.target.classList.add("image-uploader-active");
  }

  dragLeave(e) {
    e.target.classList.remove("image-uploader-active");
  }

  copyToClipboard(e) {
    navigator.clipboard.writeText(this.state.imgFile);
  }

  changeState(e) {
    this.setState(() => ({
      status: parseInt(e.target.attributes.state.value),
    }));
  }

  render() {
    return (
      <div id="container">
        <div id="card">
          {this.state.status === 0 && (
            <div>
              {this.state.error !== '' && (
              <div id="error-message">
                {this.state.error}
              </div>)}
              <h3>Upload your image</h3>
              <p>File sould be Jpeg, Png, ...</p>

              <input
                type="file"
                hidden
                id="file-upload"
                accept="image/*"
                onChange={this.inputUpload}
              />
              <div
                id="image-uploader"
                onDrop={this.uploadImage}
                onDragOver={this.dragOver}
                onDragLeave={this.dragLeave}
              >
                <img
                  src={imagePlaceholder}
                  alt="Upload Placeholder"
                  width="30%"
                />
                <h6>Drag & Drop your Image here</h6>
              </div>
              <h6>Or</h6>
              <label htmlFor="file-upload">
                <div className="button">Choose a file</div>
              </label>
            </div>
          )}
          {this.state.status === 1 && (
            <div id="upload">
              <h3>Uploading...</h3>
              <progress></progress>
            </div>
          )}
          {this.state.status === 2 && (
            <div>
              <h6 className="back" state="0" onClick={this.changeState}><i className="fas fa-caret-left"></i> Back to Start</h6>
              <img src={Check} alt="Checkmark" width="60px" />
              <h3>Uploaded Successfully!</h3>
              <img
                src={this.state.imgFile}
                alt="User Photograph"
                width="100%"
                id="user-image"
              />
              <div id="img-link">
                <input type="text" value={this.state.imgFile} />
                <button className="button" onClick={this.copyToClipboard}>
                  Copy Link
                </button>
              </div>
            </div>
          )}
        </div>
        <h6>Created by Lucas</h6>
      </div>
    );
  }
}

export default ImageUpload;
