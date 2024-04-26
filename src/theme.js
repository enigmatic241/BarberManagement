import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    pad: {
        sm: '8px', // Example value for small padding
        md: '16px', // Example value for medium padding
        lg: '24px', // Example value for large padding
        // Add other padding sizes as needed
    },
    appBarHeight: '64px'
    // Other theme properties...
});

export default theme;
