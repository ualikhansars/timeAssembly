import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <div className="container-fluid footer">
                <div className="row">
                    <div className="col-md-5 line">
                        <span className="author">2018 Ualikhan Sarsenbayev</span>
                        <a href="#" className="textLink">Portfolio</a>
                    </div>
                    <div className="col-md-5 icons">
                        <a href="https://github.com/ualikhansars" className="gitHubIcon icon">
                            <img src="/img/GitHub-Mark-32px.png" />
                        </a>
                        <a href="https://www.linkedin.com/in/ualikhan-sarsenbayev-560740155/" className="LinkInIcon icon">
                            <img src="/img/linkedin.png" />
                        </a>
                    </div>
                    <div className="col-md-2 line">
                        <a href="/credits" className="textLink">Credits</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;