import React,{Component} from 'react';
import '../css/styles.css';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

import Header from "./../Dashboard/Header";
import LeftSidebar from "./../Dashboard/LeftSidebar";



export default class GiveRights extends Component {
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

    setAddress(e){
        this.setState({
            address : e.target.value
        })
        this.giveRights().bind(this)
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
                                <label htmlFor="giveRights">Give Rights to Bet</label>
                                <input type="text" className="form-control" id="giveRights" aria-describedby="emailHelp"
                                       placeholder="0x..." onChange={this.setAddress.bind(this)}/>
                            </div>
                            <div>
                                <Redirect to="/giveright"/><button>Add</button>
                            </div>
                            <div>
                                <Link to="/betnumber"><button>Next</button></Link>
                            </div>
                            <div>
                                <button>Reset Bet</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}