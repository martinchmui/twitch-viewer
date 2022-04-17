// loginActions
export const loggedIn = () => {
    return {
        type: 'LOGGED_IN'
    };
};

export const loggedOut = () => {
    return {
        type: 'LOGGED_OUT'
    };
};

export const setUsername = (username) => {
    return {
        type: 'SET_USERNAME',
        payload: username
    }
}

// streamsActions
export const addStream = (stream) => {
    return {
        type: 'ADD_STREAM',
        payload: stream
    }
}

export const deleteStream = (stream) => {
    return {
        type: 'DELETE_STREAM',
        payload: stream
    }
}

export const userAdd = (stream) => {
    return {
        type: 'USER_ADD',
        payload: stream
    }
}

export const userDelete = (stream) => {
    return {
        type: 'USER_DELETE',
        payload: stream
    }
}

export const refresh = (stream) => {
    return {
        type: 'REFRESH',
        payload: stream
    }
}

// playerActions
export const addVideo = (stream) => {
    return {
        type: 'ADD_VIDEO',
        payload: stream
    }
}

export const deleteVideo = (stream) => {
    return {
        type: 'DELETE_VIDEO',
        payload: stream
    }
}

// selectedActions
export const selectNav = (stream) => {
    return {
        type: 'SELECT_NAV',
        payload: stream
    }
}

export const selectMenu = (stream) => {
    return {
        type: 'SELECT_MENU',
        payload: stream
    }
}

// visibilityActions
export const toggleMenu = (boolean) => {
    return {
        type: 'TOGGLE_MENU',
        payload: boolean
    }
}

export const toggleChat = (boolean) => {
    return {
        type: 'TOGGLE_CHAT',
        payload: boolean
    }
}

export const chatOnly = (boolean) => {
    return {
        type: 'CHAT_ONLY',
        payload: boolean
    }
}

export const slideIndex = (number) => {
    return {
        type: 'SLIDE_INDEX',
        payload: number
    }
}

export const carouselControls = (boolean) => {
    return {
        type: 'CAROUSEL_CONTROLS',
        payload: boolean
    }
}

export const toggleSettings = (boolean) => {
    return {
        type: 'TOGGLE_SETTINGS',
        payload: boolean
    }
}


export const focusStream = (stream) => {
    return {
        type: 'FOCUS_STREAM',
        payload: stream
    }
}

// inputActions
export const inputChat = (value) => {
    return {
        type: 'INPUT_CHAT',
        payload: value
    }
}

export const inputPlayer = (value) => {
    return {
        type: 'INPUT_PLAYER',
        payload: value
    }
}

// settingsActions
export const maxVideos = (number) => {
    return {
        type: 'MAX_VIDEOS',
        payload: number
    }
}

export const toggleAutojoin = (boolean) => {
    return {
        type: 'TOGGLE_AUTOJOIN',
        payload: boolean
    }
}

export const toggleDarkmode = (boolean) => {
    return {
        type: 'TOGGLE_DARKMODE',
        payload: boolean
    }
}
