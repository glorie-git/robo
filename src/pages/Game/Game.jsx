import Controller from "../../components/Controller";
import Leaderboard from "../../components/Leaderboard";
import Tabletop from "../../components/Tabletop";
import EndGame from "../../components/EndGame";
import Scoreboard from "../../components/Score";
import Timer from "../../components/Timer";
import { useState, useEffect, useCallback } from "react";
import DialogBox from "../../components/Dialog";
import "./Game.css";

let targetLocation = null;

const Game = () => {
  const homeDialog = document.getElementById("home-dialog");
  const startingLocation = 12;
  const gameLength = 60;
  const rows = 5;
  const cols = 5;
  const localStorageKey = "games";

  const [rotate, setRotate] = useState(0);
  const [roboLocation, setRoboLocation] = useState(startingLocation);
  const [points, setPoints] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(gameLength);
  const [leaderboard, setLeaderboard] = useState(null);

  const generateTargetLocation = useCallback((roboLocation) => {
    const newTargetLocation = Math.floor(Math.random() * 25);
    if (newTargetLocation !== roboLocation) {
      return newTargetLocation;
    } else {
      return generateTargetLocation(roboLocation);
    }
  }, []);

  function getLeaderboard() {
    return JSON.parse(localStorage.getItem(localStorageKey));
  }

  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, [timeUp]);

  useEffect(() => {
    if (roboLocation === targetLocation) {
      setPoints(points + 1);
      const newTargetLocation = generateTargetLocation(roboLocation);
      targetLocation = newTargetLocation;
    }
  }, [generateTargetLocation, points, roboLocation]);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          console.log("Time is up!");
          setIsRunning(false);
          setTimeUp(true);
          return 0;
        } else return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // Stop timer when game is over
  useEffect(() => {
    if (timeUp) {
      setTime(0);
    }
  }, [timeUp]);

  function handleClick(value) {
    // Determine Robo's next rotation
    if (value === "left" || value === "right") {
      const element = document.getElementById(roboLocation);
      let rotation = null;
      if (value === "left") {
        rotation = (rotate - 90) % 360;
        element.style.transform = `rotate(${rotation}deg)`;
      } else {
        rotation = (rotate + 90) % 360;
        element.style.transform = `rotate(${rotation}deg)`;
      }
      setRotate(rotation);
    } else if (value === "forward") {
      const newLocation = determineLocation(rotate, roboLocation);

      const isTimeUp = isOffEdge(newLocation);
      if (isTimeUp) {
        setTimeUp(isTimeUp);
      } else {
        setRoboLocation(newLocation);
      }
    }
  }

  function determineLocation(rotate, roboLocation) {
    if (rotate === 0) {
      return roboLocation - 5;
    } else if (rotate === 90 || rotate === -270) {
      return roboLocation + 1;
    } else if (rotate === -90 || rotate === 270) {
      return roboLocation - 1;
    } else if (rotate === 180 || rotate === -180) {
      return roboLocation + 5;
    }
  }

  function isOffEdge(newLocation) {
    if (newLocation < 0) {
      // Robo has fallen off the top edge
      return true;
    } else if (newLocation > 25) {
      // Robo has fallen off the bottom edge
      return true;
    } else if (roboLocation % 5 === 0) {
      // Robo is at the left edge
      if (rotate === -90 || rotate === 270) {
        // Falls off on left edge
        return true;
      }
    } else if (roboLocation % 5 === 4) {
      // Robo is at the right edge
      if (rotate === 90 || rotate === -270) {
        // Falls off on right edge
        return true;
      }
    }
  }

  function submitPoints(e) {
    // Prevent default action of page refresh
    e.preventDefault();

    // If we have saved previous games simply add the submitted game
    // Else store the submitted game as a new game
    const games = getLeaderboard();
    if (games) {
      console.log(games);
      games.push([input, `${points}`]);
      localStorage.setItem(localStorageKey, JSON.stringify(games));
    } else {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify([[input, `${points}`]])
      );
    }

    const updatedGames = getLeaderboard();
    setLeaderboard(updatedGames);
    setInput("");

    // Hide the form so that user cannot resubmit their points.
    const element = document.getElementById("points-form");
    element.style.display = "none";
  }

  function handleChange(e) {
    const input = e.target.value;
    setInput(input);

    const element = document.getElementById("submit-btn");

    if (input.length < 3) {
      element.style.backgroundColor = "#999";
      element.style.cursor = "not-allowed";
      element.disabled = false;
    } else {
      element.style.backgroundColor = "black";
      element.disabled = false;
      element.style.cursor = "pointer";
    }
  }

  function handlePlayClick() {
    resetGame(startingLocation, gameLength);
  }

  function resetGame(startingLocation, gameLength) {
    setPoints(0);
    setTimeUp(false);
    setRoboLocation(startingLocation);
    setTime(gameLength);
    setRotate(0);
    setIsRunning(true);
  }

  function getTargetLocation() {
    return targetLocation;
  }

  function setTargetLocation() {
    targetLocation = generateTargetLocation(roboLocation);
  }

  return (
    <div id="game-container">
      <button
        className="home-btn"
        onClick={() => {
          homeDialog.showModal();
        }}
      >
        Go Home
      </button>
      <DialogBox element={homeDialog} />
      <section className="top-section grid-row space">
        <Timer className="margin-right" time={time} />
        <Scoreboard className="margin-left" points={points} />
      </section>
      <>
        {timeUp ? (
          <>
            <EndGame
              points={points}
              submitPoints={submitPoints}
              input={input}
              handleChange={handleChange}
              handlePlayClick={handlePlayClick}
            />
            <Leaderboard leaderboard={leaderboard} />
          </>
        ) : (
          <>
            <div className="tabletop">
              <Tabletop
                rows={rows}
                cols={cols}
                roboLocation={roboLocation}
                getTargetLocation={getTargetLocation}
                setTargetLocation={setTargetLocation}
                rotate={rotate}
              />
            </div>
            <div className="controls">
              <Controller
                handleClick={handleClick}
                buttons={["left", "forward", "right"]}
              />
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Game;
