import About from './about';

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