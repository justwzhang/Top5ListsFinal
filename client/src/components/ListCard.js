import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { list } = props;
    // const [list, setList] = useState(store.getListById(idNamePair._id))

    console.log(list)
    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
            // console.log(list)
        }
    }
    
    // function handleToggleEdit(event) {
    //     event.stopPropagation();
    //     toggleEdit();
    // }
    function handleOpenList(){

    }
    function handleToggleLike(){

    }
    function handleToggleDislike(){

    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    let editButton = <div/>
    if(!list.published){
        editButton = <Button variant="text">Edit</Button>
    }
    let cardElement =
        <ListItem
            id={list._id}
            key={list._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            button
            onClick={(event) => {
                handleLoadList(event, list._id)
            }
            }
            style={{
                fontSize: '20pt',
                width: '100%',
                borderRadius: "20px",
                backgroundColor: "white"
            }}
        >
                <Box sx={{ p: 1, flexGrow: 1 }}>{list.name} <br/> 
                    <div style={{fontSize: '10pt'}}>By: {list.ownerUser}</div><br/>
                    <Button variant="text">Edit</Button>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleLike} aria-label='edit'>
                        <ThumbUpOffAltIcon style={{fontSize:'30pt'}} />
                        <div style={{fontSize: '10pt'}}>{list.likes}</div>
                    </IconButton>

                    <IconButton onClick={handleToggleDislike} aria-label='edit'>
                        <ThumbDownOffAltIcon style={{fontSize:'30pt'}} />
                        <div style={{fontSize: '10pt'}}>{list.dislikes}</div>
                    </IconButton>

                    <IconButton onClick={(event) => {handleDeleteList(event, list._id)}} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'30pt'}} />
                    </IconButton>

                    <br/><div> Views:{list.views} 
                        <IconButton onClick={handleOpenList} aria-label='edit'>
                            <KeyboardArrowDownIcon style={{fontSize:'30pt', alignItems: "left"}} />
                        </IconButton>
                    </div>
                </Box>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + list._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={list.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;