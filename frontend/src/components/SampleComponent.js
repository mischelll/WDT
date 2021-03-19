import {Component} from 'react';
import * as sampleService from '../service/sampleService';

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
                <p>{this.state.message}</p>
            </div>
        )
    }

}