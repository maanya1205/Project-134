status= "";
object=[];
song1= "";
function preload(){
	song1 = loadSound("alert sound.mp3");
}
function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    video.size(380,380);
  objectDetector= ml5.objectDetector("cocossd",modelLoaded); 
  document.getElementById("status").innerHTML= "Status: Detecting Baby";
}
function modelLoaded(){
    console.log("Model is Loaded!!");
}
function gotResult(error,results){
    if(error){
        console.error(error);        
    }
        console.log(results);
        object=results;
}

function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML= "Baby Detected!";
            fill(r,g,b);
            percent= floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(object[i].label=="person"){
                document.getElementById("baby_found").innerHTML= "Baby Found!";
                song1.stop();
            }
            else{
                document.getElementById("baby_found").innerHTML= "Baby Not Found!";
                song1.play();
            }
        }
        if(object.length==0){
            document.getElementById("baby_found").innerHTML= "Baby Not Found!";
            song1.play();
        }
    }
}