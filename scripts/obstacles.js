 class Obstacles{
    constructor(x,y,width,height,speed,type)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
        this.frameX = 0;
        this.frameY = 0;
        this.randomise = Math.floor(Math.random() * 30 + 30);
        this.carType = (Math.floor(Math.random() * numOfCars));
    }
    draw(){
        //console.log("frameX = "+this.frameX);
        if(this.type === 'turtle'){
            //not to delay changing from frame to another
            if(frame % this.randomise === 0){
                if(this.frameX >= 1){
                    this.frameX = 0;
                } else{
                    this.frameX++;
                }
            }
            //to make sure that the frog won't fall into hte water when jumping
            //4 attributes for the area we wanna crop from the sprite sheet and 4 attributes to specify where to draw it
            ctx1.drawImage(turtle,this.frameX*70,this.frameY*70,70,70,this.x,this.y,this.width,this.height);
        }else if(this.type === 'log'){
           ctx1.drawImage(logs,this.x,this.y,this.width,this.height);
        }else{
            ctx2.drawImage(cars,this.frameX * this.width,this.carType*this.height,grid * 2,grid,this.x,this.y,this.width,this.height);
        }
    }
    //update obstacles horizontally
    update(){
        //speed up as the score increases
        //multiply by the game speed to keep track of the direction 
        this.x += this.speed * gameSpeed;
        
        //reset cars if moving to the right
        if(this.speed > 0){  
            
            if(this.x > canvas1.width + this.width){
                this.x = - this.width;
                //choose random car from the sprite sheet before it appears again
                this.carType = (Math.floor(Math.random() * numOfCars));
            }
        }else{ //reset cars if moving to the left
            //set frameX = 1 to get the cars that are looking to the left from the sprite sheet
            this.frameX = 1;
            if(this.x < - this.width){
                this.x = canvas1.width + this.width;
                this.carType = (Math.floor(Math.random() * numOfCars));
            }
        }
    }
}
 
function initObstacles(){
    for(let i = 0;i < 2;i++){
        //to handle horizontal space between cars
        let spacesBetweenCars = i * 350; 
        //placing cars on the first lane from the bottom
        //move to the right
        carsArr.push(new Obstacles(spacesBetweenCars, canvas1.height - grid*2 - 20, grid*2,grid ,2,'car')); 

    }
    for(let i = 0;i < 2;i++){
        //to handle horizontal space between cars
        let spacesBetweenCars = i * 300; 
        //placing cars on the second lane from the bottom
        //move to the left
        carsArr.push(new Obstacles(spacesBetweenCars, canvas1.height - grid*3 - 20, grid*2,grid ,-2,'car')); 
    }
    for(let i = 0;i < 2;i++){
        //to handle horizontal space between cars
        let spacesBetweenCars = i * 400; 
        //placing cars on the second lane from the bottom
        //move to the left
        carsArr.push(new Obstacles(spacesBetweenCars, canvas1.height - grid*4 - 20, grid*2,grid ,2,'car')); 
    }
    //logs with -dir refers to the flow of the river
    for(let i = 0;i < 2;i++){
        let spacesBetweenCars = i * 400; 
        logArr.push(new Obstacles(spacesBetweenCars,canvas1.height - grid*5 - 20,grid*2,grid,-2,'log'))
    }
    
    for(let i = 0;i < 3;i++){
        let spacesBetweenCars = i * 200;                                                 
        logArr.push(new Obstacles(spacesBetweenCars,canvas1.height - grid*6 - 20,grid,grid,1,'turtle'))
    }
    
    
}
initObstacles();

function handleObstacles(){
    //update cars 
    for(let i = 0;i < carsArr.length;i++){
            carsArr[i].update();
            carsArr[i].draw();
    }
    //update logs
    for(let i = 0;i < logArr.length;i++){
        logArr[i].update();
        logArr[i].draw();
    }
    //check collision between cars & frog
    for(let i = 0;i < carsArr.length;++i){
        if(isCollide(frogger,carsArr[i])){
            //collision img is 100 x 100
            //we scale the img down by 50 x 50
            ctx4.drawImage(collisions,0,100,100,100,frogger.x,frogger.y,50,50);
            resetGame();
        }
    }
    
    //collision with logs/turtles
    if(frogger.y < 250 && frogger.y > 100){ //check if the frog is in the river area
        //the frog is safe if it collides only with logs & turtles
        //otherwise the frog fell in water and reset the game
        safe = false;
        for(let i = 0;i < logArr.length;++i){
            if(isCollide(frogger,logArr[i])){
                //if frog collides with turtle/log, add the obj's speed to the frog x direction
                //as if the frog is floating over the turtle/log 
                frogger.x += logArr[i].speed * gameSpeed;
                safe = true;
            }
        }

        if(!safe){
            //the frog fell into the water
            for(let i = 0;i < 30;++i){
                ripplesArr.unshift(new Paricales(frogger.x,frogger.y));
            }
            resetGame();
        }
    }
    
}