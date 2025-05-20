import React from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function HomePage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<p>This is the home page</p>} />
        {/* JSX inside element */}
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomcode" element={<Room />} />
      </Routes>
    </Router>
  );
}

// export default HomePage;
