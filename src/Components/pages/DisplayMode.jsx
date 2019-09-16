import React, { Component } from "react";
import { SliderObj } from "../slides/SliderObj";
import jsonOBJ from "../tests/test";
import Display from "../slider/Display";
import ReactFullpage from "@fullpage/react-fullpage";
import { getURL } from "../settings";
import axios from "axios";

export default class DisplayMode extends Component {
  constructor() {
    super();
    this.slides = new SliderObj();
    this.state = {
      configID: null,
      debug: false,
      slides: this.slides,
      currentPage: 0
    };
  }

  async componentDidMount() {
    if (this.props.match.params.debug === "true") {
      this.slides.fromJSON(jsonOBJ);
      this.setState({
        configID: this.props.match.params.id,
        debug: true,
        slides: this.slides
      });
    } else {
      let id = this.props.match.params.id;
      let url = getURL(`slide/${id}/`);
      let response = await axios.get(url);
      let data = response.data;
      data = JSON.parse(data.config_file);
      this.slides.pages = data;
      this.setState({ configID: id, slides: this.slides });
    }
  }

  anchors = () => {
    return this.slides.toJSONObj().map(page => page.text.titleText);
  };

  afterLoad = (origin, destination, direction) => {
    this.setState({ currentPage: destination.index });
  };

  render() {
    return (
      <div id="fullpage">
        {this.state.slides.toJSONObj().length > 0 && (
          <ReactFullpage
            navigation
            navigationTooltips={this.anchors()}
            autoScrolling={true}
            afterLoad={this.afterLoad}
            licenseKey={"84EEBD7A-BF7C47AE-9B82F7FB-2A272C8C"}
            render={comp => (
              <ReactFullpage.Wrapper>
                {this.state.slides.toJSONObj().map((page, i) => {
                  return (
                    <div key={i} className="section">
                      <Display
                        data={page}
                        pageNum={i}
                        showAnimation={this.state.currentPage === i}
                      />
                    </div>
                  );
                })}
              </ReactFullpage.Wrapper>
            )}
          />
        )}
      </div>
    );
  }
}
