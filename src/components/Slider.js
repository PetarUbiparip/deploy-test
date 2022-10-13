import React from "react"
import "../style/slider.scss";

export class Slider extends React.Component {
    render() {
        const { scene } = this.props;
        return (
            <div class="scrollbar-wrapper">
                <div class="scrollbar" id="scroll">
                    <div class={`${scene}-force-overflow`}></div>
                </div>
            </div>
        );
    }
}