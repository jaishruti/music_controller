import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material"; // Use @mui instead of @material-ui/core

export default function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    async function fetchUserRoom() {
      try {
        const response = await fetch("/api/user-in-room");
        const data = await response.json();
        setRoomCode(data.code);
      } catch (error) {
        console.error("Error fetching user room:", error);
      }
    }
    
    fetchUserRoom();
  }, []);

  return (
    <Router>
      {roomCode ? <Redirect to={`/room/${roomCode}`} /> : <HomeScreen />}
      <Routes>
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  );
}

function HomeScreen() {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} align="center">
        <Typography variant="h3">House Party</Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation variant="contained">
          <Button color="primary" component={Link} to="/join">
            Join a Room
          </Button>
          <Button color="secondary" component={Link} to="/create">
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

// export default HomePage;
