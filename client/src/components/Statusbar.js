import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import {Fab, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    function handleCreateNewList() {
        store.createNewList();
    }
    let text =
    <div><IconButton 
        aria-label="add"
        id="add-list-button"
        onClick={handleCreateNewList}
        disabled = {store.currentList}
        >
            <AddIcon  style ={{
                fontSize: "40pt"
            }}/>
        </IconButton>
        Your Lists
    </div>;
    if (store.loadedPage === "COMMUNITY_LISTS")
        text = "Community Lists";
    else if(store.loadedPage === "USERS_LISTS")
        text = "Users Lists"
    else if(store.loadedPage === "ALL_LISTS")
        text = "All Lists"
    let statusbar = <div id="top5-statusbar"></div>
    if(auth.loggedIn){
        statusbar = <div id="top5-statusbar">
            {text}
        </div>
    }else{
        statusbar = <div></div>
    }
    return (
        statusbar
    );
}

export default Statusbar;