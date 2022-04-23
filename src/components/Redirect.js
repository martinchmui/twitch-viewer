import React from 'react'
import axios from 'axios'

const str = window.location.search
const code = str.substring(
    str.indexOf("=") + 1,
    str.lastIndexOf("&"))


class Redirect extends React.Component {
    async componentDidMount() {
        if (code) {
            this.getAccessToken()
        }
    }
    getAccessToken = () => {
        axios.post('https://id.twitch.tv/oauth2/token', {
            client_id: process.env.REACT_APP_TWITCH_CLIENT_ID,
            client_secret: process.env.REACT_APP_TWITCH_CLIENT_SECRET,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: process.env.REACT_APP_TWITCH_CLIENT_REDIRECT
        }).then(response => {
            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;
            localStorage.setItem('userTokens', JSON.stringify({ "accessToken": accessToken, "refreshToken": refreshToken, "expiresIn": 0, "obtainmentTimestamp": 0 }))
        })
    }

    RefreshParent() {
        if (window.opener != null && !window.opener.closed) {
            window.opener.location.reload();
        }
    }
    render() {
        window.onbeforeunload = this.RefreshParent;
        setTimeout(() => window.close(), 1000)
        setTimeout(() => window.location.replace("/"), 1000)
        return (
            <div className='center'>
                Redirecting
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>            
            </div>
        )
    }
}

export default Redirect