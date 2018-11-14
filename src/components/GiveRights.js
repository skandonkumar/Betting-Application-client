import React,{Component} from 'react';
import './css/GiveRights.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Header from "./Sidebars/Header";
import LeftSidebar from "./Sidebars/LeftSidebar";
import RightSidebar from "./Sidebars/RightSidebar";
import axios from 'axios';
import * as Web3 from "web3";

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

    // giveRights(){
    //     const account = require('../config/account');
    //     const pk = require('../config/keys');
    //     const ABI = require('../config/abi');
    //     const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    //     const ContractAddress = '0xaba1f61817b201d9559b0deed55c0a1c3aff2b65';
    //     const MyContract = web3.eth.contract(ABI.ABI);
    //     const ContractInstance = MyContract.at('0xaba1f61817b201d9559b0deed55c0a1c3aff2b65');
    //     ContractInstance.getBiggestLoser.call((err, res)=>{
    //         if(!err)
    //             console.log(res);
    //         else
    //             console.log(err);
    //     })
    // }

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
        let ch
        if (this.props.location.state && this.props.location.state.ch){
            ch = this.props.location.state.ch;
        }
        return (
            <div>
                <Header address={ch}/>
                <LeftSidebar ch={ch} users = {this.state.users}/>
            <nav className="container">
                <div className="btn-pad">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Give Right to Bet</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1"
                                   placeholder="0x..." onChange={this.setAddress.bind(this)}/>
                        </div>
                    </form>
                </div>
                <div className="btn-pad">
                    <button  className="btn btn-primary btn-lg">Add</button>
                </div>
                <div className="btn-pad">
                    <button  className="btn btn-primary btn-lg">Next</button>
                </div>
                <div className="btn-pad">
                    <button  className="btn btn-primary btn-lg">Reset Bet</button>
                </div>
            </nav>
            </div>
        )
    }
}