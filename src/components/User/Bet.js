import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import '../css/styles.css';
import Header from "./../Dashboard/Header";
import LeftSidebar from "./../Dashboard/LeftSidebar";
import axios from "axios";

export default class Bet extends Component {

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

    setAddress(e){
        this.setState({
            address : e.target.value
        })
        this.giveRights().bind(this)
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
                                <label htmlFor="bet">Give Rights to Bet</label>
                                <input type="text" className="form-control" id="bet" aria-describedby="emailHelp"
                                       onChange={this.setAddress.bind(this)}/>
                            </div>
                            <div>
                                <Link to="/balance"><button>Start</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}