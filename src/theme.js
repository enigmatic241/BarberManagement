import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    pad: {
        sm: 8, // Example value for small padding
        md: 16, // Example value for medium padding
        lg: 24, // Example value for large padding
        // Add other padding sizes as needed
    },
    appBarHeight: 64, // Example value for app bar height
    // Other theme properties...

    palette: {
        primary: {
            main: 'rgba(0,194,203,255)' //'#107869'//'#2196f3', // Replace with your desired primary color
        },
    },
});

export default theme;
