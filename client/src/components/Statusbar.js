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
    let text ="";
    if (store.currentList)
        text = store.currentList.name;
    
    let statusbar = <div id="top5-statusbar"></div>
    if(auth.loggedIn){
        statusbar = <div id="top5-statusbar">
            <IconButton 
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
        </div>
    }else{
        statusbar = <div></div>
    }
    return (
        statusbar
    );
}

export default Statusbar;