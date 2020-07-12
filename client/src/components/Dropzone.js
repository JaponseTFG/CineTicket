import React from "react";
import { Component } from "react";
import ImageUploader from 'react-images-upload';
import axios from "axios";

class Dropzone extends Component {
  constructor(props) {
      super(props);
      this.setState({picture : "",datapicture:""});
      this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictureFiles, pictureDataURLs) {
      this.setState({ picture: pictureFiles[0], datapicture:pictureDataURLs[0]});
      console.log("FILE",pictureFiles);
      console.log("DATA",pictureDataURLs);
      this.uploadin(pictureFiles[0]);
    }
    async uploadin(pictureFiles){
      try{
        const data = new FormData();
      data.append('file', pictureFiles);
      console.log("sending",data);
      const res = await axios.post("/api/admin/upload", data);
      console.log("sended",res);}catch(e){console.log(e)};
    }
    render() {
      return (
        <ImageUploader
          style={{minHeight:"250px"}}
          className="card-panel col s12 m4  brown lighten-5"
          fileContainerStyle={{backgroundColor:"transparent",boxShadow:"none"}}
          withLabel={false}
          withIcon={true}
          buttonClassName="btn-floating"
          buttonText={<i className="material-icons">edit</i>}
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

export default Dropzone;
