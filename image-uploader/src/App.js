import "./ImageUpload.css";
import React from "react";
import imagePlaceholder from "./images/placeholder.svg";
import Check from "./images/ok-1976099.svg";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      imgFile: "greatImg",
    };

    this.uploadImage = this.uploadImage.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
    this.inputUpload = this.inputUpload.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  uploadImage(e) {
    e.preventDefault();
    this.setState({
      status: 2,
    });
    //this.uploadImg(e.dataTransfer.items[0].getAsFile());
    e.target.classList.remove("image-uploader-active");
  }

  inputUpload(e) {
    this.setState({
      status: 2,
    });
    //this.uploadImg(e.target.files[0]);
  }

  uploadImg(img) {
    console.log(img);
    if (
      img.type === "image/png" ||
      img.type === "image/jpg" ||
      img.type === "image/jpeg" ||
      img.type === "image/gif"
    ) {
      const formData = new FormData();

      formData.append("photo", img);

      


    } else {
      this.setState(() => ({
        status: 0,
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
    alert("Copied the text: " + this.state.imgFile);
  }

  render() {
    return (
      <div id="container">
        <div id="card">
          {this.state.status === 0 && (
            <div>
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
                <button class="button" onClick={this.copyToClipboard}>Copy Link</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ImageUpload;
