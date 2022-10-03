import React from "react"
import { Link } from 'react-router-dom';

export class OurOrganization extends React.Component {

    render() {
        return (
            <div class='header'>
                <h1>Our Organization</h1>
                <Link to="/">Back</Link>
            </div>
        );
    }
}