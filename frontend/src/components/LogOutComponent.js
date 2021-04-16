import { FaCheck } from 'react-icons/fa';
export default function LogOutComponent() {

    let styles = {
        color: 'blanchedalmond',
    };

    return (
        <div>
            <div>
                <img src="wdtlogo.png" width="250" height="250" alt="logo" />
            </div>
            <div style={styles}>
                <h1>Logged out successfully!</h1>
                <FaCheck />
            </div>

        </div>

    )
}