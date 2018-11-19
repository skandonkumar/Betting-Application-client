import React,{Component} from 'react';
import './css/styles.css'
import {Link} from 'react-router-dom';

import Header from './Dashboard/Header';
import LeftSidebar from "./Dashboard/LeftSidebar";
import axios from "axios";

export default class BetNumber extends Component {
    constructor(props){
        super(props);
        this.state = {
            users : []
        }
    }

    getAllUsers(){
        axios
            .get("http://localhost:5000/api/allUsers")
            .then(result => {this.getUserAddresses(result)})
    }

    getUserAddresses(users){
        var add = [];
        users.data.map((address)=>{
            add.push(address.address)
        })
        this.setState({
            users : add,
            address:""
        })
    }

    componentDidMount(){
        this.getAllUsers();
        // this.giveRights();
    }

    render() {

        let ch;
        if (this.props.location.state && this.props.location.state.ch){
            ch = this.props.location.state.ch;
        }

        return (
            <div>
                <div>
                    <Header address={ch}/>
                </div>
                <div className="row justify-content-md-start">
                    <div className="sidebar">
                        <LeftSidebar ch={ch} users = {this.state.users}/>
                    </div>

                    <div className="col-4">
                        <form className="form-group">
                            <div className="form-group">
                                <label htmlFor="betnumber">Give Rights to Bet</label>
                                <input type="text" className="form-control" id="betnumber" aria-describedby="emailHelp"/>
                            </div>
                            <div>
                                <Link to="/giveright"><button>Next</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}