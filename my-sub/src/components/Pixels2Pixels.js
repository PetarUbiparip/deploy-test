import React from "react"
import { Link } from 'react-router-dom';
import "../style/pixels-2-pixels.scss";

export class Pixels2Pixels extends React.Component {

    render() {
        return (
            <div>
                <h1 className="temp">Pixels2Pixels <Link to="/our-organization">back</Link></h1>
            </div>


        );
    }
}