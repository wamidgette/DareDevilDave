# DaredevilDave
A mini-game with CSS animations triggered on JS event listeners. Shoot Daredevil Dave out of the cannon and through the hoop to score a point. How many points can you score in a minute?

## Start Game
- To start the game, click the start button. This triggers animation for the start screen to lower, and begins animation to continously rotate the cannon
- Event listeners are added for click and space bar to trigger the launchDave function
- The timer countdown is triggered using a setInterval function. The user starts with 60 seconds on the clock. 

## Launch Dave
- Click with the mouse or press the spacebar to launch Dave. This pauses the rotatation of the cannon and rotates dave along a radial arm perpendicular to his orientation at the moment he is paused
- Y coordinates are checked in JavaScript at 1.4s after animation is triggered. Using getClientBoundsRect function, Dave's position is compared to the upper and lower bounds of the hoop. If dave has made it through the hoop, a point is added to the scoreboard and an audio file is played. Otherwise the animation is restarted

## Time up
- Once the timer countdown hits zero, animations on dave and the cannon are reset, the start screen comes back up, this time displaying the user's final score and an option to play again

## TODO
- Would be nice to not rely on the 1.4 second setTimeout function to check dave's y-coordinate. More ideal to check when a specific x-coordinate has been reached, and get the y-coordinate at that instant
- Displaying the user's high score would be a nice feature. Perhaps stored in an array of objects containing user name and score - array could be sorted by object scores and first 10 scores displayed on screen
