import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói về Booking Care
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div className="content-right">
                        <p>
                            We’re no strangers to love You know the rules and so
                            do I A full commitment’s what I’m thinking of You
                            wouldn’t get this from any other guy I just wanna
                            tell you how I’m feeling Gotta make you understand
                            Never gonna give you up Never gonna let you down
                            Never gonna run around and desert you Never gonna
                            make you cry Never gonna say goodbye Never gonna
                            tell a lie and hurt you We’ve known each other for
                            so long Your heart’s been aching but you’re too shy
                            to say it Inside we both know what’s been going on
                            We know the game and we’re gonna play it And if you
                            ask me how I’m feeling Don’t tell me you’re too
                            blind to see Never gonna give you up Never gonna let
                            you down Never gonna run around and desert you Never
                            gonna make you cry Never gonna say goodbye Never
                            gonna tell a lie and hurt you
                        </p>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
