//Create variables here
var dog,happyDog,database,foodS,foodStock;
var feed;
var addFood;
var fedTime;
var lastFed;
var foodObj;
var Food
var milk;

function preload()
{
  dog1 = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
  milk1 = loadImage("Milk.png")
	//load images here
}

function setup() {
  createCanvas(1000, 500);
  dog = createSprite(250,300,50,50)
  dog.addImage(dog1)
  dog.scale = 0.2
  database = firebase.database()
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodObj = new Object()
  
  feed = createButton("Feed the dog");
  feed. position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood. position(800,95);
  addFood.mousePressed(addFoods)
  
}


function draw() {  
  background(46,139,87)
  
  //if(keyWentDown(UP_ARROW)){
  //  writeStock(foodS);
  //  dog.addImage(happyDog)
 // }
 // textSize(20);
  //fill("white")
 // text("Note: Click UP_ARROW to feed Drago milk!",50,30)

  textSize(20);
  fill("white")
  text("Food remaining:"+foodS,180,200)

  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });



  drawSprites();
  //add styles here
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);
 writeStock(foodS)

 
 
  //foodObj.writeStock(foodObj.getFoodStock()-1);
  //database.ref('/').update({
   //Food:foodObj.getFoodStock(),
   // FeedTime:hour()
  //})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  
}


