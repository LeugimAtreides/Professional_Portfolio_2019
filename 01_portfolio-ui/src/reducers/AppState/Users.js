
const defaultUserIsMe = false;
const userIsMe = (state = defaultUserIsMe, action) => {
    switch (action.type) {
        case 'USER_IS_ME':
            return true;
        case 'USER_IS_NOT_ME':
            return state;
        default:
            return state;

    }
}

export default userIsMe;