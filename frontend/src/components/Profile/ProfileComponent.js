import { Component } from 'react';

export default class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <p>Username</p>
                <p>Email</p>
                <p>Allowed vacation days left</p>
                <p>Allowed sick days left</p>
                <p>Additiopnal Infodrmation</p>
                <ul>
                    <li>$ per hour</li>
                    <li>Workday duration</li>
                </ul>

                <button>Edit</button>
                <em>All of this information must first be approved by an administrator in order to be approved.</em>
            </div>
        )
    }

}