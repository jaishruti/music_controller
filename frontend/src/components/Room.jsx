import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const { roomcode } = useParams();
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setHost] = useState(false);
  const [votesToSkip, setVotesToSkip] = useState(2);

  useEffect(() => {
    getRoomDetails();
  }, [roomcode]); // Ensures it runs when `roomcode` changes

  async function getRoomDetails() {
    try {
      const response = await fetch(`/api/get-room?code=${roomcode}`);
      const data = await response.json();
      setGuestCanPause(data.guestCanPause);
      setVotesToSkip(data.votesToSkip ?? 2);

      setHost(data.isHost);
      console.log(data);
    } catch (error) {
      console.log("Error while enterig the room", error);
    }
  }
  //   useEffect(() => {
  //     const storedVotes = localStorage.getItem("votesToSkip");
  //     if (storedVotes) setVotesToSkip(parseInt(storedVotes));
  //   }, []);

  //   useEffect(() => {
  //     localStorage.setItem("votesToSkip", votesToSkip);
  //   }, [votesToSkip]);

  return (
    <div>
      <h3>{roomcode}</h3>
      <p>Votes to Skip: {votesToSkip}</p>
      <p>Guest Can Pause: {guestCanPause ? "Yes" : "No"}</p>
      <p>Host: {isHost ? "Yes" : "No"}</p>
    </div>
  );
}
