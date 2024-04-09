// PWM Game -- Homework 3.1

// Game Objective: Control the brightness of a white LED using a potentiometer. Players take turns adjusting the brightness of the white LED, trying to get it as bright as possible without making the red LED flash. 
// Rules: Players must take turns adjusting the potentiometer to increase the brightness of the white LED. The white LED should gradually increase in brightness when the potentiometer is turned clockwise and decrease when turned counterclockwise. The player who gets the LED closest to the maximum brightness without exceeding it wins.
// Challenge: The challenge is controlling the brightness of the LED accurately without going over the maximum brightness level. The red LED will flash when the player has exceeded the limit. 
// Interaction: Players interact by taking turns adjusting the potentiometer. Whichever player causes the red LED to start flashing...looses. 

const int potPin = A0;    // Analog input pin for potentiometer
const int ledPin = 3;     // PWM pin for white LED
const int flashingPin = 13; // flashing red LED pin
const int maxThreshold = 200; // maximum brightness threshold
int potValue = 0;         // Variable to store potentiometer value
int brightness = 0;       // Variable to store white LED brightness
bool flashing = false;    // Variable to track if red LED is flashing

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(flashingPin, OUTPUT);
}

void loop() {
  potValue = analogRead(potPin);  // Read potentiometer value
  brightness = map(potValue, 0, 1023, 0, 255);  // Map potentiometer value to LED brightness range
  
  if (brightness >= maxThreshold) {
    // If brightness exceeds threshold, start flashing red LED
    flashing = true;
  } else {
    // If brightness is within threshold, stop flashing red LED
    flashing = false;
    digitalWrite(flashingPin, LOW); // Ensure flashing LED is off
  }
  
  if (flashing) {
    // Flashing red LED
    digitalWrite(flashingPin, HIGH);
    delay(100); 
    digitalWrite(flashingPin, LOW);
    delay(100);
  } else {
    // Set LED brightness
    analogWrite(ledPin, brightness);  
  }
  
  delay(10);  // Delay for stability
}
