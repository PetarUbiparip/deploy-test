import React from "react"
import { Link } from 'react-router-dom';
import "../style/our-organization.scss";

export class OurOrganization extends React.Component {

    render() {
        return (
            <div>
                <div class="logo">
                    <h1>
                        <Link to="/">LOGO</Link>
                    </h1>
                </div>

                <div class="container">

                    <h1 class="title">Our Organization</h1>

                    <div class="item-list">
                        <Link class="item" to="/pixels-2-pixels">
                            <div >Pixel2Pixel</div>
                        </Link>
                        <Link class="item" to="/business-consulting">
                            <div >Business consulting</div>
                        </Link>
                        <Link class="item" to="/solutions">
                            <div >Solutions</div>
                        </Link>
                        <Link class="item" to="/academy">
                            <div >Academy</div>
                        </Link>
                        <Link class="item" to="/research-and-development">
                            <div >R&amp;D</div>
                        </Link>

                    </div>
                </div>



            </div>


        );
    }
}