import React,{Component} from 'react';
import '../css/Header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(

            <header>

                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Welcome to Betting Application</h1>
                    </div>
                    <h1 className="lead">{this.props.address}</h1>
                </div>
                {/*<nav className="navbar navbar-default navbar-fixed-top">*/}
                {/*<div className="container">*/}
                {/*<div className="navbar-header">*/}
                {/*<div className="container">*/}
                {/*Welcome to Betting Application*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</nav>*/}
            </header>
        )
    }
}