import React, { Component } from "react";
import "../../App.css";
import Editor from "../editor/Editor";
import { MobileStepper, Button } from "@material-ui/core";
import Display from "../slider/Display";
import $ from "jquery";
import getURL from "../settings";


const initState = {
  data: [],
  pageNum: 0,
  id: "",
  isDownloaded: false
};

export default class EditMode extends Component {
  constructor() {
    super();
    this.state = initState;
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id !== undefined) {
      $.getJSON(getURL("update/" + id), data => {
        data = JSON.parse(data.config_file);
        console.log(data)
        this.setState({ data: data, id: id ,isDownloaded: true});
      });
    }
  }

  update = data => {
    this.setState({ data: data });
  };

  render() {
    return (
      <div className="container-fluid" style={{ marginTop: "70px" }}>
        <div className="row">
          <MobileStepper
            variant="dots"
            position="top"
            steps={this.state.data.length}
            activeStep={this.state.pageNum}
            nextButton={
              <Button
                disabled={this.state.pageNum + 1 >= this.state.data.length}
                onClick={() => {
                  this.setState({ pageNum: this.state.pageNum + 1 });
                }}
              >
                Next
              </Button>
            }
            backButton={
              <Button
                disabled={this.state.pageNum === 0}
                onClick={() => {
                  this.setState({ pageNum: this.state.pageNum - 1 });
                }}
              >
                Prev
              </Button>
            }
          />
          <div className="col-md-6">
            <Editor
              id={this.state.id}
              data={this.state.data}
              update={this.update}
              pageNum={this.state.pageNum}
              isDownloaded={this.state.isDownloaded}
              onLoadEnd={()=>{this.setState({isDownloaded: false})}}
            />
          </div>
          <div className="col-md-6">
            <Display
              data={
                this.state.data.length !== 0
                  ? this.state.data[this.state.pageNum]
                  : { image: null, text: null, backgroundColor: null }
              }
              pageNum={this.state.pageNum}
              showAnimation={true}
            />
          </div>
        </div>
      </div>
    );
  }
}
