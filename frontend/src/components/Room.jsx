import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";

export default function Room() {
  const { roomcode } = useParms();
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setHost] = useState(false);
  const [votesToSkip, setVotesToSkip] = useState(2);

  useEffect(() => {
    getRoomDetails();
  }, []);
  async function getRoomDetails() {
    try {
      const response = await fetch("/api/get-room" + "?code=" + this.roomCode);
      const data = await response.json();
      setGuestCanPause(data.guestCanPause);
      setVotesToSkip(data.votesToSkip);
      setHost(data.isHost);
    } catch (error) {
      console.log("Error while enterig the room");
    }
  }
  return (
    <div>
      <h3>{roomcode}</h3>
      <p>Votes to Skip: {votesToSkip}</p>
      <p>Guest Can Pause: {guestCanPause ? "Yes" : "No"}</p>
      <p>Host: {isHost ? "Yes" : "No"}</p>

    </div>
  );
}
