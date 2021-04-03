import {Component} from 'react';
import * as sampleService from '../../service/sampleService';

export default class SampleComponent extends Component { 
    constructor(props){
        super(props);

        this.state = {
            message: 'Sample message',
        }
    }

    componentDidMount(){
        sampleService.getMessage()
        .then(res => this.setState(res))
    }


    render(){
        return (
            <div>
                <h1>{this.state.message}</h1>
                <h2>{this.state.body}</h2>
                <h3>{this.state.message}</h3>
            </div>
        )
    }

}