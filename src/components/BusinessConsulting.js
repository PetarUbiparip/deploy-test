import React from "react"
import { Link } from 'react-router-dom';
import "../style/business-consulting.scss";

export class BusinessConsulting extends React.Component {

    render() {
        return (
            <div>
                <h1 class="temp">BusinessConsulting <Link to="/our-organization">back</Link></h1>
            </div>


        );
    }
}