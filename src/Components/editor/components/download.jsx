import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import { Menu, MenuItem } from "@material-ui/core";
import { Trans } from '@lingui/macro';

export default class Download extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null
    };
  }

  download() {
    let element = document.createElement("a");
    let file = new Blob(["\ufeff", JSON.stringify(this.props.text)], {
      type: "text/json;charset=utf-8"
    });
    element.href = URL.createObjectURL(file);
    element.download = `config.json`;
    element.click();
    this.setState({ anchorEl: null });
  }

  add(){
      this.props.add()
      this.setState({ anchorEl: null });
  }

  upload(){
    this.props.upload()
  this.setState({ anchorEl: null });
  }

  render() {
    return (
      <div className="row">
        <Fab 
          color="primary"
          style={{ position: "fixed", bottom: 40, right: 40, zIndex: 200 }}
          onClick={e => {
            this.setState({ anchorEl: e.target });
          }}
        >
          <EditIcon />
        </Fab>
        <Menu
          open={this.state.anchorEl !== null}
          anchorEl={this.state.anchorEl}
          style={{zIndex: 300}}
          onClose={() => {
            this.setState({ anchorEl: null });
          }}
        >
          <MenuItem onClick={this.download.bind(this)}><Trans>Download</Trans></MenuItem>
          <MenuItem onClick={this.add.bind(this)}><Trans>Add Page</Trans></MenuItem>
          <MenuItem onClick={this.upload.bind(this)}><Trans>Upload</Trans></MenuItem>
        </Menu>
      </div>
    );
  }
}
