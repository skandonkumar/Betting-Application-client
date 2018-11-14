import React,{Component} from 'react';
import './css/BetNumber.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Header from './Sidebars/Header';
import LeftSidebar from "./Sidebars/LeftSidebar";
import RightSidebar from "./Sidebars/RightSidebar";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import GiveRights from "./GiveRights";

export default class BetNumber extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Router>
            <div>
                <Header/>
                <LeftSidebar ch={this.props.value}/>
            <nav className="container">
                <div className="btn-pad">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Set Bet Number</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1"
                                   placeholder="name@example.com"/>
                        </div>
                    </form>
                </div>
                <div className="btn-pad">
                    <Link to="/api/GiveRights"><button  className="btn btn-primary btn-lg">Next</button></Link>
                </div>
            </nav>
                <RightSidebar/>
                <Route exact path="/api/GiveRights" render={()=><GiveRights/>}/>
            </div>

        </Router>
        )
    }
}