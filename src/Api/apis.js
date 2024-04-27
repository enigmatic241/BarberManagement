import {
    BASE_URL,
    USER_BOOKINGS,
    USER_DETAILS,
    BARBER_DETAILS,
    BARBER_BOOKINGS,
    BARBER_SERVICES,
    BARBER_SHOPS,
    BARBER_PRODUCTS
} from "./API_CONSTANT";



export const addProductsOfShops = async (params) => {

    return await fetch(`${BASE_URL}${BARBER_PRODUCTS}`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const getBarberProducts = async () => {
    return await fetch(`${BASE_URL}${BARBER_PRODUCTS}`)
        .then(response => response.json())
        .then(data => {
            let products = [];
            for (let key in data) {
                products.push({
                    id: key,
                    ...data[key]
                });
            }
            return products;
        });
}

export const getShopBookings = async () => {
    return await fetch(`${BASE_URL}${BARBER_BOOKINGS}`)
        .then(response => response.json())
        .then(data => {
            let bookings = [];
            for (let key in data) {
                bookings.push({
                    id: key,
                    ...data[key]
                });
            }
            return bookings;
        });
}
//Users Related APIs
export const addUserBookings = async (params) => {
    return await fetch(`${BASE_URL}${USER_BOOKINGS}`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const getUsersBookings = async () => {
    return await fetch(`${BASE_URL}${USER_BOOKINGS}`)
        .then(response => response.json())
        .then(data => {
            let bookings = [];
            for (let key in data) {
                bookings.push({
                    id: key,
                    ...data[key]
                });
            }
            return bookings;
        });
}

export const addUserDetails = async (params) => {
    return await fetch(`${BASE_URL}${USER_DETAILS}`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const getUserDetails = async () => {
    return await fetch(`${BASE_URL}${USER_DETAILS}`)
        .then(response => response.json())
        .then(data => {
            let userDetails = [];
            for (let key in data) {
                userDetails.push({
                    id: key,
                    ...data[key]
                });
            }
            return userDetails;
        });
}

export const addShops = async (params) => {
    return await fetch(`${BASE_URL}${BARBER_SHOPS}`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const getBarberShops = async () => {
    return await fetch(`${BASE_URL}${BARBER_SHOPS}`)
        .then(response => response.json())
        .then(data => {
            let shops = [];
            for (let key in data) {
                shops.push({
                    id: key,
                    ...data[key]
                });
            }
            return shops;
        });
}
