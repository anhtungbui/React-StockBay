import React from 'react';
import ProfileItem from './ProfileItem';

// FIXME: TypeError: Currency code is required with currency style.

export default function ProfileList({ profile }) {
    return (
        <div className="card">
            <div className="card-header">Company Profile</div>
            <div className="card-body">
                <img className="profile__logo" src={profile.logo} alt="logo" />
                <h1>{profile.name}</h1>

                <ProfileItem title="Ticker" body={profile.ticker} />

                <ProfileItem title="Country" body={profile.country} />

                <ProfileItem title="Exchange" body={profile.exchange} />

                <ProfileItem title="Industry" body={profile.finnhubIndustry} />

                <ProfileItem title="Phone" body={profile.phone} phone />

                <ProfileItem title="Web URL" body={profile.weburl} url />

                <ProfileItem title="IPO" body={profile.ipo} />

                <ProfileItem title="Currency" body={profile.currency} />

                <ProfileItem
                    title="Market Caplitalization"
                    body={new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(profile.marketCapitalization)}
                />
                <ProfileItem
                    title="Share Outstanding"
                    body={new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(profile.shareOutstanding)}
                />
            </div>
        </div>
    );
}
