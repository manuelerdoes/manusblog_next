import About from './About.jsx';
import { appVersion } from '../version.js';
export default function page() {

    return (
        <div className="containero">
            <div className="about">
                <div className="title">
                    <h2>About</h2>
                </div>
                <div className="content">
                    <About />
                </div>
                <div className="version">
                    <p>App Version: {appVersion}</p>
                </div>  
            </div>
        </div>
    );
}