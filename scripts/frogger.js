class Frogger{
    constructor()
    {
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.width = this.spriteWidth/5;
        this.height = this.spriteHeight/5; 
        //initial pos of the frog (center bottom)
        this.x = canvas1.width/2 - this.width/2;
        this.y = canvas1.height - this.height - 40;
        //each press will trigger only one jump to the next grid cell 
        this.moving = false;
        //coords for current frame whithin the sprite sheet will be changed dynamically to animate the frog
        this.frameX = 0;
        this.frameY = 0;
    }
    update(){
        if(keys[38]) //up
        {
            if(this.moving === false)
            {   
                //the frog will jump 80px up
                this.y -= grid;
                this.moving = true;
                //get the img of frog jumping up (1st row ,2nd col) from the sprite sheet
                this.frameX = 1;
                this.frameY = 0;
            }
        }
        if(keys[40]) //down
        {
            //restrict the frog movements to the screen boundries in y-axis
            if(this.moving === false && this.y < canvas1.height - this.height * 2)
            {   
               this.y += grid;
               this.moving = true;
               this.frameY = 3;
            }
        }
        if(keys[37]) //left
        {
             //restrict the frog movements to the screen boundries 
             //in the left x-axis
            if(this.moving === false && this.x > this.width)
            {   
               this.x -= grid;
               this.moving = true;
               this.frameY = 2;
            }
        }
        if(keys[39]) //right
        {
             //restrict the frog movements to the screen boundries 
             //to the right x-axis
            if(this.moving === false && this.x < canvas1.width - this.width*2)
            {   
               this.x += grid;
               this.moving = true;
               this.frameY = 1;
            }
        }
        if(this.y < 0)
            incrementScore();
    }
    draw(){
        //draw sprites on convas 
        ctx3.drawImage(frog,this.frameX*this.spriteWidth,this.frameY*this.spriteHeight,this.spriteWidth,this.spriteHeight,this.x-25,this.y-25,this.width*2,this.height*2);
    }
    jump(){
        if(this.moving === false) this.frameX = 1;
        else if(this.frameX === 1) this.frameX = 0;
    }
}
const frogger = new Frogger();