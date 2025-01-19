import About from './About.jsx';
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
            </div>
        </div>
    );
}