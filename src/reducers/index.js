import { combineReducers } from 'redux';
import _ from 'lodash';

function safelyParseJSON(json) {
    let parsed
    try {
        parsed = JSON.parse(json)
    } catch (e) {
    }
    return parsed
}

const persistedState = localStorage.getItem('settings')
    ? safelyParseJSON(localStorage.getItem('settings'))
    : { videosPerSlide: 1, autojoin: true, darkmode: true }

const loginReducer = (state = { loggedIn: false, username: '' }, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return { ...state, loggedIn: true };
        case 'LOGGED_OUT':
            return { loggedIn: false, username: '' };
        case 'SET_USERNAME':
            return { ...state, username: action.payload }
        default:
            return state;
    };
};

const streamsReducer = (state = { userAddedStreams: [], followedStreams: [] }, action) => {
    switch (action.type) {
        case 'ADD_STREAM':
            if (!_.find(state.followedStreams, ['name', action.payload.name])) {
                return { ...state, followedStreams: [...state.followedStreams, action.payload] }
            }
            else return state
        case 'DELETE_STREAM':
            return { ...state, followedStreams: _.reject(state.followedStreams, ['name', action.payload.name]) }
        case 'LOGGED_OUT':
            return { followedStreams: [], userAddedStreams: [] }
        case 'USER_ADD':
            if (!_.find(state.userAddedStreams, ['name', action.payload.name])) {
                return { ...state, userAddedStreams: [...state.userAddedStreams, action.payload] }
            }
            else return state
        case 'USER_DELETE':
            return { ...state, userAddedStreams: _.reject(state.userAddedStreams, ['name', action.payload.name]) }
        case 'REFRESH':
            if (_.find(state.followedStreams, ['name', action.payload.name])) {
                const newArray = state.followedStreams.map(item => {
                    if (item.name === action.payload.name) {
                        return { name: action.payload.name, key: action.payload.key + 1 }
                    } else {
                        return item
                    }
                })
                return { ...state, followedStreams: newArray }
            } else if (_.find(state.userAddedStreams, ['name', action.payload.name])) {
                const newArray = state.userAddedStreams.map(item => {
                    if (item.name === action.payload.name) {
                        return { name: action.payload.name, key: action.payload.key + 1 }
                    } else {
                        return item
                    }
                })
                return { ...state, userAddedStreams: newArray }
            } else return state
        default:
            return state;
    }
}

const playerReduucer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_VIDEO':
            if (!state.includes(action.payload)) {
                return [...state, action.payload]
            }
            else return state
        case 'LOGGED_OUT':
            return []
        case 'DELETE_VIDEO':
            return _.without(state, action.payload)
        default:
            return state
    }
}

const selectedReducer = (state = { nav: '', menu: '' }, action) => {
    switch (action.type) {
        case 'SELECT_NAV':
            return { ...state, nav: action.payload }
        case 'SELECT_MENU':
            return { ...state, menu: action.payload }
        case 'LOGGED_OUT':
            return { nav: '', menu: '' }
        default:
            return state;
    }
}

const visibilityReducer = (state = { menu: true, chat: true, chatOnly: false, activeSlideIndex: 0, carouselControls: false, settings: false, focusStream: '' }, action) => {
    switch (action.type) {
        case 'TOGGLE_MENU':
            return { ...state, menu: action.payload }
        case 'TOGGLE_CHAT':
            return { ...state, chat: action.payload }
        case 'CHAT_ONLY':
            return { ...state, chatOnly: action.payload }
        case 'SLIDE_INDEX':
            return { ...state, activeSlideIndex: action.payload }
        case 'CAROUSEL_CONTROLS':
            return { ...state, carouselControls: action.payload }
        case 'TOGGLE_SETTINGS':
            return { ...state, settings: action.payload }
        case 'FOCUS_STREAM':
            return { ...state, focusStream: action.payload }
        case 'LOGGED_OUT':
            return { menu: true, chat: true, chatOnly: false, activeSlideIndex: 0, carouselControls: false, settings: false, focusStream: '' }
        default:
            return state;
    };
};

const inputReducer = (state = { chat: '', player: '' }, action) => {
    switch (action.type) {
        case 'INPUT_CHAT':
            return { ...state, chat: action.payload }
        case 'INPUT_PLAYER':
            return { ...state, player: action.payload }
        default:
            return state;
    }
}

const settingsReducer = (state = persistedState, action) => {
    switch (action.type) {
        case 'MAX_VIDEOS':
            localStorage.setItem('settings', JSON.stringify({ ...state, videosPerSlide: action.payload }))
            return { ...state, videosPerSlide: action.payload }
        case 'TOGGLE_AUTOJOIN':
            localStorage.setItem('settings', JSON.stringify({ ...state, autojoin: action.payload }))
            return { ...state, autojoin: action.payload }
        case 'TOGGLE_DARKMODE':
            localStorage.setItem('settings', JSON.stringify({ ...state, darkmode: action.payload }))
            return { ...state, darkmode: action.payload }
        default:
            return state;
    }
}

export default combineReducers({
    login: loginReducer,
    streams: streamsReducer,
    player: playerReduucer,
    selected: selectedReducer,
    visibility: visibilityReducer,
    input: inputReducer,
    settings: settingsReducer
})
