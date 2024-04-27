import { Typography } from '@material-ui/core'
import { Flexbox } from '../../../styled-component'
import React, { useEffect } from 'react'
import { getBarberShops } from '../../../Api/apis'
import { useAuth } from '../../../Context/AuthContext'


const MerchantHome = () => {

    const [myShop, setMyShop] = React.useState([])
    const { currentUser } = useAuth()

    const handleGetMyShop = async () => {
        const response = await getBarberShops()
        if (response) {
            const filterShop = response.filter(item => item.owner === currentUser.email)
            setMyShop(filterShop)
        }
    }
    useEffect(() => { handleGetMyShop() }, [])

    return (
        <Flexbox dir={'column'} align={'center'} justify={'center'} margin={'64px 0'} gap={'16px'}>
            <Typography variant='h4' style={{ color: 'white' }}>My Shops</Typography>
            <Flexbox dir={'column'} align={'center'} justify={'center'} gap={'16px'}>
                {
                    myShop.map((shop, index) => {
                        return (
                            <ShopCard key={index} shopName={shop.name} ShopAddress={shop.address} phone={shop.phone} />
                        )
                    })
                }
            </Flexbox>
        </Flexbox>
    )
}


const ShopCard = ({ shopName, ShopAddress, phone }) => {
    return (
        <Flexbox pad={'22px'} width={'50vw'} dir={'column'} gap={'8px'} bColor={'white'} style={{ border: '1px solid lightgray', borderRadius: '5px' }}>
            <Typography>Shop Name : {shopName}</Typography>
            <Typography>Shop Address:{ShopAddress}</Typography>
            <Typography>Shop Phone:{phone}</Typography>
        </Flexbox>
    )
}

export default MerchantHome