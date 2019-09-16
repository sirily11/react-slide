import React, { Component } from "react";
import { TextField, Popper } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.css";
import { ChromePicker } from "react-color";

export default class ColorPicker extends Component {
  constructor() {
    super();
    this.state = {
      showColorpicker: false,
      anchorEl: null,
      selectedColor: ""
    };
  }

  handleColorChange = (color, event) => {
    this.setState({ selectColor: color.hex });
    this.props.updateColor(color.hex);
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          label={this.props.title}
          value={this.state.selectColor}
          onFocus={e => {
            this.setState({
              anchorEl: e.currentTarget,
              showColorpicker: true
            });
          }}
          onBlur={() => {
            this.setState({
              anchorEl: null,
              showColorpicker: false
            });
          }}
        />
        <Popper
          open={this.state.showColorpicker}
          anchorEl={this.state.anchorEl}
        >
          <ChromePicker
            color={this.state.selectColor}
            onChange={this.handleColorChange}
          />
        </Popper>
      </div>
    );
  }
}
