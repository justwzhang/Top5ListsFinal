import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api, { createCommunityList } from '../api'
import MoveItem_Transaction from '../transactions/MoveItem_Transaction'
import UpdateItem_Transaction from '../transactions/UpdateItem_Transaction'
import AuthContext from '../auth'
import { fabClasses } from '@mui/material'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    PUBLISHABLE: "PUBLISHABLE",
    SAVE_LIST: "SAVE_LIST"
}

export const LoadedPageType = {
    HOME_LISTS: "HOME_LISTS",
    ALL_LISTS: "ALL_LISTS",
    USERS_LISTS: "USERS_LISTS",
    COMMUNITY_LISTS: "COMMUNITY_LISTS"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        allLists: [],
        viewedLists: [],
        communityListKeyNamePairs:[],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
        isDeleteModalOpen: false,
        publishable: false,
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    allLists: payload.allLists,
                    viewedLists: payload.viewedLists,
                    communityListKeyNamePairs:store.communityListKeyNamePairs,
                    currentList: payload.top5List,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    isDeleteModalOpen: false,
                    publishable: false,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    allLists: store.allLists,
                    viewedLists: store.viewedLists,
                    communityListKeyNamePairs:store.communityListKeyNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    isDeleteModalOpen: false,
                    publishable: false,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    allLists: store.allLists,
                    viewedLists: store.viewedLists,
                    communityListKeyNamePairs:store.communityListKeyNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    isDeleteModalOpen: false,
                    publishable: false,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    allLists: payload.allLists,
                    viewedLists: payload.owned,
                    communityListKeyNamePairs:payload.pairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    isDeleteModalOpen: false,
                    publishable: false,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    allLists: store.allLists,
                    viewedLists: store.viewedLists,
                    communityListKeyNamePairs:store.communityListKeyNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload,
                    isDeleteModalOpen: true,
                    publishable: false,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    allLists: store.allLists,
                    viewedLists: store.viewedLists,
                    communityListKeyNamePairs:store.communityListKeyNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    isDeleteModalOpen: false,
                    publishable: false,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    allLists: store.allLists,
                    viewedLists: store.viewedLists,
                    communityListKeyNamePairs:store.communityListKeyNamePairs,
                    currentList: payload.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    isDeleteModalOpen: false,
                    publishable: payload.publishable,
                });
            }
            // Saving the current list
            case GlobalStoreActionType.SAVE_LIST: {
                return setStore({
                    allLists: payload.allLists,
                    viewedLists: payload.owned,
                    communityListKeyNamePairs:store.communityListKeyNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: payload,
                    listMarkedForDeletion: null,
                    isDeleteModalOpen: false,
                    publishable: false,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.PUBLISHABLE: {
                return setStore({
                    allLists: store.allLists,
                    viewedLists: store.viewedLists,
                    communityListKeyNamePairs:store.communityListKeyNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    isDeleteModalOpen: false,
                    publishable: payload,
                });
            }
            default:
                return store;
        }
    }

//not needed anymore
    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            try{
                const response = await api.getAllTop5Lists();
                if (response.data.success) {
                    let listOfLists = response.data.data;
                    let ownedLists =[];
                    listOfLists.map((list) => {
                        if(list.ownerUser === auth.user.userName){
                            ownedLists = [...ownedLists, list];
                        } 
                    });
                    storeReducer({
                        type: GlobalStoreActionType.SAVE_LIST,
                        payload: {
                            allLists:listOfLists,
                            owned:ownedLists
                        }
                    });
                }
            }catch(err){

            }
            
        }
    }

    store.saveCurrentList = function(){
        store.updateCurrentList();
    }

    store.publishCurrentList = function(){
        store.currentList.published = true;
        let tempList = store.currentList;
        store.saveCurrentList();
        let thePair = 1
        if(store.communityListKeyNamePairs.length > 0 ){
            store.communityListKeyNamePairs.map((pair) => {
                if(pair.name === tempList.name){
                    thePair = pair
                }
            })  
        }
        if(thePair === 1){
            let string0 = tempList.items[0];
            let string1 = tempList.items[1];
            let string2 = tempList.items[2];
            let string3 = tempList.items[3];
            let string4 = tempList.items[4];
            const date = new Date()
            const now = [date.getMonth(), date.getDate(), date.getFullYear()]
            let newItems = [{item: string0, votes:5},
                {item: string1, votes:4},
                {item: string2, votes:3},
                {item: string3, votes:2},
                {item: string4, votes: 1}]
            let tempVotes = [5, 4, 3, 2, 1]
            let payload = {
                name: tempList.name,
                items: tempList.items,
                votes: tempVotes,
                date: now,
                views: 0,
                likes: 0,
                dislikes: 0,
                peopleLiked: [],
                peopleDisliked: [],
                commentsUser: [],
                commentsString: []
            };
            createCommunityList(payload)
        }else{
            updateCommunityListWithNew(tempList, thePair._id)
        }
        async function updateCommunityListWithNew(list, comListId){
            let response = await api.getCommunityListById(comListId)
                if(response.data.success){
                    let comList = response.data.communityList
                    let comListItems = comList.items
                    let comVotes = comList.votes
                    let newItems = list.items
                    for(let i=0; i<newItems.length; i++){
                        let tempItem = newItems[i];
                        let test = false
                        for(let j=0; j<comListItems.length; j++){
                            let comItem = comListItems[j];
                            if(comItem=== tempItem){
                                let newVotes = comVotes[j] + (5-i)
                                comList.votes[j] = newVotes
                                test = true
                            }
                        }
                        if(!test){
                            let tempItems = comList.items
                            let tempVotes = comList.votes
                            comList.items = [...tempItems, tempItem]
                            comList.votes = [...tempVotes, 5-i]
                        }
                    }
                    store.sortCommunityList(comList)
                }
            
        }
        async function createCommunityList(list){
            let response = await api.createCommunityList(list)
            if(response.data.success){
                store.loadIdNamePairs()
            }
        }
    }

    store.sortCommunityList = function(list){
        let items = list.items
        let votes = list.votes
        for(let i=0; i<list.items.length; i++){
            for(let j=0; j<list.items.length-i-1; j++){
                if(list.votes[j] < list.votes[j+1]){
                    let tempItem = list.items[j]
                    let tempVote = list.votes[j]
                    list.items[j] = list.items[j+1]
                    list.items[j+1] = tempItem
                    list.votes[j] = list.votes[j+1]
                    list.votes[j+1] = tempVote
                }
            }
        }
        store.saveCommunityList(list)
    }

    store.saveCommunityList= async function(list) {
        const response = await api.updateCommunityListById(list._id, list);
        if (response.data.success) {

        }
    }

    store.updateCurrentListName = function(text){
        this.currentList.name = text;
        if(store.validateList(store.currentList)){
            storeReducer({
                type:GlobalStoreActionType.PUBLISHABLE,
                payload:true
            })
        }else{
            storeReducer({
                type:GlobalStoreActionType.PUBLISHABLE,
                payload:false
            })
        }
    }
    store.updateCurrentListItem = function(index, text){
        this.currentList.items[index] = text;
        if(store.validateList(store.currentList)){
            storeReducer({
                type:GlobalStoreActionType.PUBLISHABLE,
                payload:true
            })
        }else{
            storeReducer({
                type:GlobalStoreActionType.PUBLISHABLE,
                payload:false
            })
        }
    }

    store.validateList = function (list){
        let regex = /^[a-z0-9]+$/i;
        if(!regex.test(list.name.charAt(0))){
            return false
        }
        for(let i = 0; i < 5; i++){
            if(!regex.test(list.items[i].charAt(0))){
                return false
            }
        }
        return true
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    store.itemEditActive = function (bool){
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: bool
        });
    }

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if(top5List.ownerEmail === auth.user.email){
                if(top5List.name !== newName){
                    top5List.name = newName;
                    async function updateList(top5List) {
                        response = await api.updateTop5ListById(top5List._id, top5List);
                        if (response.data.success) {
                            store.loadIdNamePairs()
                            
                            
                        }
                    }
                    updateList(top5List);
                }
            }
        }
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        tps.clearAllTransactions();
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        const date = new Date()
        const now = [date.getMonth(), date.getDate(), date.getFullYear()]
        let payload = {
            name: newListName,
            items: ["", "", "", "", ""],
            ownerUser: auth.user.userName,
            date: now,
            views: 0,
            likes: 0,
            dislikes: 0,
            published: false,
            peopleLiked: [],
            peopleDisliked: [],
            comments: [],
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            tps.clearAllTransactions();
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            //history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {
        try{
        const response = await api.getAllTop5Lists();
        if (response.data.success) {
            let listOfLists = response.data.data;
            let ownedLists =[];
            listOfLists.map((list) => {
                if(list.ownerUser === auth.user.userName){
                    ownedLists = [...ownedLists, list];
                } 
            });
            try{
                const response2 = await api.getCommunityListPairs();
                if(response2.data.success){
                    let communityPairs = response2.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                        payload: {
                            allLists:listOfLists,
                            owned:ownedLists,
                            pairs:communityPairs
                        }
                    });
                }
            }catch(err2){
                console.log("error")
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: {
                        allLists:listOfLists,
                        owned:ownedLists,
                        pairs:[]
                    }
                });
            }
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
        }catch(err){

        }
    }

    store.getListById = async function(id){
        let response = await api.getTop5ListById(id);
            if (response.data.success) {
                let top5List = response.data.top5List;
                console.log(top5List)
                return top5List;
            }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        if(listToDelete.ownerUser === auth.user.userName){
            let response = await api.deleteTop5ListById(listToDelete._id);
            if (response.data.success) {
                store.loadIdNamePairs();
                history.push("/");
                store.unmarkListForDeletion();
            }
        }else{
            store.unmarkListForDeletion();
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if(top5List.ownerUser === auth.user.userName){
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    let publish = store.validateList(top5List);
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: {
                            currentList:top5List,
                            publishable: publish
                        }
                    });
                    //history.push("/top5list/" + top5List._id);
                    console.log("test")
                }
            }
        }
    }

    store.addMoveItemTransaction = function (start, end) {
        let transaction = new MoveItem_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    store.addUpdateItemTransaction = function (index, newText) {
        let oldText = store.currentList.items[index];
        let transaction = new UpdateItem_Transaction(store, index, oldText, newText);
        tps.addTransaction(transaction);
    }

    store.moveItem = function (start, end) {
        start -= 1;
        end -= 1;
        if (start < end) {
            let temp = store.currentList.items[start];
            for (let i = start; i < end; i++) {
                store.currentList.items[i] = store.currentList.items[i + 1];
            }
            store.currentList.items[end] = temp;
        }
        else if (start > end) {
            let temp = store.currentList.items[start];
            for (let i = start; i > end; i--) {
                store.currentList.items[i] = store.currentList.items[i - 1];
            }
            store.currentList.items[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }

    store.undo = function () {
        tps.undoTransaction();
    }

    store.redo = function () {
        tps.doTransaction();
    }

    store.canUndo = function() {
        return tps.hasTransactionToUndo();
    }

    store.canRedo = function() {
        return tps.hasTransactionToRedo();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };