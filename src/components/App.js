import React,{Component} from 'react';
import {Switch , Route, BrowserRouter, Redirect} from 'react-router-dom';
import * as Web3 from "web3";

import GiveRights from "./Admin/GiveRights";
import Bet from "./User/Bet";
import Statistic from "./User/Statistic";
import Balance from "./User/Balance";
import BetNumber from "./Admin/BetNumber";
import MainLoginPage from "./Login/Login";

export default class App extends Component{
    constructor(props){
        super(props);
        const account = require('../config/account');
        const pk = require('../config/keys');
        const ABI = require('../config/abi');
        const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        const MyContract = web3.eth.contract(ABI.ABI);
        const ContractInstance = MyContract.at('0xe38d92282dc9edcdb47c2b1f68386e355e769f9d');

        this.state = {
            ContractInstance : ContractInstance,
            AdminLoggedIn : false
        }
        this.getChairPerson = this.getChairPerson.bind(this);
        this.AdminLogin = this.AdminLogin.bind(this);
    }

    getChairPerson()
    {
        console.log(this.state.ContractInstance);
        let Ch;
        this.state.ContractInstance.chairperson.call((error, response) => {
            if (!error) {
                Ch = response.toString();
                this.setState({
                    Chairperson : Ch
                })
            }
            else {
                console.log(error)
            }
        })
    }

    componentDidMount(){
        this.getChairPerson();
    }

    AdminLogin(){
        //console.log("Admin logged in");
        this.setState({
            AdminLoggedIn : true
        })
    }



    render(){
        let ch = this.state.Chairperson;
        return(
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" exact render={()=>(<Redirect to="/login"/>)}/>
                        <Route path="/login" exact render={()=>(<MainLoginPage ch={ch} contract={this.state.ContractInstance} setAdminLogin={this.AdminLogin}/>)}/>
                        <Route path="/giveRight" exact component={GiveRights}/>
                        <Route path="/bet" exact component={Bet}/>
                        <Route path="/betnumber" exact component={BetNumber}/>
                        <Route path="/balance" exact component={Balance}/>
                        <Route path="/statistics" exact component={Statistic}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}