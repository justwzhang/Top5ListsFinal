import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'


export default function SplashScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const history = useHistory();
    function login(){
        history.push("/login/");
    }
    function create(){
        history.push("/register/");
    }
    function guest(){
        const user = {
            email: "Guest@guest.com",
            password: "password",
            user:"Guest"
        }
        auth.continueAsGuest(user, store)

    }
    return (
        <div id="splash-screen">
            <h1 style={{color:"black"}}>The Top 5 Lister</h1>
            <h4 style={{color:"black"}}>A tool to keep track of your 5 favorite things from just about anything</h4>
            <h7 style={{color:"black"}}>Developed by <br/>
            Justin Zhang</h7><br/>
            <Box display="flex" justifyContent="space-between">
                <Button
                    style={{
                        borderRadius: 35,
                        backgroundColor: "#e0e0e0",
                        fontSize: "24px",
                        color: "black"
                    }}
                    id='undo-button'
                    onClick={create}
                    variant="contained">
                        Create Account
                </Button>
                <Button
                    style={{
                        borderRadius: 35,
                        backgroundColor: "#e0e0e0",
                        fontSize: "24px",
                        color: "black"
                    }}
                    id='undo-button'
                    onClick={login}
                    variant="contained">
                        Log In
                </Button>
                <Button
                    style={{
                        borderRadius: 35,
                        backgroundColor: "#e0e0e0",
                        fontSize: "24px",
                        color: "black"
                    }} 
                    id='undo-button'
                    onClick={guest}
                    variant="contained">
                        Continue As Guest
                </Button>
            </Box>
        </div>
    )
}