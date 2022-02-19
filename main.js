song ="" ;
function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function preload()
{
	song= loadSound("music.mp3") ;
}
scoreRightWrist = 0 ;
scoreLeftWrist= 0 ;

rightWristX= 0 ;
rightWristY= 0 ;

leftWristX= 0 ;
leftWristY= 0 ;

function modelLoaded() {
	console.log('PoseNet Is Initialized');
  }

  function gotPoses(results)
  {
	if(results.length > 0)
	{
	  scoreRightWrist =  results[0].pose.keypoints[10].score;
	  scoreLeftWrist =  results[0].pose.keypoints[9].score;
	  console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	  
	  rightWristX = results[0].pose.rightWrist.x;
	  rightWristY = results[0].pose.rightWrist.y;
	  console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
  
	  leftWristX = results[0].pose.leftWrist.x;
	  leftWristY = results[0].pose.leftWrist.y;
	  console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		  
	}}

	function draw() {
		image(video, 0, 0, 600, 500);

		fill(" #FF0000");
		stroke("#ffff00");

		if (scoreLeftWrist > 0.2)
		{
	circle(leftWristX , leftWristY , 20) ;
	InNumberleftWristY = Number(leftWristY) ;
	remove_deciamls = floor(InNumberleftWristY) ;
	volume = remove_decimals/500 ;
	document.getElementById("volume").innerHTML = "VOLUME =" + volume ; 
		}
}

	
function play()
{
	song.play();
	song.setVolume(volume);
	song.rate(1);
}
