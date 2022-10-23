import React from "react"
import { Link } from 'react-router-dom';
import "../style/contact.scss";

export class Contact extends React.Component {

    render() {
        return (
            <div className='contact' id='contact'>
                <h1>Contact</h1>
                <Link to="/">Back</Link>

                <div >
                    <Link to="/" className="logo"></Link>
                </div>
            </div>
        );
    }
}