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

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            
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
            store.setCurrentList(list._id);
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
    
    //base List for home lists unpublished
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
                backgroundColor: "beige"
            }}
        >
                <Box sx={{ p: 1, flexGrow: 1 }}>{list.name} <br/> 
                    <div style={{fontSize: '10pt'}}>By: {list.ownerUser}</div><br/>
                    <Button onClick={toggleEdit} variant="text">Edit</Button>
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
    //list item for home list that is published
    if(list.published){
        cardElement =
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
                    backgroundColor: "#d4d4f5"
                }}
            >
                    <Box sx={{ p: 1, flexGrow: 1 }}>{list.name} <br/> 
                        <div style={{fontSize: '10pt'}}>By: {list.ownerUser}</div><br/>
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
    }
    return (
        cardElement
    );
}

export default ListCard;