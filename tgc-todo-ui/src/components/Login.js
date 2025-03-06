import { Button, Grid2, Paper, TextField } from "@mui/material";
import axios from "axios";
import { use, useState } from "react";
import {useNavigate} from "react-router";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try{
            const response = await axios.post("http://localhost:8080/login", {
                username: username,
                password: password
            });
            console.log(response);
            if (response.status === 200)
                navigate("/dashboard");
            else if (response.status === 401)
                setError("Invalid credentials");
            else
                setError("Login Failed");
        } catch (error) {
            setError("Login Failed");
        }
    }

    return (
        <div style={{ padding: 30 }}>
            <Paper>
                <Grid2 container direction={"column"} spacing={3} justifyContent={"center"} alignItems={"center"}>
                    <Grid2>
                        <TextField label="Username" value={username} onChange={ (e) => setUsername(e.target.value)} required/>
                    </Grid2>
                    <Grid2>
                        <TextField label="Password" value={password} onChange={ (e) => setPassword(e.target.value)} />
                    </Grid2>
                    <Grid2>
                        <Button onClick={(e)=> handleLogin(e)}>Login</Button>
                    </Grid2>
                    <Grid2>
                        <label>{error}</label>
                    </Grid2>
                </Grid2>
            </Paper>
        </div>
    );
}

export default Login;