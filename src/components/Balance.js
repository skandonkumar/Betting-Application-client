import React,{Component} from 'react';
import './css/Balance.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class BetNumber extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <nav className="container">
                <div className="btn-pad">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Balance</label>
                            <input type="email" className="form-input" id="exampleFormControlInput1"
                                   placeholder="balance"/>
                        </div>
                    </form>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Bet Number</label>
                            <input type="email" className="form-input" id="exampleFormControlInput1"
                                   placeholder="number bet"/>
                        </div>
                    </form>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1 label-al">Amount Bet</label>
                            <input type="email" className="form-input" id="exampleFormControlInput1"
                                   placeholder="amount bet"/>
                        </div>
                    </form>
                </div>
                <div className="btn-pad">
                    <button  className="btn btn-primary btn-lg">Bet Again</button>
                </div>
            </nav>
        )
    }
}