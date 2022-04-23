import React, { useEffect } from 'react';
import TwitchClient from './TwitchClient'
import { connect } from 'react-redux';
import {
    userAdd,
    selectNav,
    inputChat,
    inputPlayer,
    selectMenu,
    addStream,
    deleteStream,
    userDelete,
    toggleMenu,
    toggleChat,
    chatOnly,
    addVideo,
    deleteVideo,
    slideIndex,
    refresh,
    toggleSettings,
    maxVideos,
    toggleAutojoin,
    toggleDarkmode,
    focusStream
} from '../actions';
import add from '../assets/add.png'
import add2 from '../assets/add2.png'
import remove from '../assets/remove.png'
import remove2 from '../assets/remove2.png'
import options from '../assets/options.png'
import expand from '../assets/expand.png'
import reload from '../assets/reload.png'
import source from '../assets/source.png'
import video from '../assets/video.png'
import extend from '../assets/extend.png'
import layout1 from '../assets/layout1.png'
import layout2 from '../assets/layout2.png'
import layout3 from '../assets/layout3.png'
import layout4 from '../assets/layout4.png'
import focus from '../assets/focus.png'
import _ from 'lodash';

const Menu = (props) => {
    useEffect(() => {
        if (streams.length > 0 && props.selected.length === 0) {
            props.selectMenu(streams[0].name)
        }
    })
    const streams = [...props.userAddedStreams, ...props.followedStreams]

    return (
        <div
            id='menudiv'
            className={
                `${props.visibility.menu ? 'expandmenudiv' : 'collapsemenudiv'}
                ${!props.visibility.chat ? 'menudivnochat' : 'menudivwithchat'}
                ${props.visibility.chat && props.player.length !== 0 && !props.visibility.menu ? 'mobile': ''}
                `
            }
        >
            <img
                className={
                    `icons ${!props.visibility.chat ? 'optionsnochat' : 'optionswithchat'}`
                }
                id='options'
                src={options}
                alt='Options and settings'
                title='Options and settings'
                onClick={() => {
                    props.toggleMenu(!props.visibility.menu);
                    props.toggleSettings(false)
                }}
            />
            <img
                className={
                    `icons
                    ${props.visibility.chat ? 'hidden' : ''}`
                }
                id={props.visibility.menu ? 'expandv2' : 'expand'}
                src={expand}
                alt='Expand Chat'
                title='Expand Chat'
                onClick={() => props.toggleChat(!props.visibility.chat)}
            />
            <div id='menuContent'
                className={
                    `${!props.visibility.menu ? 'hidden' : ''}
                    ${!props.visibility.chat ? 'menucontentnochat' : 'menucontentwithchat'}`
                }
            >
                <div className={`menublock ${props.visibility.settings ? 'hidden' : ''}`}>
                    {!props.login.loggedIn ?
                        <div className='menurow' >
                            <span>Welcome to Twitch Viewer</span>
                            <TwitchClient />
                        </div> :
                        <div className='menurow'>
                            <span>Welcome {props.login.username}</span>
                            <TwitchClient />
                        </div>
                    }
                    <div className='menurow'>
                        Streams:
                    </div>
                    {props.player.map((stream, key) => {
                        return (
                            <div className='menurow' key={key}>
                                <input
                                    type='text'
                                    disabled
                                    value={stream}
                                    className='newInput disabled'
                                />
                                <img
                                    className='icons menuIcons'
                                    src={focus}
                                    alt='Focus stream'
                                    title='Focus stream'
                                    onClick={() => {
                                        const videosArray = _.chunk(props.player, props.settings.videosPerSlide)
                                        const index = videosArray.findIndex(array => array.includes(stream))
                                        if (props.visibility.focusStream === stream) {
                                            props.focusStream('')
                                        } else {
                                            props.focusStream(stream)
                                            props.slideIndex(index)
                                        }
                                    }}
                                    id={`${props.visibility.focusStream === stream ? 'highlighted' : ''}`}
                                />
                                <img
                                    className='icons menuIcons'
                                    src={remove2}
                                    alt='Remove with chat'
                                    title='Remove with chat'
                                    onClick={() => {
                                        const newArray = _.reject(streams, ['name', stream])
                                        const newPlayer = props.player.filter(item => item !== stream)
                                        props.deleteVideo(stream)
                                        props.slideIndex(0)
                                        props.deleteStream({ name: stream })
                                        props.userDelete({ name: stream })
                                        if (newArray.length === 0) {
                                            props.selectNav('')
                                            props.selectMenu('')
                                            props.toggleChat(false)
                                            props.chatOnly(false)
                                        } else {
                                            props.selectNav(newArray[0].name)
                                        }
                                        if (newPlayer.length === 0 && newArray.length !== 0) {
                                            props.chatOnly(true)
                                            props.toggleChat(true)
                                        } else {
                                            props.chatOnly(false)
                                            props.toggleChat(true)
                                        }
                                        if (props.visibility.focusStream === stream) {
                                            props.focusStream('')
                                        }
                                    }}
                                />
                                <img
                                    className='icons menuIcons'
                                    src={remove}
                                    alt='Remove without chat'
                                    title='Remove without chat'
                                    onClick={() => {
                                        const newPlayer = props.player.filter(item => item !== stream)
                                        props.deleteVideo(stream)
                                        props.slideIndex(0)
                                        if (newPlayer.length === 0 && streams.length !== 0) {
                                            props.chatOnly(true)
                                            props.toggleChat(true)
                                        } else {
                                            props.chatOnly(false)
                                            props.toggleChat(true)
                                        }
                                        if (props.visibility.focusStream === stream) {
                                            props.focusStream('')
                                        }
                                    }} />

                            </div>
                        )
                    })}
                    <div className='menurow'>
                        <input
                            type='text'
                            className='newInput'
                            onKeyDown={(e) => {
                                const newArray = [...props.player, e.target.value]
                                const videosArray = _.chunk(newArray, props.settings.videosPerSlide)
                                const index = videosArray.findIndex(array => array.includes(e.target.value))
                                if (e.key === 'Enter' && e.target.value !== '') {
                                    if (!props.player.includes(item => item === e.target.value)) {
                                        props.addVideo(e.target.value)
                                        props.chatOnly(false)
                                        props.userAdd({ name: e.target.value, key: Math.random() })
                                        props.selectNav(e.target.value)
                                        if (streams.length === 0) {
                                            props.selectMenu(e.target.value)
                                        }
                                    }
                                    if (props.visibility.focusStream === '') {
                                        props.slideIndex(index)
                                    }
                                    props.inputPlayer('')
                                }
                            }}
                            onChange={(e) => props.inputPlayer(e.target.value)}
                            value={props.input.player}
                        />
                        <img
                            className='icons menuIcons'
                            id='add2'
                            src={add2}
                            alt='Add with chat'
                            title='Add with chat'
                            onClick={(e) => {
                                const newArray = [...props.player, props.input.player]
                                const videosArray = _.chunk(newArray, props.settings.videosPerSlide)
                                const index = videosArray.findIndex(array => array.includes(props.input.player))
                                if (!props.player.includes(item => item === props.input.player) && props.input.player.length !== 0) {
                                    props.addVideo(props.input.player)
                                    props.chatOnly(false)
                                    props.toggleChat(true)
                                    props.userAdd({ name: props.input.player, key: Math.random() })
                                    props.selectNav(props.input.player)
                                    if (streams.length === 0) {
                                        props.selectMenu(props.input.player)
                                    }
                                }
                                if (props.visibility.focusStream === '') {
                                    props.slideIndex(index)
                                }
                                props.inputPlayer('')
                            }} />
                        <img
                            className='icons menuIcons'
                            id='add'
                            src={add}
                            alt='Add without chat'
                            title='Add without chat'
                            onClick={async (e) => {
                                const newArray = [...props.player, props.input.player]
                                const videosArray = _.chunk(newArray, props.settings.videosPerSlide)
                                const index = videosArray.findIndex(array => array.includes(props.input.player))
                                if (!props.player.includes(item => item === props.input.player) && props.input.player.length !== 0) {
                                    props.addVideo(props.input.player)
                                    props.chatOnly(false)
                                    props.toggleChat(true)
                                }
                                if (props.visibility.focusStream === '') {
                                    props.slideIndex(index)
                                }
                                if (streams.length === 0) {
                                    props.toggleChat(false)
                                }
                                props.inputPlayer('')
                            }} />
                    </div>
                    <div className='menurow'>
                        Chats:
                        <img
                            className='icons menuIcons'
                            src={extend}
                            alt='Toggle chat only mode'
                            title='Toggle chat only mode'
                            onClick={() => {
                                props.chatOnly(!props.visibility.chatOnly)
                            }}
                        />
                    </div>
                    {streams.length > 0 ?
                        <div className='menurow'>
                            <select id='menuchatsel' onChange={(e) => props.selectMenu(e.target.value)}>
                                {streams.map((stream, key) => {
                                    if (stream.name === props.selected) {
                                        return (
                                            <option key={key} selected>{stream.name}</option>
                                        )
                                    }
                                    return (
                                        <option key={key}>{stream.name}</option>
                                    )
                                })}
                            </select>
                            <a href={`https://www.twitch.tv/${props.selected}`} target='_blank' rel='noreferrer'>
                                <img
                                    className='icons menuIcons'
                                    src={source}
                                    alt='Open Source Page'
                                    title='Open Source Page' />
                            </a>
                            <img className='icons menuIcons'
                                src={video}
                                alt='Add Video'
                                title='Add Video'
                                onClick={() => {
                                    const newArray = [...props.player, props.selected]
                                    props.addVideo(props.selected);
                                    props.chatOnly(false);
                                    props.selectNav(props.selected);
                                    props.slideIndex(newArray.length - 1)
                                }}
                            />
                            <img
                                className='icons menuIcons'
                                src={reload}
                                alt='Reload Chat'
                                title='Reload Chat'
                                onClick={() => props.refresh(_.find(streams, ['name', props.selected]))}
                            />
                            <img
                                className='icons menuIcons'
                                src={remove}
                                alt='Remove Chat'
                                title='Remove Chat'
                                onClick={() => {
                                    const newStreamArray = _.reject(streams, ['name', props.selected])
                                    if (_.find(props.userAddedStreams, ['name', props.selected])) {
                                        props.userDelete({ name: props.selected })
                                    } else {
                                        props.deleteStream({ name: props.selected })
                                    }
                                    if (newStreamArray.length > 0) {
                                        props.selectNav(newStreamArray[0].name)
                                        props.selectMenu(newStreamArray[0].name)
                                    } else {
                                        props.selectNav('')
                                        props.selectMenu('')
                                        props.chatOnly(false)
                                    }
                                    if (newStreamArray.length === 0) {
                                        props.toggleChat(false)
                                    }
                                    if(newStreamArray.length === 0 && props.player.length === 0) {
                                        props.toggleChat(true)
                                    }
                                }} />
                        </div> : null
                    }
                    <div className='menurow'>
                        <input
                            type='text'
                            className='newInput'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.target.value !== '') {
                                    if (!_.find(streams, ['name', e.target.value])) {
                                        props.userAdd({ name: e.target.value, key: Math.random() })
                                        props.selectNav(e.target.value)
                                        props.selectMenu(e.target.value)
                                    }
                                    if (props.player.length === 0) {
                                        props.chatOnly(true)
                                    }
                                    props.inputChat('')
                                    props.toggleChat(true)
                                }
                            }}
                            onChange={(e) => props.inputChat(e.target.value)}
                            value={props.input.chat}
                        />
                        <img
                            className='icons menuIcons'
                            id='add'
                            src={add}
                            alt='Add Chat'
                            title='Add Chat'
                            onClick={(e) => {
                                if (!_.find(streams, ['name', props.input.chat]) && props.input.chat.length !== 0) {
                                    props.userAdd({ name: props.input.chat, key: Math.random() })
                                    props.selectNav(props.input.chat)
                                    props.selectMenu(props.input.chat)
                                }
                                if (props.player.length === 0) {
                                    props.chatOnly(true)
                                }
                                props.inputChat('')
                                props.toggleChat(true)
                            }} />
                    </div>
                </div>
                <div className={`menublock ${!props.visibility.settings ? 'hidden' : ''}`} >
                    <div className='menurow'>
                        Layout:
                    </div>
                    <form onChange={e => {
                        props.maxVideos(parseInt(e.target.value))
                        props.slideIndex(0)
                    }}>
                        <div className='menurow'>
                            <input
                                type='radio'
                                name='layout'
                                value={1}
                                id='layout1'
                                defaultChecked={props.settings.videosPerSlide === 1 ? 'checked' : ''}
                            />
                            <label htmlFor='layout1'>
                                <img src={layout1} alt='Layout 1' />
                            </label>

                            <input
                                type='radio'
                                name='layout'
                                value={2}
                                id='layout2'
                                defaultChecked={props.settings.videosPerSlide === 2 ? 'checked' : ''}
                            />
                            <label htmlFor='layout2'>
                                <img src={layout2} alt='Layout 2' />
                            </label>

                            <input
                                type='radio'
                                name='layout'
                                value={3}
                                id='layout3'
                                defaultChecked={props.settings.videosPerSlide === 3 ? 'checked' : ''}
                            />
                            <label htmlFor='layout3'>
                                <img src={layout3} alt='Layout 3' />
                            </label>

                            <input
                                type='radio'
                                name='layout'
                                value={4}
                                id='layout4'
                                defaultChecked={props.settings.videosPerSlide === 4 ? 'checked' : ''}
                            />
                            <label htmlFor='layout4'>
                                <img src={layout4} alt='Layout 4' />
                            </label>
                        </div>
                    </form>
                    <div className='menurow toggle'>
                        <span>Toggle Light/Dark Mode:</span>
                        <input
                            type='checkbox'
                            className='checkbox'
                            id='chk'
                            checked={props.settings.darkmode}
                            onChange={e => props.toggleDarkmode(e.target.checked)}
                        />
                        <label className='label' htmlFor='chk'>
                            <i className='fas fa-sun'></i>
                            <i className='fas fa-moon'></i>
                            <div className='ball'></div>
                        </label>
                    </div>
                    <div className='menurow'>
                        <input
                            type='checkbox'
                            name='autojoin'
                            id='autojoin'
                            checked={props.settings.autojoin}
                            onChange={() => props.toggleAutojoin(!props.settings.autojoin)}
                        />
                        <label className='menuIcons' htmlFor='autojoin'>
                            Auto-join live followed channels' chats
                        </label>
                    </div>

                </div>
                <div className='menublock'>
                    <button
                        id='settings'
                        onClick={() => props.toggleSettings(!props.visibility.settings)}
                    >
                        {props.visibility.settings ? 'Back' : 'Settings'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userAddedStreams: state.streams.userAddedStreams,
        followedStreams: state.streams.followedStreams,
        input: state.input,
        selected: state.selected.menu,
        visibility: state.visibility,
        player: state.player,
        settings: state.settings,
        login: state.login
    };
};

export default connect(mapStateToProps, {
    userAdd,
    selectNav,
    inputChat,
    inputPlayer,
    selectMenu,
    addStream,
    deleteStream,
    userDelete,
    toggleMenu,
    toggleChat,
    chatOnly,
    addVideo,
    deleteVideo,
    slideIndex,
    refresh,
    toggleSettings,
    maxVideos,
    toggleAutojoin,
    toggleDarkmode,
    focusStream
})(Menu);