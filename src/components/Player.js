import React from 'react';
import { connect } from 'react-redux';
import ReactTwitchEmbedVideo from "react-twitch-embed-video"
import { Carousel } from 'react-bootstrap';
import { slideIndex, carouselControls, focusStream } from '../actions';
import logo from '../assets/logo.png'
import _ from 'lodash';

const Player = (props) => {
    const videosArray = _.chunk(props.player, props.settings.videosPerSlide)
    return (
        <div id={props.settings.darkmode ? 'playdivdark' : 'playdivlight'}
            className='rootdiv'
            style={!props.visibility.chat ?
                { width: '100%', backgroundImage: `url(${logo})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' } :
                { backgroundImage: `url(${logo})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }
            }
            onMouseEnter={() => props.carouselControls(true)}
            onMouseLeave={() => props.carouselControls(false)}
        >
            <Carousel
                interval={null}
                controls={props.player.length === 1 || videosArray.length === 1 ? false :
                    props.visibility.carouselControls && (props.length > 1 || videosArray.length > 1) ? true : false
                }
                style={props.visibility.chatOnly && props.visibility.chat ? { visibility: 'hidden' } : {}}
                indicators={props.player.length === 1 || videosArray.length === 1 ? false : true}
                onSelect={(e) => {
                    props.slideIndex(e)
                    if (props.visibility.activeSlideIndex !== e) {
                        props.focusStream('')
                    }
                }}
                activeIndex={props.visibility.activeSlideIndex}
            >
                {props.settings.videosPerSlide === 1 ?
                    props.player.map(stream => {
                        return (
                            <Carousel.Item key={stream}>
                                <div className='single'>
                                    <ReactTwitchEmbedVideo
                                        channel={stream}
                                        height='100%'
                                        width='100%'
                                        muted={true}
                                        targetId={`v-${stream}`}
                                        layout='video'
                                    />
                                </div>
                            </Carousel.Item>
                        )
                    }) :
                    videosArray.map((array, key) => {
                        return (
                            <Carousel.Item key={key}>
                                {array.map((stream) => {
                                    return (
                                        <div
                                            className={array.length === 2 || (array.length === 3 && stream === array[0]) ? 'half' :
                                                array.length === 4 || array.length === 3 ? 'quarter' : 'single'}
                                            key={stream}
                                            id={props.visibility.focusStream === stream ? 'focused' : ''}
                                        >
                                            <ReactTwitchEmbedVideo
                                                channel={stream}
                                                height='100%'
                                                width='100%'
                                                muted={true}
                                                targetId={`v-${stream}`}
                                                layout='video'
                                            />
                                        </div>
                                    )
                                })}
                            </Carousel.Item>)
                    })
                }
            </Carousel>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        player: state.player,
        visibility: state.visibility,
        settings: state.settings
    };
};
export default connect(mapStateToProps, { slideIndex, carouselControls, focusStream })(Player);