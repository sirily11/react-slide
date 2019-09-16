import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { SliderObj, Page } from "../slides/SliderObj";
import PagePanel from "./components/PagePanel";
import Download from "./components/download";
import { getURL } from "../settings";
import { Snackbar } from "@material-ui/core";
import axios from "axios";

interface Props {
  data: any;
  id: any;
  changes: number;
  update(json: any): void;
  isDownloaded: boolean;
  onLoadEnd: any;
  pageNum: number;
}

interface State {
  page: SliderObj;
  data: Page[];
  message: String;
  changes: number;
  id?: number;
}

export default class Editor extends Component<Props, State> {
  slides: SliderObj;

  constructor(props: Props) {
    super(props);
    this.slides = new SliderObj();
    this.state = {
      page: this.slides,
      data: [],
      message: "",
      changes: 0
    };
  }

  componentDidMount() {
    try {
      let json = this.slides.toJSONObj();
      this.props.update(json);
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate(prev: Props) {
    if (this.props.data !== prev.data && this.props.data.length > 0) {
      this.slides.pages = this.props.data;
      this.setState({ page: this.slides, id: this.props.id });
    }
  }

  updateData = (i: number, data: any) => {
    this.slides.setPage(i, data);
    let json = this.slides.toJSONObj();
    let changes = this.state.changes + 1;
    if (changes > 10 && this.state.id !== null) {
      this.upload();
      changes = 0;
    }
    this.setState({ changes: changes, data: json });
    this.setState({ data: json, page: this.slides, changes: changes });
    this.props.update(json);
  };

  /*
   * Upload the data to server
   */
  upload = async () => {
    let url =
      this.state.id === undefined
        ? getURL("slide/")
        : getURL(`slide/${this.state.id}/`);
    if (this.state.data.length === 0) return;

    const { page } = this.state;
    console.log(this.state.page.toJSONObj());
    let data = {
      name: page.pages[0].text && page.pages[0].text.titleText,
      description:
        this.slides.pages[0].text && this.slides.pages[0].text.contentText,
      config_file: this.state.page.toJSON()
    };

    let pResponse =
      this.state.id === undefined
        ? axios.post(url, data)
        : axios.patch(url, data);
    let response = await pResponse;
    this.setState({ id: response.data.pk, message: "Saved" });
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
