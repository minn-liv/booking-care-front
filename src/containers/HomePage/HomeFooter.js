import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <p>
                    &copy; 2023{" "}
                    <a target="_blank" href="/#">
                        More information, please visit my Facebook. Click here
                    </a>
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
