import React from "react"
import { onMouseEnterButton } from "../scenes/HomeScene"
import { homePage } from "../hooks/SceneHook/SceneHook"
import history from '../routes/history';
import "../style/home.scss";



class HomeButton extends React.Component {
    onHover = () => this.props.onHover(this.props.buttonId);
    onClick = () => this.props.onClick(this.props.buttonId);

    render() {
        const { title, activeId, buttonId } = this.props;

        let className = 'home-btn';
        if (this.props.activeId === this.props.buttonId) {
            className += ' home-btn-active';
        }

        return (
            <button onMouseOver={this.onHover}
                onClick={this.onClick}
                className={className}>
                {title}
            </button>
        );
    }
}

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeId: 0
        }
    }

    onButtonHover = (activeId) => {
        console.log(" +++++ HOVER !!!!!!", activeId)
        if(activeId === this.state.activeId) 
            return;
        
        onMouseEnterButton(activeId, this.state.activeId);
        this.setState({ activeId });
    }

    onClick = (buttonId) => {
        console.log(" +++++ CLICK !!!!!!", buttonId)
        // const navigate  = useNavigate();
        // navigate('/our-organization')


        switch (buttonId) {
            case 0:
                history.push("/who-we-are");
                break;
            case 1:
                history.push("/our-organization");
                break;
            case 2:
                history.push("/contact");
                break;
        }

    }


    render() {
        const { activeId } = this.state;

        return (
            <div>
                <div class='header'>
                    <h1>Harmonity-group</h1>

                </div>
                <div class='home-btns'>
                    <HomeButton
                        title={"Who we are"}
                        onHover={this.onButtonHover}
                        onClick={this.onClick}
                        buttonId={0}
                        activeId={activeId}>
                    </HomeButton>

                    <HomeButton
                        title={"Our Organization"}
                        onHover={this.onButtonHover}
                        onClick={this.onClick}
                        buttonId={1}
                        activeId={activeId}>
                    </HomeButton>

                    <HomeButton
                        title={"Contact"}
                        onHover={this.onButtonHover}
                        onClick={this.onClick}
                        buttonId={2}
                        activeId={activeId}>
                    </HomeButton>
                </div>
            </div>
        );
    }
}