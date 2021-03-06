import React,{Component} from 'react';
import '../css/LeftSidebar.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class LeftSidebar extends Component {
    constructor(props){
        super(props);
    }

    // getUserAddress(){
    //     this.props.users.map((address)=>{
    //         return <li>address</li>
    //     })
    // }

    render() {
        return (
            <div className="accordion" id="accordionExample">
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                            <button className="btn btn-link" type="button" data-toggle="collapse"
                                    data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Admin
                            </button>
                        </h5>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                         data-parent="#accordionExample">
                        <div className="card-body">
                            <ul>
                                {(this.props.ch)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                                    data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                User
                            </button>
                        </h5>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                         data-parent="#accordionExample">
                        <div className="card-body">
                            <ul>
                                {this.props.users.map((item) =>{
                                    return <li>{item}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingThree">
                        <h5 className="mb-0">
                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                                    data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Bettors
                            </button>
                        </h5>
                    </div>
                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                         data-parent="#accordionExample">
                        <div className="card-body">
                            <ul>
                                <li>Apple</li>
                                <li>Mango</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}