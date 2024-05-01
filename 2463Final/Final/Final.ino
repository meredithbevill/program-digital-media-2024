const int cowButtonPin = 2; // Connect cow button to digital pin 2
const int dogButtonPin = 3; // Connect dog button to digital pin 3
const int greenLEDPin = 4; // Connect blue LED to digital pin 4
const int redLEDPin = 5; // Connect red LED to digital pin 5

void setup() {
  Serial.begin(9600); // Start serial communication
  pinMode(cowButtonPin, INPUT_PULLUP); // Set cow button pin as input with pull-up resistor
  pinMode(dogButtonPin, INPUT_PULLUP); // Set dog button pin as input with pull-up resistor
  pinMode(greenLEDPin, OUTPUT); // Set blue LED pin as output
  pinMode(redLEDPin, OUTPUT); // Set red LED pin as output
}

void loop() {
  // Read button states
  int cowButtonState = digitalRead(cowButtonPin);
  int dogButtonState = digitalRead(dogButtonPin);

  // Check for button presses
  if (cowButtonState == LOW) {
    Serial.println("CowButtonPressed");
    delay(50); // Debounce delay
  }
  if (dogButtonState == LOW) {
    Serial.println("DogButtonPressed");
    delay(50); // Debounce delay
  }

  
}
