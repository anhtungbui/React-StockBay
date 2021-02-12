import React from 'react';
import { ImSad } from 'react-icons/im';

export default function NoResults({ query }) {
    return (
        <div>
            Nothing found for <b>{query}</b>
            Please try it again
            <ImSad />
        </div>
    );
}
