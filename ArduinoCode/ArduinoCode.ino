// Arduino Code for Touch-Free Museum Quiz Exhibit
// Author = Joseph Manfredi Cameron

int sensorValue;

// For reading serial messages from p5
int incomingByte;

// Green LED for Q1
const int greenLED1Pin = 3;
// Green LED for Q2
const int greenLED2Pin = 4;
// Green LED for Q3
const int greenLED3Pin = 5;
// Green LED for Q4
const int greenLED4Pin = 6;
// Green LED for Q5
const int greenLED5Pin = 7;

void setup() {
  
  Serial.begin(9600);

  pinMode(greenLED1Pin, OUTPUT);
  pinMode(greenLED2Pin, OUTPUT);
  pinMode(greenLED3Pin, OUTPUT);
  pinMode(greenLED4Pin, OUTPUT);
  pinMode(greenLED5Pin, OUTPUT);

  digitalWrite(greenLED1Pin, LOW);
  digitalWrite(greenLED2Pin, LOW);
  digitalWrite(greenLED3Pin, LOW);
  digitalWrite(greenLED4Pin, LOW);
  digitalWrite(greenLED5Pin, LOW);
  
}

void loop() {
  
  // Sending light transistor data to P5
  sensorValue = analogRead(A0);
  int mappedValue = map(sensorValue, 1023, 0, 0, 255);
  Serial.write(mappedValue);

  // Check for data coming from P5
  if (Serial.available() > 0) {
    incomingByte = Serial.read();
    if (incomingByte == 'a') {
      correctTone();
    } else if (incomingByte == 'b') {
      incorrectTone();
    } else if (incomingByte == 0) {
      // Turn on LED 1
      digitalWrite(greenLED1Pin, HIGH);
    } else if (incomingByte == 1) {
      // Turn on LED 2
      digitalWrite(greenLED2Pin, HIGH);
    } else if (incomingByte == 2) {
      // Turn on LED 3
      digitalWrite(greenLED3Pin, HIGH);
    } else if (incomingByte == 3) {
      // Turn on LED 4
      digitalWrite(greenLED4Pin, HIGH);
    } else if (incomingByte == 4) {
      // Turn on LED 5
      digitalWrite(greenLED5Pin, HIGH);
    } else if (incomingByte == 'c') {
      // Reset all LEDs to be off
      digitalWrite(greenLED1Pin, LOW);
      digitalWrite(greenLED2Pin, LOW);
      digitalWrite(greenLED3Pin, LOW);
      digitalWrite(greenLED4Pin, LOW);
      digitalWrite(greenLED5Pin, LOW);
    }
  }
  
}

// Plays a nice beep sound for correct answers
void correctTone() {
  tone(8, 2000, 20);
}

// Plays an error sound for incorrect answers
void incorrectTone() {
  tone(8, 1000, 20);
  delay(250);
  tone(8, 500, 20);
}
