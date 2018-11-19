import React,{Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

import './css/styles.css';
import Header from "./Dashboard/Header";
import LeftSidebar from "./Dashboard/LeftSidebar";


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
    }

    render() {


        let ch;
        if (this.props.location.state && this.props.location.state.ch){
            ch = this.props.location.state.ch;
        }

        return (

            <div>
                <div>
                    <Header/>
                </div>
                <div className="row justify-content-md-start">
                    <div className="sidebar">
                        <LeftSidebar ch={ch} users = {this.state.users}/>
                    </div>

                    <div className="col-4">
                        <form className="form-group">
                            <div className="form-group">
                                <label htmlFor="balance">Balance</label>
                                <input type="text" className="form-control" id="balance" aria-describedby="emailHelp"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="betNumber">Bet Number</label>
                                <input type="text" className="form-control" id="betNumber" aria-describedby="emailHelp"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="amountBet">Amount Bet</label>
                                <input type="text" className="form-control" id="amountBet" aria-describedby="emailHelp"/>
                            </div>
                            <div>
                                <Link to="/bet"><button>Bet Again</button></Link>
                            </div>
                            <div>
                                <Link to="/statistics"><button>View Result</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}