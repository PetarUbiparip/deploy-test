import React from "react"
import { Link } from 'react-router-dom';

export class Contact extends React.Component {

    render() {
        return (
            <div class='header'>
                <h1>Contact</h1>
                <Link to="/">Back</Link>
            </div>
        );
    }
}