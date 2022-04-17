import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectNav, toggleChat, selectMenu } from '../actions';
import { TwitchChat } from 'react-twitch-embed';
import left from '../assets/left.png'
import right from '../assets/right.png'
import collapse from '../assets/collapse.png'

const Chat = (props) => {
    const selectIndex = props.streams.map(item => item.name).indexOf(props.selected)
    useEffect(() => {
        if (props.streams.length > 0 && props.selected.length === 0) {
            props.selectNav(props.streams[0].name)
        }
    })

    return (
        <div
            id={props.darkmode ? 'chatdivdark' : 'chatdivlight'}
            className='rootdiv'
            style={props.chatOnly && props.visibility ? { width: '100%' } : props.visibility ? {} : { display: 'none' }}
        >
            <div id='chatnav'>
                <img className={props.darkmode ? 'icons' : ''} src={left} alt='Previous Chat' title='Previous Chat' onClick={() => {
                    if (selectIndex === 0) {
                        props.selectNav(props.streams[props.streams.length - 1].name)
                        props.selectMenu(props.streams[props.streams.length - 1].name)
                    } else {
                        props.selectNav(props.streams[selectIndex - 1].name)
                        props.selectMenu(props.streams[selectIndex - 1].name)
                    }
                }} />
                <select id='chatsel' onChange={(e) => {
                    props.selectNav(e.target.value)
                    props.selectMenu(e.target.value)
                }}>
                    {props.streams.map((stream, key) => {
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
                <img className={props.darkmode ? 'icons' : ''} src={right} alt='Next Chat' title='Next Chat' onClick={() => {
                    if (selectIndex === props.streams.length - 1) {
                        props.selectNav(props.streams[0].name)
                        props.selectMenu(props.streams[0].name)
                    } else {
                        props.selectNav(props.streams[selectIndex + 1].name)
                        props.selectMenu(props.streams[selectIndex + 1].name)
                    }
                }} />
            </div>
            <div id='icondiv' style={props.darkmode ? { background: 'black' } : { background: 'white' }}>
                <img
                    className={props.darkmode ? 'icons' : ''}
                    src={collapse}
                    alt='Collapse Chat'
                    title='Collapse Chat'
                    id='chatvis'
                    onClick={() => {
                        props.toggleChat(!props.visibility)
                    }}
                />
            </div>
            <div id='chatwin'>
                {props.streams.map((stream) => {
                    if (stream.name === props.selected) {
                        return (
                            <div className='chatEmbed' key={stream.key} id={`c-${stream.name}`}>
                                <TwitchChat
                                    channel={stream.name}
                                    id={stream.name}
                                    theme={props.darkmode ? 'dark' : 'light'}
                                    height='100%'
                                    width='100%'
                                />
                            </div>
                        )
                    }
                    return (
                        <div key={stream.key} className='chatEmbed' id={`c-${stream.name}`} style={{ visibility: 'hidden' }}>
                            <TwitchChat
                                channel={stream.name}
                                id={stream.name}
                                theme={props.darkmode ? 'dark' : 'light'}
                                height='100%'
                                width='100%'
                            />
                        </div>
                    )
                })}
            </div>
        </div >
    );
};

const mapStateToProps = (state) => {
    return {
        streams: [...state.streams.userAddedStreams, ...state.streams.followedStreams],
        selected: state.selected.nav,
        visibility: state.visibility.chat,
        chatOnly: state.visibility.chatOnly,
        darkmode: state.settings.darkmode
    };
};

export default connect(mapStateToProps, { selectNav, toggleChat, selectMenu })(Chat);
