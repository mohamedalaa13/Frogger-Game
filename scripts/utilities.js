function animate(){
    //clear all canvases between every frame of animation
    //not to get stuck at canvas layers
    ctx1.clearRect(0,0,canvas1.width,canvas1.height);
    ctx2.clearRect(0,0,canvas1.width,canvas1.height);
    ctx3.clearRect(0,0,canvas1.width,canvas1.height);
    ctx4.clearRect(0,0,canvas1.width,canvas1.height);
    ctx5.clearRect(0,0,canvas1.width,canvas1.height);

    if(score ===  1 ){
        ctx2.drawImage(upper, 0, 0);
        ctx2.drawImage(backGroundImg, 0, 250);
        backGroundImg.src = './images/4.jpeg';
        cars.src='./images/ghost.png'
        wrapper.style.background = "url('./images/volcano.png')"
        grass.src="./images/test2.png"
        logs.src="./images/pipe2.png"
        turtle.src = "./images/nnnn.png"
    }
    else if(score === 2){
        ctx2.drawImage(upper, 0, 0);
        upper.src = './images/llll.png';
        ctx2.drawImage(backGroundImg, 0, 250);
        backGroundImg.src = './images/4.jpg';
        cars.src='./images/cobra1.png'
        wrapper.style.background = "url('./images/fire.jpeg')";
        logs.src = "./images/log.png"
        grass.src="./images/223.png"
        turtle.src = "./images/bbb.png";
    }
    else{
        ctx2.drawImage(backGroundImg, 0, 0);
        backGroundImg.src = 'images/background_lvl2.png';
        cars.src = 'images/cars.png';
        wrapper.style.background = "url('./images/background.png')";
        grass.src="./images/grass.png"
        turtle.src = "./images/turtles.png";
        logs.src = './images/boat.png';
    }
   
    handleRipples();
    
    
    handleParticles();
    frogger.draw();
    frogger.update();

    handleObstacles();
    handleScoreBoard();
    ctx4.drawImage(grass,0,0,canvas1.width,canvas1.height);
    frame++;
    //built in func for creating animation loop
    requestAnimationFrame(animate);
}
animate();

//event listner for key down 
window.addEventListener('keydown',function(e){
    keys = [];
    keys[e.keyCode] = true;
    if(keys[37] || keys[38] || keys[39] || keys[40])
    {
        frogger.jump();
    }
});

window.addEventListener('keyup',function(e){
    //just delete the key that was released from the keys array
    //and stop frog move
    delete keys[e.keyCode];
    frogger.moving = false;
    frogger.frameX = 0;
});

function incrementScore()
{
    //increment the score and recenter the frog for new game
    score++;
    gameSpeed += 0.05;
    frogger.x = canvas1.width/2 - frogger.width/2;
    frogger.y = canvas1.height -  frogger.height - 40; 
    //backGroundImg.src = "images/background.png";
    
}

function handleScoreBoard(){
    ctx4.fillStyle = 'white';
    ctx4.strokeStyle = 'white';
    ctx4.font = '20px larger';
    ctx4.strokeText('Score',265, 15);
    ctx4.font = '60px larger';
    ctx4.fillText(score,270, 65);
    ctx4.font = '20px larger';
    ctx4.strokeText('Collisions '+collisonsCount,10, 80);

}
//check collision between frog and every single obstcale
//returns false if there is no collision
function isCollide(frog,obstacle){
    return !( frog.x > obstacle.x + obstacle.width ||  //the frog pos is right after the obstcale
              frog.x + frog.width < obstacle.x ||       //the frog pos is left before the obstcale
              frog.y > obstacle.y + obstacle.height ||   //the frog pos is up the obstcale
              frog.y + frog.height < obstacle.y        //the frog pos is down the obstcale
    );
}

function resetGame(){
    frogger.x = canvas1.width/2 - frogger.width/2;
    frogger.y = canvas1.height -  frogger.height - 40; 
    score = 0;
    collisonsCount++;
    gameSpeed = 1;
}