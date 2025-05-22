import React, { useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function CreateRoomPage() {
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [votesToSkip, setVotesToSkip] = useState(2);
  const navigate = useNavigate();

  async function handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };

    try {
      const response = await fetch("/api/create-room", requestOptions);
      const data = await response.json();
      console.log(data);
      navigate(`/room/${data.code}`);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  }

  function handleGuestCanPause(e) {
    setGuestCanPause(e.target.value === "true"); // Convert to boolean
  }

  function handleVotesToSkip(e) {
    setVotesToSkip(parseInt(e.target.value, 10)); // Ensure it's a number
  }

  return (
    <Grid container spacing={2}>
      <Grid item md={12} align="center">
        <Typography component="h4" variant="h4">
          Create A Room
        </Typography>
      </Grid>
      <Grid item md={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText sx={{ textAlign: "center" }}>
            Guest Control of Playback State
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={guestCanPause ? "true" : "false"}
            onChange={handleGuestCanPause}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item md={12} align="center">
        <FormControl>
          <TextField
            required
            type="number"
            onChange={handleVotesToSkip}
            defaultValue={votesToSkip}
            inputProps={{ min: 1 }}
            sx={{ textAlign: "center" }}
          />
          <FormHelperText sx={{ textAlign: "center" }}>
            Votes Required To Skip Song
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item md={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Create A Room
        </Button>
      </Grid>
      <Grid item md={12} align="center">
        <Button color="secondary" variant="contained" component={Link} to="/">
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
