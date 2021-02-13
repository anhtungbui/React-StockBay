import React from 'react';

export default function Footer() {
    return (
        <div className="footer mt-auto footer-light">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 small">
                        Copyright ©{' '}
                        <a href="https://anhtungbui.com">Anh Tung Bui</a>&nbsp;
                        <span>{new Date().getFullYear()}</span>
                    </div>
                    <div className="col-md-6 text-md-right small">
                        Made with ❤️ from Cologne, Germany 🇩🇪
                    </div>
                </div>
            </div>
        </div>
    );
}
