import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import FunctionsIcon from '@mui/icons-material/Functions';
import MenuIcon from '@mui/icons-material/Menu';
import {DeleteModal} from '.';
import {Statusbar} from '.';
import Top5Item from './Top5Item.js'
import Button from '@mui/material/Button';
import AuthContext from '../auth'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    function handleSave(){
        store.saveCurrentList()
    }
    function handlePublish(){
        store.publishCurrentList()
    }
    function handleUpdateText(event){
        store.updateCurrentListName(event.target.value)
    }

    function handleHome(){
        store.changeToHome()
    }
    function handleAllList(){
        store.changeToAllLists()
    }
    function handleUserList(){
        store.changeToUsers()
    }
    function handleCommunity(){
        store.changeToCommunity()
    }

    const handleProfileMenuOpen = (event) =>{
        setAnchorEl(event.currentTarget);
    };

    function handleMenuClose() {
        setAnchorEl(null);
    };
    function sortPublishNew(){
        setAnchorEl(null);
        store.sortPublishNew();
    }
    function sortPublishOld(){
        setAnchorEl(null);
        store.sortPublishOld();
    }
    function sortViews(){
        setAnchorEl(null);
        store.sortViews();
    }
    function sortLikes(){
        setAnchorEl(null);
        store.sortLikes();
    }
    function sortDislikes(){
        setAnchorEl(null);
        store.sortDislikes();
    }
    function handleUpdateSearchText(event){
        let text = event.target.value;
        store.search(text)
    }
    const menu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id="sort-by"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={sortPublishNew}>Publish Date (Newist)</MenuItem>
            <MenuItem onClick={sortPublishOld}>Publish Date (oldest)</MenuItem>
            <MenuItem onClick={sortViews}>Views</MenuItem>
            <MenuItem onClick={sortLikes}>Likes</MenuItem>
            <MenuItem onClick={sortDislikes}>Dislikes</MenuItem>
        </Menu>
    );

    let workspace = "";
    //For listing all lists
    if (store) {
        workspace = 
            <div id="list-selector-list">
                <List sx={{ width: '90%', left: '5%' }} style ={{backgroundColor: "#c4c4c4"}}>
                {
                    store.viewedLists.map((list) => (
                        <ListCard
                            key={list._id}
                            list={list}
                            selected={false}
                        />
                    ))
                }
                </List>
            </div>
    }
    //for editing a single list
    if(store.currentList){
        workspace = 
            <div id="list-workspace-list">
                
                <Box sx={{ width: '90%', left: '5%', height:'90%' }} style ={{backgroundColor: "#d4d4f5", borderRadius: "10px", left:"5%"}}>
                <TextField 
                    label="List Name" 
                    size="small" 
                    defaultValue = {store.currentList.name}
                    style ={{width: 400, backgroundColor:"white", left:"5%"}}
                    onChange={handleUpdateText}>
                </TextField>

                    <List sx={{ width: '90%', left: '5%', height:'80%' }} style ={{backgroundColor: "#e0e0e0", borderRadius: "10px", left:"5%", top: "1%"}}>
                        <Top5Item 
                            key={'top5-item-' + (1)}
                            text={store.currentList.items[0]}
                            index={0} 
                        />
                        <Top5Item 
                            key={'top5-item-' + (2)}
                            text={store.currentList.items[1]}
                            index={1} 
                        />
                        <Top5Item 
                            key={'top5-item-' + (3)}
                            text={store.currentList.items[2]}
                            index={2} 
                        />
                        <Top5Item 
                            key={'top5-item-' + (4)}
                            text={store.currentList.items[3]}
                            index={3} 
                        />
                        <Top5Item 
                            key={'top5-item-' + (5)}
                            text={store.currentList.items[4]}
                            index={4} 
                        />
                    </List>
                    <div style={{
                        float: "right",
                    }}>
                        <Button
                            style={{
                                borderRadius: 15,
                                backgroundColor: "#e0e0e0",
                                fontSize: "16px",
                                color: "black"
                            }} 
                            id='save-button'
                            onClick={handleSave}
                            variant="contained">
                            Save
                        </Button>
                        <Button
                            style={{
                                borderRadius: 15,
                                backgroundColor: "#e0e0e0",
                                fontSize: "16px",
                                color: "black"
                            }} 
                            id='publish-button'
                            disabled={!store.publishable}
                            onClick={handlePublish}
                            variant="contained">
                            Publish
                        </Button>
                    </div>
                </Box>
            </div>

    }
    return (
        <div id="top5-list-selector">
           <div id="list-selector-heading-left">
               <DeleteModal/>
               <IconButton disabled = {store.currentList || auth.isGuest} onClick = {handleHome}>
                    <HomeIcon style ={{
                    fontSize: "35pt"
                }}/>
               </IconButton>
               <IconButton disabled = {store.currentList} onClick = {handleAllList}>
                   <PeopleIcon style ={{
                    fontSize: "35pt"
                }}/>
               </IconButton>
               <IconButton disabled = {store.currentList} onClick = {handleUserList}>
                   <PersonIcon style ={{
                    fontSize: "35pt"
                }}/>
               </IconButton>
               <IconButton disabled = {store.currentList} onClick = {handleCommunity}>
                   <FunctionsIcon style ={{
                    fontSize: "35pt"
                }}/>
               </IconButton>
               <TextField 
                    label="Search" 
                    size="small" 
                    style ={{width: 600, backgroundColor:"white", top: "15%"}} 
                    disabled = {store.currentList}
                    onChange={handleUpdateSearchText}>
                    </TextField>
        
            </div>
            <div id="list-selector-heading-right">
                Sort By
                <IconButton disabled = {store.currentList} onClick = {handleProfileMenuOpen}>
                   <MenuIcon style ={{fontSize: "35pt"}}/>
               </IconButton>
               
            </div>
            {menu}
                {workspace}
        </div>)
}

export default HomeScreen;