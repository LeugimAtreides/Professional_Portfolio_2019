const defaultTheme = {
    logo: '/homelogo.png',
    colorPrimary: '#00000',
    colorSecondary: '#FFFFF'
}

export default (state = defaultTheme, action) => {
    switch (action.type) {
        default:
            return state;
    }
}