// React Imports
import { useState } from "react";

// Parse for Back4App import
import Parse from "parse";
import { initializeParse, useParseQuery } from "@parse/react";

// ** User Components
import OfflinePlay from "./components/OfflinePlay";
import TopNav from "./components/TopNav";
import PlayHistory from "./components/PlayHistory";
import Login from "./components/Login";
import Register from "./components/Register";
import OnlinePlay from "./components/OnlinePlay";
import OnlinePlayers from "./components/OnlinePlayers";

// ** React Router Imports
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// ** Style Imports
import "./App.css";

// ** Parse registration
const PARSE_APPLICATION_ID = "a9z635ij18Ca5sLNL9MAUOviBp0J9awDuSSk7KjC";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "HscnZoC3EbmLZxOphzqjViSOrdXfWRM6Zwf2Wz6Y";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

// ** Parse Real-time
initializeParse(
  "https://tictactoe2022.b4a.io",
  "a9z635ij18Ca5sLNL9MAUOviBp0J9awDuSSk7KjC",
  "HscnZoC3EbmLZxOphzqjViSOrdXfWRM6Zwf2Wz6Y"
);

// ** Main App Component
function App() {
  // ** user ID from local storage
  const userId =
    JSON.parse(
      localStorage.getItem(
        "Parse/a9z635ij18Ca5sLNL9MAUOviBp0J9awDuSSk7KjC/currentUser"
      )
    ) &&
    JSON.parse(
      localStorage.getItem(
        "Parse/a9z635ij18Ca5sLNL9MAUOviBp0J9awDuSSk7KjC/currentUser"
      )
    ).objectId;

  // ** Online Game Real Time Hooks
  const [gameId, setGameId] = useState("");
  const gameQuery = new Parse.Query("gameSession");
  gameQuery.equalTo("objectId", gameId);
  const { results: gameResults } = useParseQuery(gameQuery);

  // ** Game finishing Hook
  const [end, setEnd] = useState(false);

  // ** Main App component with Routes
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TopNav />
                <Outlet />
              </>
            }
          >
            <Route index element={<OfflinePlay />} />
            <Route path="/online">
              <Route
                index
                element={
                  <OnlinePlayers
                    gameResults={gameResults}
                    setGameId={setGameId}
                    user={userId}
                  />
                }
              />
              <Route
                path="/online/play"
                element={
                  <OnlinePlay
                    end={end}
                    setEnd={setEnd}
                    results={gameResults}
                    gameId={gameId}
                    user={userId}
                  />
                }
              />
            </Route>
            <Route path="/history" element={<PlayHistory />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
