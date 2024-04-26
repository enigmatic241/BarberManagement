import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Flexbox } from '../styled-component';
import AddProducts from '../Modals/AddProducts';
import { useAuth } from '../Context/AuthContext';
import UsersBooking from '../components/UsersData/UsersBooking';
import MerchantProduct from '../Modals/MerchantProduct';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 20000,


    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function SampleAppBar() {
    const classes = useStyles();
    const [openAddProduct, setOpenAddProduct] = React.useState(false);
    const { userLoggedIn, currentUser } = useAuth()
    const [openMyBookings, setOpenMyBookings] = useState(false)
    const [openMerchantProducts, setOpenMerchantProducts] = useState(false)

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Flexbox gap={"10px"} >
                        <Typography variant="subtitle1" className={classes.title} onClick={() => setOpenAddProduct(true)}>
                            Add Products
                        </Typography>
                        <Typography onClick={() => { setOpenMerchantProducts(true) }} variant="subtitle1" className={classes.title}>
                            Products
                        </Typography>
                        <Typography variant="subtitle1" className={classes.title}>
                            Bookings
                        </Typography>
                        <Typography onClick={() => setOpenMyBookings(true)} variant="subtitle1" className={classes.title}>
                            My Bookings
                        </Typography>


                    </Flexbox>
                    <Button onClick={() => {

                    }} color="inherit">{userLoggedIn ? "Logout" : "Login"}</Button>
                </Toolbar>
            </AppBar>
            <AddProducts classes={classes} open={openAddProduct} handleClose={() => setOpenAddProduct(false)} />
            <UsersBooking open={openMyBookings} handleClose={() => setOpenMyBookings(false)} />
            <MerchantProduct open={openMerchantProducts} handleClose={() => setOpenMerchantProducts(false)} />
        </div>
    );
}
