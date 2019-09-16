import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { SliderObj, PageContentMode } from "../slides/SliderObj";
import PagePanel from "./components/PagePanel";
import Download from "./components/download";
import getURL from "../settings";
import $ from "jquery";
import { Snackbar } from "@material-ui/core";

export default class Editor extends Component {
  constructor() {
    super();
    this.slides = new SliderObj();
    this.state = { page: this.slides, data: "", id: null, message: "", changes : 0 };
  }

  componentDidMount() {
    try {
      let json = this.slides.toJSONObj();
      this.props.update(json);
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate(prev) {
    if (this.props.data !== prev.data && this.props.data.length > 0) {
      this.slides.pages = this.props.data;
      this.setState({ page: this.slides, id: this.props.id });
    }
  }

  updateData = (i, data) => {
    this.slides.setPage(i, data);
    let json = this.slides.toJSONObj();
    let changes = this.state.changes + 1
    console.log(changes)
    if(changes > 10 && this.state.id !== null){
      this.upload()
      changes = 0
    }

    this.setState({ data: json, page: this.slides, changes: changes });
    this.props.update(json);
  };

  /*
   * Upload the data to server
   */
  upload = () => {
    let url =
      this.state.id === null
        ? getURL("create/app")
        : getURL("update/" + this.state.id);
    if (this.state.data === "") return;
    console.log(this.state.page.toJSONObj())
    $.ajax({
      url: url,
      type: this.state.id === null ? "POST" : "PUT",
      dataType: "json",
      data: {
        name: this.state.page.pages[0].text.contentText,
        description: this.slides.pages[0].text.contentText,
        config_file: this.state.page.toJSON()
      },
      success: data => {
        this.setState({ id: data.pk, message: "Saved" });
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="col-12">
          <Download
            text={this.state.page.toJSONObj()}
            add={() => {
              this.slides.addPage();
              this.setState({ page: this.slides });
              let json = this.slides.toJSONObj();
              this.props.update(json);
            }}
            upload={this.upload}
          />
          <PagePanel
            isDownloaded={this.props.isDownloaded}
            onLoadEnd={this.props.onLoadEnd}
            pageContent={this.state.page.toJSONObj()[this.props.pageNum]}
            index={this.props.pageNum}
            update={this.updateData}
          />
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.message !== ""}
            onClose={() => {
              this.setState({ message: "" });
            }}
            autoHideDuration={3000}
            message={<span>{this.state.message}</span>}
          />
        </div>
      </div>
    );
  }
}
