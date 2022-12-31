window.onload = function(){
    const animationStage = document.querySelector(".animation-stage")
    const timer = document.querySelector("#timer");
    const cannon = document.querySelector(".cannon");
    const message = document.querySelector(".message");
    const dave = document.querySelector(".dave");
    const startBox = document.querySelector(".start-box");
    const start = document.querySelector(".start-button");
    const goal= document.querySelector(".goal");
    const userScore = document.querySelector("#score");
    let score=0;
    let gameRunning;

    function startAnimations(){
        let time=60;
        score=0;
        cannon.style.animationPlayState="running";
        cannon.classList.add("cannon-rotation");
        const timerInterval = setInterval(timeUpdate, 1000);
        function timeUpdate(){
            time = time-1;
            timer.innerHTML = time;
            if(time===0){
                //Basically reset the entire game here so the user can play again
                gameRunning = false;
                document.removeEventListener("keydown", launchDave, false); 
                document.removeEventListener("click", launchDave, false);
                start.classList.remove("button-animation")
                start.innerHTML="Play Again";
                start.onclick = startGame;
                message.innerHTML="Time is up! Your score was " +score+". Thanks for Playing!";
                startBox.classList.remove("slide-down")
                clearInterval(timerInterval);
                setTimeout(()=>{
                    removeAnimations();
                    userScore.innerHTML=0;
                    timer.innerHTML=60;
                }, 3000)
            }
        }
    }
    function resetDave(){
        dave.classList.remove("dave-launch-animation");
    }
    function removeAnimations(){
        cannon.classList.remove("cannon-rotation");
        dave.classList.remove("dave-launch-animation");
    }
    function runCannonRotation(){
        cannon.style.animationPlayState="running";
        //If the game is still running put the launch dave listeners back in place
        if(gameRunning === true){
            document.addEventListener("keydown", launchDave, false); 
            document.addEventListener("click", launchDave, false);
        }
    }
    function launchDave(event){
        if(event.key && event.code!=="Space"){
            return
        }
        //Prevent this function being called more than once at a time
        document.removeEventListener("keydown", launchDave, false); 
        document.removeEventListener("click", launchDave, false);
        //stop the cannon and launch dave
        cannon.style.animationPlayState="paused";
        dave.classList.add("dave-launch-animation");   
        //Get the position of dave seconds after launch when he is at the position of the hoop -- account for 1s delay on "dave" animation 
        //TODO: Would be better to find a way to detect when dave crosses the x coordinate of the hoop and find the y coordinate at that moment for verification, rather than relying on a 1400ms delay
        setTimeout(getPosition, 1400)
        const {y: stagey, height: stageHeight}  = animationStage.getBoundingClientRect();
        const hoopTop = stagey + (0.4*stageHeight);
        const hoopBottom = stagey + (0.6*stageHeight);
        function getPosition(){
            const {y: daveTop, height: daveHeight} = dave.getBoundingClientRect(); 
            const daveCenter = daveTop + (0.5*daveHeight)
            //if dave's position falls within hoop, add 1 to score and play audio
            if(daveCenter>= hoopTop && daveCenter<=hoopBottom){
                score = score + 1;
                userScore.innerHTML= score;
                var meow = new Audio('audio/meow.mp3')
                meow.play();
            }
            //else then dave missed the hoop. play missing noise
            else{
                var swoosh = new Audio('audio/miss.mp3');
                swoosh.play();
            }
        } 
        setTimeout(resetDave,2500) 
        //This is to reset dave 
        setTimeout(runCannonRotation,3000)
    }
    function startGame(){
        gameRunning = true
        start.onclick = null;
        start.classList.add("button-animation")
        startBox.classList.add("slide-down")
        setTimeout(()=>{
            startAnimations(); 
            document.addEventListener("keydown", launchDave, false); 
            document.addEventListener("click", launchDave, false);
        }, 3000)
    }
    start.onclick = startGame;           
}