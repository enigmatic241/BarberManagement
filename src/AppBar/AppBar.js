import React, { useEffect, useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

import MoreIcon from '@material-ui/icons/MoreVert';
import UsersBooking from '../components/UsersData/UsersBooking';
import MerchantProduct from '../Modals/MerchantProduct';
import { useAuth } from '../Context/AuthContext';
import AddProducts from '../Modals/AddProducts';
import { Button } from '@material-ui/core';
import MerchantBookings from '../Modals/MerchantBookings';
import useUserDetails from '../components/Hooks/useUserDetails';
import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../Authentication/auth';
import { Flexbox } from '../styled-component';
import AddBarberShops from '../Modals/AddShops';




const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [openAddProduct, setOpenAddProduct] = React.useState(false);
    const { userLoggedIn, currentUser } = useAuth()

    const [openMyBookings, setOpenMyBookings] = useState(false)
    const [openMerchantProducts, setOpenMerchantProducts] = useState(false)
    const [openMerchantBookings, setOpenMerchantBookings] = useState(false)
    const [addBarberShops, setAddBarberShops] = useState(false)
    const [isSignOut, setSignOut] = useState(false)
    const [userType, setUserType] = useState('')

    const { userDetails } = useUserDetails()
    const history = useNavigate()

    //console.log(userLoggedIn, "appbar", userType, currentUser)

    useEffect(() => {
        if (userDetails) {
            const filterUser = userDetails.filter(user => user.email === currentUser?.email)
            setUserType(filterUser[0]?.user_type)
        }
    }, [userDetails, currentUser])


    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = (e) => {
        setAnchorEl(null);
        handleMobileMenuClose();

    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogOut = (e) => {
        e.preventDefault()

        if (!isSignOut) {
            setSignOut(true)
            try {
                doSignOut()
                history('/login')

            } catch (err) {
                // setErrorMessage(err.message)
                setSignOut(false)
                console.log(err)
            }
            // doSendEmailVerification()
        }
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            <MenuItem onClick={handleMenuClose}>{currentUser?.email}</MenuItem>
            <MenuItem onClick={(e) => {
                handleMenuClose(e)
                handleLogOut(e)
            }}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography style={{
                        cursor: 'pointer'
                    }} onClick={() => {
                        if (userLoggedIn) { history('/home') } else
                            history('/welcome')
                    }} className={classes.title} variant="h6" noWrap>
                        Clip & Snip: Your Barber Booking Buddy
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {
                            userLoggedIn && userType === 'MERCHANT' &&
                            <Button onClick={() => setAddBarberShops(true)} color="inherit">
                                <Typography>Add My Shop</Typography>
                            </Button>}
                        {
                            userLoggedIn && userType === 'CUSTOMER' &&
                            <Button onClick={() => setOpenMyBookings(true)} color="inherit">
                                <Typography>My Bookings</Typography>
                            </Button>}
                        {
                            userLoggedIn && userType === 'MERCHANT' &&
                            <Button onClick={() => setOpenMerchantProducts(true)} color="inherit">
                                <Typography>My Products</Typography>
                            </Button>}
                        {
                            userLoggedIn && userType === 'MERCHANT' &&
                            <Button onClick={() => setOpenAddProduct(true)} color="inherit">
                                <Typography>Add Products</Typography>
                            </Button>
                        }
                        {
                            userLoggedIn && userType === 'MERCHANT' &&
                            <Button onClick={() => setOpenMerchantBookings(true)} color="inherit">
                                <Typography>Bookings</Typography>
                            </Button>
                        }
                        {userLoggedIn ? <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton> :
                            <Flexbox gap={'10px'}>
                                <Button onClick={() => {
                                    history('/login')
                                }} color="inherit">
                                    <Typography>Login</Typography>
                                </Button>
                                <Button onClick={() => {
                                    history('/register')
                                }} color="inherit">
                                    <Typography>Register</Typography>
                                </Button>
                            </Flexbox>
                        }
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <AddProducts classes={classes} open={openAddProduct} handleClose={() => setOpenAddProduct(false)} />
            <UsersBooking open={openMyBookings} handleClose={() => setOpenMyBookings(false)} />
            <MerchantProduct open={openMerchantProducts} handleClose={() => setOpenMerchantProducts(false)} />
            <MerchantBookings open={openMerchantBookings} handleClose={() => setOpenMerchantBookings(false)} />
            <AddBarberShops open={addBarberShops} handleClose={() => setAddBarberShops(false)} />
        </div>
    );
}

