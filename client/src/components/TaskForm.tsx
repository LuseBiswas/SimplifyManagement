import { Button, colors, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "../api/api";

interface prop {
    setForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function TaskForm(props: prop) {
    const paperStyle = { padding: 20, height: 'auto', width: 400, margin: '20px auto', backgroundColor: "#eeeeee", color: "#fff" };
    const inputStyle = { margin: '20px 0px', borderColor: "black", color: "#fff" };
    const btnStyle = { margin: '10px 0px', backgroundColor: "orange", color: "white" };

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [dis, setDis] = useState(false);
    const [error, setError] = useState(false);
    const id: string = localStorage.getItem("id") || "";

    function handleSubmit() {
        if (title.length === 0 || desc.length === 0) {
            setError(true);
            return;
        }
        setDis(true);
        const data = new URLSearchParams({
            id: id,
            task: title,
            desc: desc
        });
        axiosInstance.post("api/task/new", data)
            .then(res => {
                console.log(res);
                props.setForm(false);
            })
            .catch((err) => { console.log(err); });
        setDis(false);
    }

    return (
        <Grid sx={{ margin: "50px auto" }}>
            <Paper elevation={10} style={paperStyle}>
                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5" noWrap component="div" style={{ marginBottom: "20px", color: "orange" }}>Create Task</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={title} type="text" variant="outlined" label={error ? "Required" : "Title"} style={inputStyle}
                            onChange={(e) => { setTitle(e.target.value); setError(false); }} fullWidth error={error} autoComplete="false"
                            InputLabelProps={{ style: { color: error ? "orange" : "green" } }}
                            InputProps={{ style: { color: "black" }, notchedOutline: { borderColor: "green" } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={desc} type="text" variant="outlined" label={error ? "Required" : "Description"} style={inputStyle}
                            onChange={(e) => { setDesc(e.target.value); setError(false); }} fullWidth multiline rows={5} error={error} autoComplete="false"
                            InputLabelProps={{ style: { color: error ? "orange" : "green" } }}
                            InputProps={{ style: { color: "black" }, notchedOutline: { borderColor: "green" } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained" fullWidth style={btnStyle} disabled={dis} onClick={handleSubmit}
                            sx={{
                                '&:hover': {
                                    backgroundColor: "green",
                                    color: "white",
                                },
                            }}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default TaskForm;
