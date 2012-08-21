var bb = require('./node_modules/bonescript');


ledPin = bone.P8_21;
ledPin2 = bone.P8_25;
ledPin3 = bone.P8_29;

setup = function() {
    pinMode(ledPin, OUTPUT);
    pinMode(ledPin2, OUTPUT);
    pinMode(ledPin3, OUTPUT);
    //pinMode(temp, INPUT);
    
    digitalWrite(ledPin2, LOW);
    console.log("setup complete");
};

loop = function() {
    digitalWrite(ledPin, HIGH);
    digitalWrite(ledPin2, LOW);
    digitalWrite(ledPin3, LOW);
    console.log("green led");
    delay(250);
    digitalWrite(ledPin, LOW);
    digitalWrite(ledPin2, HIGH);
    digitalWrite(ledPin3, LOW);
    console.log("yellow led");
    delay(250);
    digitalWrite(ledPin, LOW);
    digitalWrite(ledPin2, LOW);
    digitalWrite(ledPin3, HIGH);
    console.log("red led");
    delay(250);
};

bb.run();