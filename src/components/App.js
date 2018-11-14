import React,{Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import * as Web3 from "web3";
import MainLoginPage from "./Login/Login";
import {Switch , Route, BrowserRouter, Redirect} from 'react-router-dom';
import GiveRights from "./GiveRights";
import BetNumber from "./BetNumber";
import Public from "./test";

export default class App extends Component{
    constructor(props){
        super(props);
        const account = require('../config/account');
        const pk = require('../config/keys');
        const ABI = require('../config/abi');
        const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        const MyContract = web3.eth.contract(ABI.ABI);
        const ContractInstance = MyContract.at('0x38b1c88864b59842be733a9f73cf43b9f14a7bf5');

        this.state = {
            ContractInstance : ContractInstance,
            AdminLoggedIn : false
        }
        this.getChairPerson = this.getChairPerson.bind(this);
        this.AdminLogin = this.AdminLogin.bind(this);
    }

    getChairPerson()
    {
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
        let ch= this.state.Chairperson
        return(
            <BrowserRouter>
                <div style={{height: '100vh'}}>
                        <Route path="/" exact render={()=>(<Redirect to="/login"/>)}/>
                        <Route path="/login" exact render={()=>(<MainLoginPage ch={ch} contract={this.state.ContractInstance} setAdminLogin={this.AdminLogin}/>)}/>
                        {/*<Route path="/test" exact component={Public}/>*/}
                        <Route path="/giveRight" exact component={GiveRights}/>
                </div>
            </BrowserRouter>
        );
    }
}

