import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function RoomJoinPage() {
  const [roomcode, setRoomcode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleRoomcodeChange(e) {
    setRoomcode(e.target.value);
  }
  async function handleRoombuttonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomcode,
        // error: error,
      }),
    };

    try {
      const response = await fetch("/api/join-room", requestOptions);
      const data = await response.json();
      console.log("Room joined: ", data);
      navigate(`/room/${data.code}`);
    } catch (error) {
      setError("Room not found");
      console.error("Error joining room:", error);
    }
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomcode}
          helperText={error}
          variant="outlined"
          onChange={handleRoomcodeChange}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleRoombuttonPressed}
        >
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
