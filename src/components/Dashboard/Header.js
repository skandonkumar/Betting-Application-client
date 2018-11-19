import React,{Component} from 'react';
import '../css/styles.css';
import {Link} from 'react-router-dom';


export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="jumbotron">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md">
                            <h5>Welcome to Betting Application</h5>
                        </div>
                        <div className="col-sm-1">
                            Admin
                        </div>
                        <div className="col-sm-2">
                            <Link to="/login"><button>Logout</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
