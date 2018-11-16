import React,{Component} from 'react';
import './css/Bet.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class Bet extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <nav className="container">
                <div className="btn-pad">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Bet Number</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1"/>
                        </div>
                        <div>
                            <label htmlFor="exampleFormControlInput2">Amount</label>
                            <input type="text" className="form-control" id="exampleFormControlInput2"/>
                        </div>
                    </form>
                </div>
                <div className="btn-pad">
                    <button  className="btn btn-primary btn-lg">Start</button>
                </div>
            </nav>
        );
    }

}

