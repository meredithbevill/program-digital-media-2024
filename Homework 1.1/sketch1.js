
// Example 1
var ex1 = function( p ) {
  var x1 = 75;
  var y1 = p.height/2 + 85;
  var x2 = 160;
  var y2 = p.height/2 + 85;
  
  p.setup = function() {
    p.createCanvas(300, 175);
  };

  p.draw = function() {
    p.background(0, 255, 0); // Set background color to green
    p.fill(255); // Set fill color to white

    // Draw a circle
    p.ellipse(x1, y1, 130, 130);

    // Draw a square
    p.rect(x2, y2 - 65, 130, 130);
  };
};

var myp5 = new p5(ex1, 'c1');

// Example 2
var ex2 = function( p ) { 
  var x = 125; 
  var y = 125;  
  var circleSize = 125;

  p.setup = function() {
    p.createCanvas(250, 250);
  };

  p.draw = function() {
    p.background(255); // Set background color to white

    // Draw red circle on top
    p.fill(255, 0, 0, 100);
    p.noStroke();
    p.ellipse(x, y - 35, circleSize, circleSize);

    // Draw blue circle on bottom left
    p.fill(0, 0, 255, 100);
    p.noStroke();
    p.ellipse(x - 35, y + 35, circleSize, circleSize);

    // Draw green circle on bottom right
    p.fill(0, 255, 0, 100);
    p.noStroke();
    p.ellipse(x + 35, y + 35, circleSize, circleSize);
  };
};

var myp5 = new p5(ex2, 'c2');


// Example 3
var ex3 = function( p ) {
  p.setup = function() {
    p.createCanvas(300, 175);
  };

  p.draw = function() {
    p.background(0); // Set background color to black
    p.angleMode(p.DEGREES);
    
    // Draw yellow circle with triangle cut out
    p.fill(255, 255, 0); // Yellow
    p.arc(100, 100, 100, 100, 30, 330, p.PIE);

    // Draw pac-man thing
    p.fill("red");
    p.noStroke();
    p.rect(195, 80, 60, 60); // bottom half of ghost
    p.arc(225, 80, 60, 60, p.PI, 0, p.PIE); // top half of ghost
    p.fill("white"); // eye whites
    p.ellipse(210, 80, 18, 18);
    p.ellipse(240, 80, 18, 18);
    p.fill("blue"); // blue part of eyes
    p.ellipse(240, 80, 12, 12);
    p.ellipse(210, 80, 12, 12);
  };
};

var myp5 = new p5(ex3, 'c3');


// Example 4
var ex4 = function(p) {
  // Center of the canvas
  var centerX;
  var centerY;

  // Setup function
  p.setup = function() {
    p.createCanvas(250, 250);
    centerX = p.width / 2;
    centerY = p.height / 2;
  };

  // Draw function
  p.draw = function() {
    // Set background color to dark blue
    p.background(0, 0, 100);

    // Set stroke color to white
    p.stroke(255);

    // Set fill color to green and draw a centered circle
    p.fill(0, 100, 0);
    p.ellipse(centerX, centerY, 130, 130);

    // Set fill color to red and draw a centered star with a larger size
    p.fill(255, 0, 0);
    drawStar(centerX, centerY, 25, 75, 5);
  };

  // Function to draw a star
  function drawStar(x, y, radius1, radius2, npoints) {
    var angle = p.TWO_PI / npoints;
    var halfAngle = angle / 2.0;

    // Adjust the starting angle to make the star stand upright
    var startAngle = -p.PI / 2;

    p.beginShape();
    for (var a = startAngle; a < startAngle + p.TWO_PI; a += angle) {
      var sx = x + p.cos(a) * radius2;
      var sy = y + p.sin(a) * radius2;
      p.vertex(sx, sy);
      sx = x + p.cos(a + halfAngle) * radius1;
      sy = y + p.sin(a + halfAngle) * radius1;
      p.vertex(sx, sy);
    }
    p.endShape(p.CLOSE);
  }
};

// Create a new p5 instance
var myp5 = new p5(ex4, 'c4');
