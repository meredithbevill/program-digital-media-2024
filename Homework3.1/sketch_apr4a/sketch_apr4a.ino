// Pin definitions
const int buttonPin1 = 2;  // Connect first button to digital pin 2
const int buttonPin2 = 3;  // Connect second button to digital pin 3
const int ledPin1 = 4;     // Connect first LED to digital pin 4
const int ledPin2 = 5;     // Connect second LED to digital pin 5

void setup() {
  // Initialize digital pins
  pinMode(buttonPin1, INPUT_PULLUP); // Using internal pull-up resistors
  pinMode(buttonPin2, INPUT_PULLUP); // Using internal pull-up resistors
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
}

void loop() {
  // Read the state of the buttons
  int buttonState1 = digitalRead(buttonPin1);
  int buttonState2 = digitalRead(buttonPin2);

  // If button 1 is pressed
  if (buttonState1 == LOW) {
    // Blink LED 1
    blinkLED(ledPin1);
  }

  // If button 2 is pressed
  if (buttonState2 == LOW) {
    // Blink LED 2
    blinkLED(ledPin2);
  }
}

// Function to blink an LED
void blinkLED(int pin) {
  // Blink the LED five times
  for (int i = 0; i < 5; i++) {
    digitalWrite(pin, HIGH);   // Turn the LED on
    delay(500);                // Wait for 500 milliseconds
    digitalWrite(pin, LOW);    // Turn the LED off
    delay(500);                // Wait for 500 milliseconds
  }
}
