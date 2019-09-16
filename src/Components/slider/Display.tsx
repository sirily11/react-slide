import React, { Component } from "react";
import { Page, imagePosition, Text } from "../slides/SliderObj";
import "bootstrap/dist/css/bootstrap.css";
import { positionConfig } from "../editor/configuration";
import "animate.css/animate.css";
import "../../App.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Trans } from "@lingui/macro";
import { Fade, Collapse } from "@material-ui/core";

interface MyProps {
  data: Page;
  pageNum: number;
  showAnimation: boolean;
}

export default class Display extends Component<MyProps> {
  constructor(props: MyProps) {
    super(props);
    this.state = {};
  }

  text = (text: Text) => {
    let shadow = {
      textShadow: `${text.shadowX}px ${text.shadowY}px 4px ${text.shadowColor}`
    };
    if (text.contentText !== "" || text.titleText !== "" && this.props.showAnimation) {
      return (
        <div className="animated fadeInUp">
          <h3 style={text.shadow ? shadow : {}}>{text.titleText}</h3>
          <span style={text.shadow ? shadow : {}}>{text.contentText}</span>
        </div>
      );
    }
  };

  renderText(position: string, text: Text) {
    let style1 = {
      textAlign: text.textAlignment,
      backgroundColor: text.background,
      color: text.color
    };

    let style2 = {
      textAlign: text.textAlignment,
      color: text.color
    };
    if (position === imagePosition.left) {
      return (
        <div
          className="my-auto ml-0 mr-auto p-3"
          style={text.useBackground ? style1 : style2}
        >
          {this.text(text)}
        </div>
      );
    } else if (position === imagePosition.right) {
      return (
        <div
          className="my-auto ml-auto mr-0 p-3"
          style={text.useBackground ? style1 : style2}
        >
          {this.text(text)}
        </div>
      );
    } else if (position === imagePosition.center) {
      return (
        <div
          className="my-auto ml-auto mr-auto p-3"
          style={text.useBackground ? style1 : style2}
        >
          {this.text(text)}
        </div>
      );
    } else if (position === imagePosition.top) {
      return (
        <div
          className="ml-auto mr-auto p-3"
          style={{
            textAlign: text.textAlignment,
            backgroundColor: text.background,
            color: text.color
          }}
        >
          {this.text(text)}
        </div>
      );
    }
  }

  render() {
    let background =
      this.props.data === null ? "" : this.props.data.backgroundColor;

    let style1 = {
      backgroundColor: background,
      backgroundImage: `url(${
        this.props.data.image ? this.props.data.image.src : ""
      })`,
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100%",
      minHeight: "400px",
      width: "100%"
    };

    let style2 = {
      backgroundColor: background,
      height: "100%",
      minHeight: "400px",
      width: "100%"
    };

    return (
      <div
        className="row m-0"
        style={
          this.props.data.image && this.props.data.image.fullscreen
            ? style1
            : style2
        }
      >
        {this.props.data.text &&
          this.renderText(this.props.data.text.position, this.props.data.text)}

        {this.props.pageNum === 0 && (
          <div className="row w-100 first-page-text">
            <div
              className="animated fadeInUp slow ml-auto mr-auto"
              style={{ textShadow: " 2px 2px 4px #fffff" }}
            >
              <Trans>Find more</Trans>
              <ExpandMoreIcon />
            </div>
          </div>
        )}
      </div>
    );
  }
}
