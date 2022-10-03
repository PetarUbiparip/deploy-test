import React from "react"
import { Link } from 'react-router-dom';
import { startArrowAnimation , startCompassAnimation } from "../../scenes/WhoWeAreScene"

export class WhoWeAre extends React.Component {

    render() {

        return (
            <div class='header'>
                <h1>Who We Are</h1>
                <Link to="/">Back</Link>


                    <button onClick={() => {
                            startArrowAnimation()
                        }}>
                        StartArrow
                    </button>
                    <button onClick={() => {
                            startCompassAnimation()
                        }}>
                        StartCompass
                    </button>
            </div>
        );
    }
}