import React from "react"
import { Link } from 'react-router-dom';
import "../style/research-and-development.scss";

export class ResearchAndDevelopment extends React.Component {

    render() {
        return (
            <div className="research-and-development">
                <h1 className="temp">R&amp;D <Link to="/our-organization">back</Link></h1>
            </div>


        );
    }
}