const int cowButtonPin = 2; // Connect cow button to digital pin 2
const int dogButtonPin = 3; // Connect dog button to digital pin 3
const int greenLEDPin = 4; // Connect green LED to digital pin 4
const int redLEDPin = 5; // Connect red LED to digital pin 5

void setup() {
  Serial.begin(9600); // Start serial communication
  pinMode(cowButtonPin, INPUT_PULLUP); // Set cow button pin as input with pull-up resistor
  pinMode(dogButtonPin, INPUT_PULLUP); // Set dog button pin as input with pull-up resistor
  pinMode(greenLEDPin, OUTPUT); // Set green LED pin as output
  pinMode(redLEDPin, OUTPUT); // Set red LED pin as output
}

void loop() {
  // Read button states
  int cowButtonState = digitalRead(cowButtonPin);
  int dogButtonState = digitalRead(dogButtonPin);

  // Check for button presses
  if (cowButtonState == HIGH) {
    Serial.println("CowButtonPressed");
    delay(50); // Debounce delay
  }
  if (dogButtonState == HIGH) {
    Serial.println("DogButtonPressed");
    delay(50); // Debounce delay
  }

  // Check for incoming messages from serial port
  if (Serial.available() > 0) {
    String message = Serial.readStringUntil('\n');
    message.trim(); // Remove leading/trailing whitespaces

    // Check if the received message is "Correct" or "Wrong" and trigger the corresponding LED
    if (message.equals("Correct")) {
      digitalWrite(greenLEDPin, HIGH); // Turn on green LED
      delay(1000); // Keep LED on for 1 second
      digitalWrite(greenLEDPin, LOW); // Turn off green LED
    } else if (message.equals("Wrong")) {
      digitalWrite(redLEDPin, HIGH); // Turn on red LED
      delay(1000); // Keep LED on for 1 second
      digitalWrite(redLEDPin, LOW); // Turn off red LED
    }
  }
}
