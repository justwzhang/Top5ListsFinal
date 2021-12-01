import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import FunctionsIcon from '@mui/icons-material/Functions';
import MenuIcon from '@mui/icons-material/Menu';
import {DeleteModal} from '.';
import {Statusbar} from '.';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}
            style ={{
                backgroundColor: "#c4c4c4"
            }}
            >
            {
                store.viewedLists.map((list) => (
                    <ListCard
                        key={list._id}
                        list={list}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
           <div id="list-selector-heading-left">
               <IconButton>
                    <HomeIcon style ={{
                    fontSize: "35pt"
                }}/>
               </IconButton>
               <IconButton>
                   <PeopleIcon style ={{
                    fontSize: "35pt"
                }}/>
               </IconButton>
               <IconButton>
                   <PersonIcon style ={{
                    fontSize: "35pt"
                }}/>
               </IconButton>
               <IconButton>
                   <FunctionsIcon style ={{
                    fontSize: "35pt"
                }}/>
               </IconButton>
               <TextField label="Search" size="small" style ={{width: 600, backgroundColor:"white", top: "15%"}}></TextField>
        
            </div>
            <div id="list-selector-heading-right">
                Sort By
                <IconButton>
                   <MenuIcon style ={{
                    fontSize: "35pt"
                }}/>
               </IconButton>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>)
}

export default HomeScreen;