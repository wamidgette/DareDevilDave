window.onload = function(){
    const animationStage = document.querySelector(".animation-stage")
    const timer = document.querySelector("#timer");
    const cannon = document.querySelector(".cannon");
    const message = document.querySelector(".message");
    const dave = document.querySelector(".dave");
    const mainStage = document.querySelector(".animation-stage");
    const startBox = document.querySelector(".start-box");
    const start = document.querySelector(".start-button");
    const goal= document.querySelector(".goal");
    const yourScore = document.querySelector("#score");
    let score=0;
    function startAnimations(){
        initTime=60;
        score=0;
        cannon.classList.add("cannon-rotation");
        const timerInterval = setInterval(timeUpdate, 1000);
        function timeUpdate(){
            initTime = initTime-1;
            timer.innerHTML = initTime;
            if(initTime===0){
                //Basically reset the entire game here so the user can play again
                start.classList.remove("button-animation")
                start.innerHTML="Play Again";
                start.onclick = startGame;
                message.innerHTML="Time is up! Your score was " +score+". Thanks for Playing!";
                startBox.classList.remove("slide-down")
                clearInterval(timerInterval);
                document.removeEventListener("keydown", launchDave, false); 
                document.removeEventListener("click", launchDave, false);
                setTimeout(()=>{
                    removeAnimations();
                    yourScore.innerHTML=0;
                    timer.innerHTML=60;
                }, 3000)
            }
        }
    }
    function removeAnimations(){
        cannon.classList.remove("cannon-rotation");
        dave.classList.remove("dave-launch-animation");
    }
    function runCannonRotation(){
        cannon.style.animationPlayState="running";
        cannon.classList.add("cannon-rotation");
    }
    function launchDave(event){
        if(event.key && event.code!=="Space"){
            return
        }
        //stop the cannon and launch dave
        cannon.style.animationPlayState="paused";
        dave.classList.add("dave-launch-animation");   
        //Get the position of dave  2 seconds after launch -- account for 1s delay on "dave" animation 
        setTimeout(getPosition, 1400)
        const {x: stagex, y: stagey, width: stageWidth, height: stageHeight}  = animationStage.getBoundingClientRect();
        const hoopTop = stagey + (0.4*stageHeight);
        const hoopBottom = stagey + (0.6*stageHeight);
        const {x: goalx, width: goalWidth} = goal.getBoundingClientRect();
        //TODO: Would be better to find a way to detect when dave crosses the x coordinate of the hoop and find the y coordinate at that moment for verification, rather than relying on a 1400ms delay
        // const goalCenter = goalx + (0.5*goalWidth);
        function getPosition(){
            const {y: daveTop, height: daveHeight} = dave.getBoundingClientRect(); 
            const daveCenter = daveTop + (0.5*daveHeight)
            //if dave's position falls within hoop, add 1 to score and play audio
            if(daveCenter>= hoopTop && daveCenter<=hoopBottom){
                score = score + 1;
                yourScore.innerHTML= score;
                var meow = new Audio('audio/meow.mp3')
                meow.play();
            }
            //else then dave missed the hoop. play missing noise
            else{
                var swoosh = new Audio('audio/miss.mp3');
                swoosh.play();
            }
        } 
        setTimeout(removeAnimations,2500) 
        //This is to reset dave 
        setTimeout(runCannonRotation,3000)
    }
    function startGame(){
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