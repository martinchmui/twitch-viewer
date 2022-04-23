<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
import { RefreshingAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { connect } from 'react-redux';
import {
    loggedIn,
    loggedOut,
    addStream,
    deleteStream,
    selectNav,
    setUsername,
    selectMenu,
    chatOnly
} from '../actions';
import _ from 'lodash';

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const TwitchClient = (props) => {
    let popup;
    function ShowPopup(url) {
        popup = window.open(url, "Popup", "toolbar=no,scrollbars=no,location=no,statusbar=no,menubar=no");
        popup.focus();
    }

    const asyncLocalStorage = {
        setItem: async function (key, value) {
            await null;
            return localStorage.setItem(key, value);
        },
        getItem: async function (key) {
            await null;
            return localStorage.getItem(key);
        }
    };

    const main = async () => {
        try {
            const clientId = process.env.REACT_APP_TWITCH_CLIENT_ID;
            const clientSecret = process.env.REACT_APP_TWITCH_CLIENT_SECRET;
            const tokenData = JSON.parse(await asyncLocalStorage.getItem('userTokens', 'UTF-8'));
            const authProvider = new RefreshingAuthProvider(
                {
                    clientId,
                    clientSecret,
                    onRefresh: async newTokenData => await asyncLocalStorage.setItem('userTokens', JSON.stringify(newTokenData, null, 4), 'UTF-8')
                },
                tokenData
            );
            const apiClient = new ApiClient({ authProvider });

            const getStreams = async () => {
                const userid = await apiClient.users.getMe().then(response => response.id)
                const username = await apiClient.users.getMe().then(response => response.name)
                if (!userid) {
                    return false;
                } else {
                    if (props.username === '') {
                        props.setUsername(username)
                    }
                    if (props.isLoggedIn === false) {
                        props.loggedIn()
                    }
                    return await apiClient.streams.getFollowedStreams(userid).then(response => response.data.map(stream => stream.userName));
                }
            };
            return await getStreams()
        } catch (error) {
            if (props.isLoggedIn === true) {
                props.setUsername('')
                props.loggedOut()
            }
            console.log(error)
        }
    }

    const setStreamsState = async () => {
        try {
            const data = await main()
            const streams = data.map(item => { return { name: item, key: Math.random() } })
            const offlineStreams = _.differenceBy(props.streams, streams, 'name')
            const onlineStreams = _.differenceBy(streams, props.streams, 'name')
            const allStreams = [...props.userStreams, ...props.streams]
            if (offlineStreams.length > 0) {
                offlineStreams.forEach(stream => {
                    const newStreamArray = _.reject(allStreams, ['name', stream.name])
                    if (props.selected === stream.name) {
                        if (newStreamArray.length === 0) {
                            props.deleteStream(stream)
                            props.selectNav('')
                            props.selectMenu('')
                        } else {
                            props.deleteStream(stream)
                            props.selectNav(newStreamArray[0].name)
                            props.selectMenu(newStreamArray[0].name)
                        }
                    } else {
                        props.deleteStream(stream)
                    }
                })
            } else if (onlineStreams.length > 0) {
                onlineStreams.forEach(stream => {
                    if (!_.find(allStreams, ['name', stream.name])) {
                        props.addStream(stream)
                        if (allStreams.length === 0) {
                            props.chatOnly(true)
                        }
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        main()
        if (props.settings.autojoin) {
            setStreamsState()
        }
    }, []);

    useInterval(() => {
        if (props.isLoggedIn) {
            setStreamsState();
        }
    }, props.settings.autojoin ? 60000 : null)

    if (!props.isLoggedIn) {
        return (
            <button
                onClick={() => ShowPopup(`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_TWITCH_CLIENT_REDIRECT}&scope=user:read:follows`)}
                className='link-button'
            >
                (Sign-in)
            </button>
        );
    } else {
        if (props.isLoggedIn) {
        }
        return (
            <button
                onClick={() => {
                    localStorage.removeItem('userTokens')
                    props.loggedOut()
                }}
                className='link-button'
            >
                (Sign-out)
            </button>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.login.loggedIn,
        streams: state.streams.followedStreams,
        selected: state.selected.nav,
        username: state.login.username,
        userStreams: state.streams.userAddedStreams,
        player: state.player,
        settings: state.settings
    };
};

export default connect(mapStateToProps, {
    loggedIn,
    loggedOut,
    addStream,
    deleteStream,
    selectNav,
    setUsername,
    selectMenu,
    chatOnly
})(TwitchClient);
=======
import React, { useEffect, useRef } from 'react';
import { RefreshingAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { connect } from 'react-redux';
import {
    loggedIn,
    loggedOut,
    addStream,
    deleteStream,
    selectNav,
    setUsername,
    selectMenu,
    chatOnly
} from '../actions';
import _ from 'lodash';

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const TwitchClient = (props) => {
    let popup;
    function ShowPopup(url) {
        popup = window.open(url, "Popup", "toolbar=no,scrollbars=no,location=no,statusbar=no,menubar=no");
        popup.focus();
    }

    const asyncLocalStorage = {
        setItem: async function (key, value) {
            await null;
            return localStorage.setItem(key, value);
        },
        getItem: async function (key) {
            await null;
            return localStorage.getItem(key);
        }
    };

    const main = async () => {
        try {
            const clientId = process.env.REACT_APP_TWITCH_CLIENT_ID;
            const clientSecret = process.env.REACT_APP_TWITCH_CLIENT_SECRET;
            const tokenData = JSON.parse(await asyncLocalStorage.getItem('userTokens', 'UTF-8'));
            const authProvider = new RefreshingAuthProvider(
                {
                    clientId,
                    clientSecret,
                    onRefresh: async newTokenData => await asyncLocalStorage.setItem('userTokens', JSON.stringify(newTokenData, null, 4), 'UTF-8')
                },
                tokenData
            );
            const apiClient = new ApiClient({ authProvider });

            const getStreams = async () => {
                const userid = await apiClient.users.getMe().then(response => response.id)
                const username = await apiClient.users.getMe().then(response => response.name)
                if (!userid) {
                    return false;
                } else {
                    if (props.username === '') {
                        props.setUsername(username)
                    }
                    if (props.isLoggedIn === false) {
                        props.loggedIn()
                    }
                    return await apiClient.streams.getFollowedStreams(userid).then(response => response.data.map(stream => stream.userName));
                }
            };
            return await getStreams()
        } catch (error) {
            if (props.isLoggedIn === true) {
                props.setUsername('')
                props.loggedOut()
            }
            console.log(error)
        }
    }

    const setStreamsState = async () => {
        try {
            const data = await main()
            const streams = data.map(item => { return { name: item, key: Math.random() } })
            const offlineStreams = _.differenceBy(props.streams, streams, 'name')
            const onlineStreams = _.differenceBy(streams, props.streams, 'name')
            const allStreams = [...props.userStreams, ...props.streams]
            if (offlineStreams.length > 0) {
                offlineStreams.forEach(stream => {
                    const newStreamArray = _.reject(allStreams, ['name', stream.name])
                    if (props.selected === stream.name) {
                        if (newStreamArray.length === 0) {
                            props.deleteStream(stream)
                            props.selectNav('')
                            props.selectMenu('')
                        } else {
                            props.deleteStream(stream)
                            props.selectNav(newStreamArray[0].name)
                            props.selectMenu(newStreamArray[0].name)
                        }
                    } else {
                        props.deleteStream(stream)
                    }
                })
            } else if (onlineStreams.length > 0) {
                onlineStreams.forEach(stream => {
                    if (!_.find(allStreams, ['name', stream.name])) {
                        props.addStream(stream)
                        if (allStreams.length === 0) {
                            props.chatOnly(true)
                        }
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        main()
        if (props.settings.autojoin) {
            setStreamsState()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useInterval(() => {
        if (props.isLoggedIn) {
            setStreamsState();
        }
    }, props.settings.autojoin ? 60000 : null)

    if (!props.isLoggedIn) {
        return (
            <button
                onClick={() => ShowPopup(`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_TWITCH_CLIENT_REDIRECT}&scope=user:read:follows`)}
                className='link-button'
            >
                (Sign-in)
            </button>
        );
    } else {
        if (props.isLoggedIn) {
        }
        return (
            <button
                onClick={() => {
                    localStorage.removeItem('userTokens')
                    props.loggedOut()
                }}
                className='link-button'
            >
                (Sign-out)
            </button>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.login.loggedIn,
        streams: state.streams.followedStreams,
        selected: state.selected.nav,
        username: state.login.username,
        userStreams: state.streams.userAddedStreams,
        player: state.player,
        settings: state.settings
    };
};

export default connect(mapStateToProps, {
    loggedIn,
    loggedOut,
    addStream,
    deleteStream,
    selectNav,
    setUsername,
    selectMenu,
    chatOnly
})(TwitchClient);
>>>>>>> 9d92e3d57c9d940b75c80a04c0172fa39cad4628
