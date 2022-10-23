import React from "react"
import { Link } from 'react-router-dom';
import "../style/our-organization.scss";

export class OurOrganization extends React.Component {

    render() {
        return (
            <div className="our-organization" id="our-organization">
                <div >
                    <Link to="/" className="logo"></Link>
                </div>

                <div className="container">

                    <h1 className="title">Our Organization</h1>

                    <div className="item-list">
                        <Link className="item" to="/pixels-2-pixels">
                            <div >Pixel2Pixel</div>
                        </Link>
                        <Link className="item" to="/business-consulting">
                            <div >Business consulting</div>
                        </Link>
                        <Link className="item" to="/solutions">
                            <div >Solutions</div>
                        </Link>
                        <Link className="item" to="/academy">
                            <div >Academy</div>
                        </Link>
                        <Link className="item" to="/research-and-development">
                            <div >R&amp;D</div>
                        </Link>

                    </div>
                </div>



            </div>


        );
    }
}