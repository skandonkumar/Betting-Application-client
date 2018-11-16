import React,{Component} from 'react';
import './css/Bet.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class Statistic extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return(

            <nav className="container">
                <div className="btn-pad">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Winning Bet NUmber</label>
                            <input type="textarea" className="form-control" id="exampleFormControlInput1"/>
                        </div>
                        <div>
                            <label htmlFor="exampleFormControlInput2">Winners</label>
                            <input type="textarea" className="form-control" id="exampleFormControlInput2"/>
                        </div>
                        <div>
                            <label htmlFor="exampleFormControlInput2">Biggest Winner</label>
                            <input type="textarea" className="form-control" id="exampleFormControlInput2"/>
                        </div>
                        <div>
                            <label htmlFor="exampleFormControlInput2">Biggest Loser</label>
                            <input type="textarea" className="form-control" id="exampleFormControlInput2"/>
                        </div>
                    </form>
                </div>
            </nav>
        );
    }

}