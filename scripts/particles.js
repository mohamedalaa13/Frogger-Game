//we will use it to create particales to be under the frog
class Paricales{
    constructor(x,y)
    {
        this.x = x + 25;  // to make the dust exactly under the frog
        this.y = y + 25;
        //determines size of particles [1-20]
        this.radious = Math.random() * 20 + 1;
        //to make them invisible
        this.opacity = 1;
        //spread them under the frog in rand dir [0.5,-0.5] away from the frog
        this.dirX = Math.random() - 0.5; // +ve -> up
        this.dirY = Math.random()- 0.5; // -ve -> down
    }
    draw(){
        
        //ctx3.fillStyle = 'gray';
        ctx3.fillStyle = 'rgba(150,150,150,'+this.opacity+')';
        ctx3.beginPath();
        ctx3.arc(this.x,this.y,this.radious,0,Math.PI * 2);
        ctx3.fill();
        ctx3.closePath();
    }
    update(){
        //run frames and move particales along x-axis & y-axis
        this.x += this.dirX;
        this.y += this.dirY;
        ///to make sure not to get -ve numbers bcz the entire game will stop
        if(this.opacity > 0.1){
            this.opacity -= 0.9;
        }
        if(this.radious > 0.15){
            //for every frame of animation reduce the radius by 0.14
            //to make sure not to get -ve numbers 
            this.radious -= 0.14;
        }
    }
    drawRipples(){
        
        ctx1.strokeStyle = 'rgba(255,255,255,'+this.opacity+')';
        ctx1.beginPath();
        ctx1.arc(this.x,this.y,this.radious,0,Math.PI * 2);
        ctx1.stroke();
        ctx1.closePath();
    }
    ripple(){
        //to make water ripples start small and grow untill they reach certain size
        if(this.radious < 50){
            //grow to one side
            this.radious += 0.7;
            //to make them grow from the center *from under the frog*
            this.x -= 0.03;
            this.y -= 0.03;
        }
        if(this.opacity > 0){
            this.opacity -= 0.02; // to make the ripples slowly disapear
        }
    }

}

function handleParticles(){
    //dust particales
    for(let i = 0;i < particalesArr.length;++i){
        //draw circles *dust*
        particalesArr[i].update();
        particalesArr[i].draw();
    }
    
    if(particalesArr.length > maxParicales){
        for(let j = 0;j < 30;++j){
            particalesArr.pop();
        }
    }
    //check if the frog is moving 
    //and let the dust only over the road only
    //and limit paricales num to be < 200
    if((keys[37] || keys[38] || keys[39] || keys[40]) && frogger.y > 250 && particalesArr.length < maxParicales + 10)
    {
        for(let i = 0;i < 10;++i)
        {
            //to make them appear wherever the frog is jumping
            particalesArr.unshift(new Paricales(frogger.x,frogger.y))
        }
    }
}
function handleRipples(){
    //Water bubbles
    for(let i = 0;i < ripplesArr.length;++i){
        //draw circles *bubbles*
        ripplesArr[i].ripple();
        ripplesArr[i].drawRipples();
    }
    
    if(ripplesArr.length > 20){
        for(let j = 0;j < 5;++j){
            ripplesArr.pop();
        }
    }
    //check if the frog is moving over the river and create ripples
    if((keys[37] || keys[38] || keys[39] || keys[40]) && frogger.y < 250 && frogger.y > 100){
        for(let i = 0;i < 20;++i)
        {
            //to make them appear wherever the frog is jumping
            ripplesArr.unshift(new Paricales(frogger.x,frogger.y))
        }
    }
}