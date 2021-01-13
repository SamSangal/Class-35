var ball;
var database, position;
function preload(){
    car=loadImage("download.png")
}
function setup(){
    database=firebase.database();
    createCanvas(500,500);

    ball = createSprite(250,250,10,10);
    ball.addImage(car);
    var ballPosition=database.ref("ball/position");
    ballPosition.on("value",readPosition,showErr);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
        ball.rotation=180;
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
        ball.rotation=0;
    }
    else if(keyDown(UP_ARROW)){
        ball.rotation=270;
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
        ball.rotation=90;
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("ball/position").set({
        x:position.x+x,
        y:position.y+y
    })
    
}

function readPosition(data){
position=data.val();
console.log(position.x);
ball.x=position.x;
ball.y=position.y;
}

function showErr(){
    console.log("Error");
}
