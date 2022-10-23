import React from "react"
import "../style/slider.scss";

export class Slider extends React.Component {
    render() {
        const { scene } = this.props;
        return (
            <div className="scrollbar-wrapper" id="scrollbar-wrapper">
                <div className="scrollbar" id="scrollbar">
                    <div className={`${scene}-force-overflow`}></div>
                </div>
            </div>
        );
    }
}