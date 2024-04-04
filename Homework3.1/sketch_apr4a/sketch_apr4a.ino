// Pin definitions
const int buttonPin1 = 2;  // Connect first button to digital pin 2
const int buttonPin2 = 3;  // Connect second button to digital pin 3
const int ledPin1 = 4;     // Connect first LED to digital pin 4
const int ledPin2 = 5;     // Connect second LED to digital pin 5

// Morse code timing constants
const int dotDelay = 250;   // Delay for a dot (in milliseconds)
const int dashDelay = 3 * dotDelay;  // Delay for a dash (three times the dot delay)
const int intraCharDelay = dotDelay; // Delay between dots and dashes within a character
const int interCharDelay = 3 * dotDelay; // Delay between characters
const int interWordDelay = 7 * dotDelay; // Delay between words

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
    // Blink LED 1 in SOS pattern
    morseCode(ledPin1, "SOS");
  }

  // If button 2 is pressed
  if (buttonState2 == LOW) {
    // Blink LED 2 in HELLO pattern
    morseCode(ledPin2, "HELLO");
  }
}

// Function to blink an LED according to Morse code pattern
void morseCode(int pin, String message) {
  for (int i = 0; i < message.length(); i++) {
    char c = toupper(message.charAt(i)); // Convert character to uppercase
    if (c == ' ') {
      delay(interWordDelay);
    } else {
      String morseCode = getMorseCode(c);
      for (int j = 0; j < morseCode.length(); j++) {
        if (morseCode.charAt(j) == '.') {
          digitalWrite(pin, HIGH);
          delay(dotDelay);
        } else if (morseCode.charAt(j) == '-') {
          digitalWrite(pin, HIGH);
          delay(dashDelay);
        }
        digitalWrite(pin, LOW);
        delay(intraCharDelay);
      }
      delay(interCharDelay - intraCharDelay); // Wait before next character
    }
  }
}

// Function to get Morse code representation of a character
String getMorseCode(char c) {
  switch (c) {
    case 'A':
      return ".-";
    case 'B':
      return "-...";
    case 'C':
      return "-.-.";
    case 'D':
      return "-..";
    case 'E':
      return ".";
    case 'F':
      return "..-.";
    case 'G':
      return "--.";
    case 'H':
      return "....";
    case 'I':
      return "..";
    case 'J':
      return ".---";
    case 'K':
      return "-.-";
    case 'L':
      return ".-..";
    case 'M':
      return "--";
    case 'N':
      return "-.";
    case 'O':
      return "---";
    case 'P':
      return ".--.";
    case 'Q':
      return "--.-";
    case 'R':
      return ".-.";
    case 'S':
      return "...";
    case 'T':
      return "-";
    case 'U':
      return "..-";
    case 'V':
      return "...-";
    case 'W':
      return ".--";
    case 'X':
      return "-..-";
    case 'Y':
      return "-.--";
    case 'Z':
      return "--..";
    default:
      return ""; // Return empty string for unsupported characters
  }
}
