import React,{Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

import '../css/styles.css';
import Header from "./../Dashboard/Header";
import LeftSidebar from "./../Dashboard/LeftSidebar";


export default class Statistic extends Component {

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

        return(

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
                                <label htmlFor="winningBetNumber">Winning Bet NUmber</label>
                                <input type="text" className="form-control" id="winningBetNumber" aria-describedby="emailHelp"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="winners">Winners</label>
                                <input type="text" className="form-control" id="winners" aria-describedby="emailHelp"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="biggestWinner">Biggest Winner</label>
                                <input type="text" className="form-control" id="biggestWinner" aria-describedby="emailHelp"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="biggestLoser">Biggest Loser</label>
                                <input type="text" className="form-control" id="biggestLoser" aria-describedby="emailHelp"/>
                            </div>
                            <div>
                                <Link to="/bet"><button>Back</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}