import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
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
import List from '@mui/material/List';


/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const { list } = props;
    const [liked, setLiked] = useState(list.peopleLiked.includes(auth.user.userName))
    const [disliked, setDisliked] = useState(list.peopleDisliked.includes(auth.user.userName))
    const dateString = getString()
    let color = "beige"
    // const [list, setList] = useState(store.getListById(idNamePair._id))
    let comments = ""
    let pairs = []
    if(list.commentsUser.length>0)
        loadCommentPairs()
    
    function loadCommentPairs(){
        for(let i=0; i<list.commentsUser.length; i++){
            pairs = [...pairs, {user: list.commentsUser[i], comment: list.commentsString[i]}];
        }
        
        comments = 
        
            pairs.map((pair)=>(
                
                <Box style={{fontSize:"20pt",backgroundColor:"#e0e0e0", marginTop:"1rem", borderRadius: "20px", overflowWrap:"break-word"}}>
                    <div style={{fontSize:"12pt", left:"2%"}}>{pair.user}</div>
                    <div style ={{left:"2%", top:"3%"}}>{pair.comment}</div>
                </Box>
            ))
        
    }

    function getString(){
        let dateArray = list.date;
        let month = months[dateArray[0]];
        let date = month + " " + dateArray[1].toString() + ", " + dateArray[2].toString()
        return date
    }

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            console.log(isOpen)
            // console.log(list)
        }
    }
    
    // function handleToggleEdit(event) {
    //     event.stopPropagation();
    //     toggleEdit();
    // }
    function handleCloseList(){
        setIsOpen(false)
        setText("")
    }

    function handleOpenList(){
        store.increaseView(list);
        setIsOpen(true)
    }
    function handleToggleLike(){
        store.likeList(list);
        setLiked(!liked);
    }
    function handleToggleDislike(){
        store.dislikeList(list);
        setDisliked(!disliked);
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
            if(text !== ""){
                store.comment(list, text);
                setText("")
            }
            
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let likeButton =
    <IconButton onClick={handleToggleLike} aria-label='edit' disabled={!list.published && store.loadedPage !== "COMMUNITY_LISTS" || disliked}>
        <ThumbUpOffAltIcon style={{fontSize:'30pt'}} />
        <div style={{fontSize: '10pt'}}>{list.likes}</div>
    </IconButton>

    let dislikeButton = 
    <IconButton onClick={handleToggleDislike} aria-label='edit' disabled={!list.published && store.loadedPage !== "COMMUNITY_LISTS" || liked}>
        <ThumbDownOffAltIcon style={{fontSize:'30pt'}} />
        <div style={{fontSize: '10pt'}}>{list.dislikes}</div>
    </IconButton>
    if(liked){
        likeButton =
    <IconButton onClick={handleToggleLike} aria-label='edit' disabled={!list.published && store.loadedPage !== "COMMUNITY_LISTS" || disliked}>
        <ThumbUpAltIcon style={{fontSize:'30pt'}} />
        <div style={{fontSize: '10pt'}}>{list.likes}</div>
    </IconButton>
    }

    if(disliked){
        dislikeButton = 
        <IconButton onClick={handleToggleDislike} aria-label='edit' disabled={!list.published && store.loadedPage !== "COMMUNITY_LISTS" || liked}>
            <ThumbDownAltIcon style={{fontSize:'30pt'}} />
            <div style={{fontSize: '10pt'}}>{list.dislikes}</div>
        </IconButton>
    }
    let createdBy = <div style={{fontSize: '10pt'}}>By: {list.ownerUser}</div>
    let deleteButton = 
    <IconButton onClick={(event) => {handleDeleteList(event, list._id)}} aria-label='delete'>
        <DeleteIcon style={{fontSize:'30pt'}} />
    </IconButton>
    if(store.loadedPage === "COMMUNITY_LISTS"||store.loadedPage === "USERS_LISTS"||store.loadedPage === "ALL_LISTS"){
        deleteButton = ""
        if(store.loadedPage === "COMMUNITY_LISTS"){
            createdBy = ""
        }
    }
    let decider = <Button onClick={toggleEdit} variant="text">Edit</Button>
    if(list.published || store.loadedPage === "COMMUNITY_LISTS"){
        color = "#d4d4f5"
        decider = <div style={{fontSize: '10pt'}}>Date: {dateString}</div>
    }
    let card = 
    <List style={{fontSize:"30px", left:"2%"}}>
        <Box style={{ marginBottom: "1rem"}}>
            1. {list.items[0]}
        </Box>
        <Box style={{ marginBottom: "1rem"}}>
            2. {list.items[1]}
        </Box>
        <Box style={{ marginBottom: "1rem"}}>
            3. {list.items[2]}
        </Box>
        <Box style={{ marginBottom: "1rem"}}>
            4. {list.items[3]}
        </Box>
        <Box style={{ marginBottom: "1rem"}}>
            5. {list.items[4]}
        </Box>
    </List>
    if(store.loadedPage === "COMMUNITY_LISTS"){
        card = 
            <List style={{fontSize:"24px", left:"2%"}}>
                <Box style={{marginBottom: "0.4rem"}}>
                    1. {list.items[0]}<br/>
                    <div style={{fontSize:"16px"}}>{list.votes[0]} votes</div>
                </Box>
                <Box style={{ marginBottom: "0.4rem"}}>
                    2. {list.items[1]}<br/>
                    <div style={{fontSize:"16px"}}>{list.votes[1]} votes</div>
                </Box>
                <Box style={{ marginBottom: "0.4rem"}}>
                    3. {list.items[2]}<br/>
                    <div style={{fontSize:"16px"}}>{list.votes[2]} votes</div>
                </Box>
                <Box style={{ marginBottom: "0.4rem"}}>
                    4. {list.items[3]}<br/>
                    <div style={{fontSize:"16px"}}>{list.votes[3]} votes</div>
                </Box>
                <Box style={{ marginBottom: "0.4rem"}}>
                    5. {list.items[4]}<br/>
                    <div style={{fontSize:"16px"}}>{list.votes[4]} votes</div>
                </Box>
            </List>
    }
    //base List for unpublished lists
    let cardElement =
        <ListItem
            id={list._id}
            key={list._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            onClick={(event) => {
                handleLoadList(event, list._id)
            }
            }
            style={{
                fontSize: '20pt',
                width: '100%',
                borderRadius: "20px",
                backgroundColor: color
            }}
        >
                <Box sx={{ p: 1, flexGrow: 1 }}>{list.name} <br/> 
                    {createdBy}<br/>
                    {decider}
                </Box>
                <Box sx={{ p: 1 }}>
                    {likeButton}

                    {dislikeButton}

                    {deleteButton}

                    <br/><div> Views:{list.views} 
                        <IconButton onClick={handleOpenList} aria-label='edit'>
                            <KeyboardArrowDownIcon style={{fontSize:'30pt', alignItems: "left"}} />
                        </IconButton>
                    </div>
                </Box>
        </ListItem>

    if(isOpen){
    cardElement =
    <ListItem
        id={list._id}
        key={list._id}
        sx={{ marginTop: '15px', display: 'flex', p: 1 }}
        style={{
            fontSize: '20pt',
            width: '100%',
            height: "325pt",
            borderRadius: "20px",
            backgroundColor: color
        }}
    >
        <Box sx={{ p: 1, flexGrow: 1 }}>
                <div id="open-list-left" >{list.name} <br/> 
                    {createdBy}
                </div>
                <div id="open-list-right" style={{}}>
                <IconButton onClick={handleToggleLike} aria-label='edit'>
                    <ThumbUpOffAltIcon style={{fontSize:'30pt'}} />
                    <div style={{fontSize: '10pt'}}>{list.likes}</div>
                </IconButton>
                <IconButton onClick={handleToggleDislike} aria-label='edit'>
                    <ThumbDownOffAltIcon style={{fontSize:'30pt'}} />
                    <div style={{fontSize: '10pt'}}>{list.dislikes}</div>
                </IconButton>
                    {deleteButton}
                </div>
                <Box display="flex" justifyContent="space-between" style={{top:"20%", height:"60%", position:"absolute", width:"95%", maxWidth:"100%"}}>
                    <Box style={{backgroundColor:"#e0e0e0", width:"50%", borderRadius: "20px"}}>
                        {card}
                    </Box>
                    <Box style={{ width:"45%", display:"inline-block", left:"50%", overflowY: "scroll"}}>
                        <TextField 
                            label="Comment" 
                            size="small" 
                            value={text}
                            disabled={!list.published && store.loadedPage !== "COMMUNITY_LISTS"}
                            style ={{width: "90%", backgroundColor:"white"}}
                            onChange={handleUpdateText}
                            onKeyPress={handleKeyPress}>
                        </TextField>
                        <List>
                            {comments}
                        </List>
                    </Box>
                </Box>
                <Box style={{position:"absolute", left:"5%", marginRight:"auto", top:"90%"}}>
                    {decider}
                </Box>
                <Box style={{position:"absolute", left:"85%", marginRight:"auto", top:"90%"}}>
                    Views : {list.views}
                    <IconButton onClick={handleCloseList} aria-label='edit'>
                        <KeyboardArrowUpIcon  style={{fontSize:'20pt'}} />
                    </IconButton>
                </Box>
        </Box>
    </ListItem>
}
    return (
        cardElement
    );
}

export default ListCard;