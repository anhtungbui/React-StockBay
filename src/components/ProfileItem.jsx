import React from 'react';

export default function ProfileItem({ title, body, phone, url }) {
    // Remove .0 from the API string and add + symbol in front
    body = phone ? '+' + body.slice(0, -2) : body;

    body = url ? <a href={body}>{body}</a> : body;

    return (
        <div>
            <h4 className="text-uppercase text-sm">{title}</h4>
            <div className="font-weight-bolder">{body}</div>
            <hr />
        </div>
    );
}
