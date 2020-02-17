let canvas;
let video;
let classifier;
let flippedVideo;

let time = 0;

let label = "...waiting";

function preload(){
  //add a link to your own data set here
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/zgGoILEb/model.json');
}

function setup() {
 canvas = createCanvas(windowWidth, windowHeight);
 video = createCapture(VIDEO);
 video.size(640, 480);
 video.hide();

 flippedVideo = ml5.flipImage(video);

 classifyVideo();

}

function classifyVideo(){
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResults);
}

function gotResults(error, results){
  if(error){
    console.log(error);
    return
  }
  label = results[0].label;
  classifyVideo();
  console.log(results);
}

function draw() {
  background(0);
  image(video, 0, 0);

  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  if (label == "Fun") {
    fill(255, 255, 0);
    time += deltaTime / 1000;
  } else {
    fill(255, 0, 0);
    time -= deltaTime / 1000;
    if (time < 0) time = 0;
  }
  rect(0, height - 32, width * time / 60, 36);
  fill(255);
  text("You have accumulated " + time + " seconds of fun.", width/2, height - 52);
  text(label, width/2, height - 16);
}
