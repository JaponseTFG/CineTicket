import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import ImageUploader from "react-images-upload";
import * as actions from "../../../actions";
import axios from "axios";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.props.actualizaPelicula({nueva_imagen : pictureFiles[0]});
  }

  render() {
    return (
      <ImageUploader
        style={{ minHeight: "250px" }}
        className="card-panel col s10 m4  brown lighten-5"
        fileContainerStyle={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        withLabel={false}
        withIcon={true}
        buttonClassName="btn-floating deep-purple lighten-2"
        buttonText={<i className="material-icons">file_upload</i>}
        onChange={this.onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
        withIcon={false}
        withPreview={true}
        singleImage={true}
      />
    );
  }
}

export default connect(null, actions)(Dropzone);
