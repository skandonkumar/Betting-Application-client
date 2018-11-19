import React,{Component} from 'react';
import '../css/RightSidebar.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class RightSidebar extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <nav>
                <ul>
                    <div className="wrapper">
                        <div className="button-div">
                            <button className="btn btn-primary btn-lg">End Bet</button>
                        </div>
                        <div className="button-div">
                            <button className="btn btn-primary btn-lg">Reset Bet</button>
                        </div>
                    </div>
                </ul>
            </nav>
        )
    }
}