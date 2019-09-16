import React, { Component } from "react";
import { imagePosition, textAlignment } from "../../slides/SliderObj";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slide,
  Collapse
} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.css";
import { positionConfig, alignConfig } from "../configuration";
import ColorPicker from "./ColorPicker";
import { Trans } from "@lingui/macro";

const initState = {
  jsonConfig: "",
  imageSrc: "",
  imageFullscreen: false,
  imagePosition: imagePosition.center,
  useTextBackground: false,
  textPosition: imagePosition.center,
  contentText: "",
  titleText: "",
  textColor: "",
  textAlignment: textAlignment.left,
  selectColor: "",
  shadow: false,
  shadowX: 0,
  shadowY: 0,
  shadowColor: "#00000",
  backgroundColor: ""
};

export default class PagePanel extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  componentDidUpdate(prev) {
    // switch page
    if (this.props.index !== prev.index) {
      if (
        this.props.pageContent.image === undefined &&
        this.props.pageContent.text === undefined
      ) {
        // When adding new page, clear all the old content
        this.setState(initState);
      } else {
        this.loadPageContent();
      }
    } else if (this.props.isDownloaded) {
      // Download new content from internent
      if(this.props.pageContent){
        console.log("Downloading new stuff");
        this.loadPageContent();
        this.props.onLoadEnd()
      }
    }
  }

  loadPageContent() {
    let content = JSON.parse(JSON.stringify(initState));
    let propsContent = this.props.pageContent;

    content.imageSrc = propsContent.image.src;
    content.imageFullscreen = propsContent.image.fullscreen;
    content.imagePosition = propsContent.image.position;

    content.selectColor = propsContent.text.background;
    content.titleText = propsContent.text.titleText;
    content.contentText = propsContent.text.contentText;
    content.textAlignment = propsContent.text.textAlignment;
    content.textPosition = propsContent.text.position;
    content.useTextBackground = propsContent.text.useBackground;
    content.shadow = propsContent.text.shadow;
    content.shadowX = propsContent.text.shadowX;
    content.shadowY = propsContent.text.shadowY;
    content.shadowColor = propsContent.text.shadowColor;
    content.textAlignment = propsContent.text.textAlignment;
    this.setState(content);
  }

  /**
   * Return the json file for the current configuration
   */
  getJSONFile() {
    // Important, because setstate would take some time.
    setTimeout(() => {
      let jsonObj = {
        image: {
          src: this.state.imageSrc,
          fullscreen: this.state.imageFullscreen,
          position: this.state.imagePosition
        },
        text: {
          textAlignment: this.state.textAlignment,
          titleText: this.state.titleText,
          contentText: this.state.contentText,
          useBackground: this.state.useTextBackground,
          background: this.state.selectColor,
          position: this.state.textPosition,
          color: this.state.textColor,
          shadow: this.state.shadow,
          shadowColor: this.state.shadowColor,
          shadowX: this.state.shadowX,
          shadowY: this.state.shadowY
        },
        backgroundColor: this.state.backgroundColor
      };
      this.props.update(this.props.index, jsonObj);
      this.setState({ jsonConfig: jsonObj });
    }, 10);
  }

  handleTextChange = e => {
    let id = e.target.id;
    switch (id) {
      case "image-src":
        this.setState({ imageSrc: e.target.value });
        break;
      case "title-text":
        this.setState({ titleText: e.target.value });
        break;
      case "content-text":
        this.setState({ contentText: e.target.value });
        break;
      case "shadow-x":
        this.setState({ shadowX: e.target.value });
        break;
      case "shadow-y":
        this.setState({ shadowY: e.target.value });
        break;
      default:
        break;
    }
    this.getJSONFile();
  };

  renderSelection(title, selectionList, onSelect, selected) {
    return (
      <FormControl className="col-5 mr-1" fullWidth>
        <InputLabel>{title}</InputLabel>
        <Select value={selected} onChange={onSelect}>
          {selectionList.map((s, i) => {
            return (
              <MenuItem key={i} value={s}>
                {s}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }

  render() {
    return (
      <div>
        <div className="container-fluid mb-1">
          {/* Image */}
          <div className="row">
            <Trans>Image</Trans>
          </div>
          <div className="row">
            <TextField
              fullWidth
              id="image-src"
              value={this.state.imageSrc}
              label={<Trans>Image src</Trans>}
              onChange={this.handleTextChange}
            />
          </div>
          <div className="row">
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.imageFullscreen}
                  onChange={e => {
                    this.setState({ imageFullscreen: e.target.checked });
                    this.getJSONFile();
                  }}
                />
              }
              label="fullscreen"
            />
            {!this.state.imageFullscreen &&
              this.renderSelection(
                "Image Position",
                positionConfig,
                e => {
                  this.setState({ imagePosition: e.target.value });
                },
                this.state.imagePosition
              )}
          </div>

          {/* Text */}
          <div className="row">
            <Trans>Text</Trans>
          </div>
          <div className="row">
            <TextField
              fullWidth
              value={this.state.titleText}
              label={<Trans>Title text</Trans>}
              id="title-text"
              onChange={this.handleTextChange}
            />
            <TextField
              className="mt-3"
              variant="outlined"
              id="content-text"
              value={this.state.contentText}
              onChange={this.handleTextChange}
              fullWidth
              label={<Trans>Content</Trans>}
              multiline
              rows={6}
              rowsMax={6}
            />
          </div>
          <div className="row">
            <div className="">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.useTextBackground}
                    onChange={e => {
                      this.setState({ useTextBackground: e.target.checked });
                      this.getJSONFile();
                    }}
                  />
                }
                label={<Trans>Background</Trans>}
              />
            </div>
            <div>
              {this.state.useTextBackground && (
                <ColorPicker
                  title={<Trans>Text Background Color</Trans>}
                  updateColor={color => {
                    this.setState({ selectColor: color });
                    this.getJSONFile();
                  }}
                />
              )}
            </div>
          </div>
          <div className="mt-1 mb-3 row">
            <ColorPicker
              title={<Trans>Text Color:</Trans>}
              updateColor={color => {
                this.setState({ textColor: color });
                this.getJSONFile();
              }}
            />
          </div>
          <div className="row">
            {this.renderSelection(
              <Trans>Text Position</Trans>,
              positionConfig,
              e => {
                this.setState({ textPosition: e.target.value });
                this.getJSONFile();
              },
              this.state.textPosition
            )}

            {this.renderSelection(
              <Trans>Text Alignment</Trans>,
              alignConfig,
              e => {
                this.setState({ textAlignment: e.target.value });
                this.getJSONFile();
              },
              this.state.textAlignment
            )}
          </div>
          <div className="row">
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.shadow}
                  onChange={e => {
                    this.setState({ shadow: e.target.checked });
                    this.getJSONFile();
                  }}
                />
              }
              label={<Trans>Shadow</Trans>}
            />
          </div>
          <Collapse in={this.state.shadow}>
            <div className="row">
              <div className="col-4 pl-0">
                <TextField
                  id="shadow-x"
                  type="number"
                  onChange={this.handleTextChange}
                  label={<Trans>Shadow X</Trans>}
                  value={this.state.shadowX}
                />
              </div>
              <div className="col-4 pl-1">
                <TextField
                  id="shadow-y"
                  type="number"
                  onChange={this.handleTextChange}
                  label={<Trans>Shadow Y</Trans>}
                  value={this.state.shadowY}
                />
              </div>
              <div className="col-4">
                <ColorPicker
                  title={<Trans>Shadow Color:</Trans>}
                  updateColor={color => {
                    this.setState({ shadowColor: color });
                    this.getJSONFile();
                  }}
                />
              </div>
            </div>
          </Collapse>
          <div className="row mt-3">
            <Trans>Background</Trans>
          </div>
          <div className="row">
            <ColorPicker
              title={<Trans>Background Color</Trans>}
              updateColor={color => {
                this.setState({ backgroundColor: color });
                this.getJSONFile();
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
