import React from 'react';

export default function Spinner() {
    return (
        <div className="spinner d-flex flex-column justify-content-center align-items-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="h2 pt-3">Loading</div>
        </div>
    );
}
