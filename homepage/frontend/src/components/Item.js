
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { Avatar, CardMedia } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import * as Constant from '../constants/constant';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyle = makeStyles((thems)=>({
    card:{
        width:250,
        height:450,

    },
    media:{
        width:'100%',
        height:'50%',
    },
    button:{
        border:'1px solid',
        padding:2,
        marginLeft:10
    },
    header:{

    },
    box:{
        textAlign:'center',
        fontSize:18,
        width:'50%',
    },
    smallBox:{
        height:'100%',
        textAlign:'center',
        width:'50%',
    },
    
}))

const Item = ({ props }) => {
    const {productName,onSalePrice,originalPrice,address,imageUrl,avatarUrl,traderName,discription,expirationDate,quantity} = props;
    const classes = useStyle();
    return (
        <>
            <Card className={classes.card}>
                <CardHeader
                    className={classes.header}
                    avatar={<Avatar src={avatarUrl} />}
                    action={
                        <IconButton aria-label="settings">
                        </IconButton>
                    }
                    title={productName}
                    subheader={traderName}
                />
                 <Grid container direction='row' alignContent='center'>
                    <Box className={classes.smallBox} style={{backgroundColor:'#BBFFFF'}}>到期日</Box>
                    <Box className={classes.smallBox} style={{backgroundColor:'#B9B9FF'}}>價格</Box>
                </Grid>
                <Grid container direction='row' alignContent='center'>
                    <Box className={classes.box} style={{backgroundColor:'#D9FFFF'}}>{expirationDate}</Box>
                    <Box className={classes.box} style={{backgroundColor:'#DDDDFF'}}>{onSalePrice}</Box>
                </Grid>
                <CardMedia className={classes.media} image={imageUrl} />
                <CardContent>
                    <Typography variant="body2" component="p">
                        {address}
                    </Typography>
                </CardContent>
                <Grid direction='row' spacing={2}>
                    <Button className={classes.button} size="small" color='secondary' >
                        加入<ShoppingCartIcon/>
                    </Button>
                    <Button className={classes.button} size="small">
                        <RoomIcon/>前往
                    </Button>
                    <Button size="small" disabled={true} style={{textAlign:'center',color:'gray',fontSize:8}}>剩餘數量：{quantity}</Button>
                </Grid>
                    
                
            </Card>
        </>
    );
}

export default Item;