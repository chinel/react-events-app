import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card,
  Icon
} from "semantic-ui-react";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { uploadProfileImage } from "../userActions";
import {toastr} from 'react-redux-toastr'
const actions = {
  uploadProfileImage
};

class PhotosPage extends Component {
  state = {
    files: [],
    fileName: "",
    cropResult: null,
    image: {}
  };

  //We have to make this an async method because we want to be sure that the image is uploaded before we can alert to the user that the image is uploaded
  uploadImage = async () => {
    try {
      await this.props.uploadProfileImage(
        this.state.image,
        this.state.fileName
      );// we used await to make sure that this function coompleted before any other

     this.cancelCrop();
     toastr.success('Success','Photo has been uploaded');
    } catch (error) {
        toastr.error('Oops',error.message);
    }
  };


  cancelCrop = () =>{
      this.setState({
          files:[],
          image:{}
      })
  }

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === "undefined") {
      return;
    }

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      this.setState({
        cropResult: imageUrl,
        image: blob
      });
    }, "image/jpeg");
  };

  onDrop = files => {
    this.setState({
      files: files,
      fileName: files[0].name
    });
  };

  render() {
    return (
      <Segment>
        <Header dividing size="large" content="Your Photos" />
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div style={{ paddingTop: "30px", textAlign: "center" }}>
                <Icon name="upload" size="huge" />
                <Header content="Drop image here or click to add" />
              </div>
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 2 - Resize image" />
            {this.state.files[0] && (
              <Cropper
                style={{ height: "200px", width: "100px" }}
                ref="cropper"
                src={this.state.files[0].preview}
                aspectRatio={1}
                viewMode={0}
                dragMode="move"
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
              />
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 3 - Preview and Upload" />
            {this.state.files[0] && (
              <div>
                  <Image
                style={{ minHeight: "200px", minWidth: "200px" }}
                src={this.state.cropResult}
              />
              <Button.Group>
                  <Button onClick={this.uploadImage} style={{width: '100px'}} positive icon="check"/>
                  <Button onClick={this.cancelCrop} style={{width: '100px'}} icon="close"/>
              </Button.Group>
              </div>
            )}
            {/*The preview comes from the dropzone iamge which does allow us to preview the image */}
          </Grid.Column>
        </Grid>

        <Divider />
        <Header sub color="teal" content="All Photos" />

        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src="https://randomuser.me/api/portraits/men/20.jpg" />
            <Button positive>Main Photo</Button>
          </Card>

          <Card>
            <Image src="https://randomuser.me/api/portraits/men/20.jpg" />
            <div className="ui two buttons">
              <Button basic color="green">
                Main
              </Button>
              <Button basic icon="trash" color="red" />
            </div>
          </Card>
        </Card.Group>
      </Segment>
    );
  }
}

export default connect(null, actions)(PhotosPage);
