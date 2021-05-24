import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { Avatar, CardMedia } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import * as Constant from '../constants/constant';
import Item from './Item';
import Grid from "@material-ui/core/Grid";
import { spacing } from '@material-ui/system';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    appbar:{
        marginLeft:20,
        marginRight:20
    },
    textfield:{
        width:'55%',
        marginLeft:20,
        marginRight:20
    },
    image:{
        width:'100%',
        height:'10%'
    }
}));







export default function HomePage() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {Constant.appName}
                    </Typography>
                    
                    <TextField
                        variant='outlined'
                        type='search'
                        color='secondary'
                        placeholder='想要吃甚麼呢?'
                        size='small'
                        fullWidth
                        className={classes.textfield}
                    ></TextField>
                    <Grid direction='row' className={classes.appbar} >
                        {Constant.appBarList.map((text,index)=>(
                            <Button 
                                startIcon={Constant.appBarListIcon[index]}
                                style={{color:'white'}}
                                >
                            {text}
                        </Button>))}
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {Constant.menuList.map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{Constant.menuListIcon[index]}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main
            style={{backgroundColor:'#D0D0D0'}}
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
            {/* <img className={classes.image} src='https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vbWVkaWEucmJsLm1zL2ltYWdlP3U9JTJGZmlsZXMlMkYyMDE2JTJGMDUlMkYyMiUyRjYzNTk5NDcyMTA1MTk1ODg2MS0xMDg0MjU1Mjk1X2Nyb3AuanBnJmhvPWh0dHBzJTNBJTJGJTJGYXo2MTY1Nzgudm8ubXNlY25kLm5ldCZzPTg2NiZoPTI2ZDVmMTBlMGQxMzZhOTc2YWViNGRkNDYyMTk3MDkwNzZmNzIyZjM2ZDcxMmY3NjIyMjQ5ZGFmNzlkNDk0YTAmc2l6ZT05ODB4JmM9MTM0MDkxOTU3MiIsImV4cGlyZXNfYXQiOjE2MzE1MTM5NzJ9.idTx2deZRZAJjxVg_urOgysJKBzw1K27Z0CXWkvPeQA/img.jpg?width=1200&height=628' alt='not wasting food'/> */}
                <Grid container direction='row'>
                    {Constant.testData.map((item, index) => (
                        <Box mt={8} mx={2} >
                            <Item props={item} key={index} />
                        </Box>
                        ))}
                </Grid>
            </main>
        </div>
    );
}
