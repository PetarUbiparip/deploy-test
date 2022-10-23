import React from "react"
import { Link } from 'react-router-dom';
import "../style/academy.scss";

export class Academy extends React.Component {

    render() {
        return (
            <div>
                {/* <h1 className="temp">Academy <Link to="/our-organization">back</Link></h1> */}


                <div className="academy-desc">
                    <h1>Academy</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>


                <div>
                    <Link to="/" className="academy-back-to-main-button"></Link>
                </div>
                <div className="our-organization-back-button">
                    <h1>
                        <Link to="/our-organization">Our Organization</Link>
                    </h1>
                </div>
            </div>


        );
    }
}