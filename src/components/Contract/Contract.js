import React,{Component} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import * as Web3 from "web3";
import Login from './Login/Login'
import BetNumber from "./BetNumber";
import GiveRights from "./GiveRights";

export default class Contract extends Component{
    constructor(props){
        super(props);
        const account = require('../config/account');
        const pk = require('../config/keys');
        const ABI = require('../config/abi');
        const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        const MyContract = web3.eth.contract(ABI.ABI);
        const ContractInstance = MyContract.at('0x85e0194c842719b8ac9bc62a5727587fe32b7be7');

        this.state = {
            ContractInstance : ContractInstance

        }
        this.getChairPerson = this.getChairPerson.bind(this);
    }

    //Function to get the address of the chairperson.
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

    render(){
        let ch = this.state.Chairperson;
        return(
            <div style={{height: '100vh'}}>
               {/*<Login chairperson = {ch}/>*/}
               <GiveRights value = {ch}/>
            </div>
        );
    }
}