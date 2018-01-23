import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <div className="container-fluid footer">
                <div className="row">
                    <div className="col-md-5 line">
                        <span className="author">&copy; 2018 Ualikhan Sarsenbayev</span>
                        <a href="#" target="_blank" className="textLink">Portfolio</a>
                    </div>
                    <div className="col-md-5 icons">
                        <a href="https://github.com/ualikhansars" target="_blank" className="gitHubIcon icon">
                            <img src="/img/GitHub-Mark-32px.png" />
                        </a>
                        <a href="https://www.linkedin.com/in/ualikhan-sarsenbayev-560740155/" target="_blank" className="LinkInIcon icon">
                            <img src="/img/linkedin.png" />
                        </a>
                    </div>
                    <div className="col-md-2 line">
                        <a href="/credits" target="_blank" className="textLink">Credits</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;