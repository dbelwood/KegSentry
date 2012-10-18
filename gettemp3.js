var bb = require('./node_modules/bonescript');
var fs = require('fs');
//var record=require('./record');
var Recorder = require('./recorder');
var record = new Recorder('1234', '2345');
	
var ledPin = bone.P8_21;
var ledPin2 = bone.P8_25;
var ledPin3 = bone.P8_29;

var data = "temp";
var temp = "temp";
var pourStart = 0;
var pourFinish = 0;
var pourStarted = false;
var pourFinished = true;
var roomtemp = 78;
var lasttemp = 72;
var Nsamples = 10;
var samples = 0;
var delay = 5000;

lightleds = function(t) {
    if (((t - lasttemp) < -0.115) || ((t - lasttemp) > 0.115))
    {
        digitalWrite(ledPin2, LOW);
        //restart the samples
        samples = 0;
         //temperature is changing thus not roomtemp
        if (t >= lasttemp)
        {
            digitalWrite(ledPin3, HIGH);
            digitalWrite(ledPin, LOW);
            if (pourStarted)
            {
                pourStarted = false;
                pourFinished = true;
                var ts = new Date;
                pourFinish = ts.getTime();
                record.addTemperature(t, pourFinish);
                record.addPour(t, ((pourFinish - pourStart)/1000), pourFinish);
                console.log ("pourFinished at: " + ts + "pour time = " + (pourFinish - pourStart)/1000 + "s" + " Beer Temp " + t);
            };
        }else
        {
            digitalWrite(ledPin3, LOW);
            digitalWrite(ledPin, HIGH);
            if (pourFinished)
            {
                pourStarted = true;
                pourFinished = false;
                var ts = new Date;
                pourStart = ts.getTime();
                console.log ("pourStarted at: " + ts);
            };
        }
    }else
    {

        samples +=1;
        if (samples >= Nsamples)
        {
            //set new room temp
            roomtemp = t;
            samples = 0;
            digitalWrite(ledPin2, HIGH);
            digitalWrite(ledPin3, LOW);
            digitalWrite(ledPin, LOW);
            console.log ("Spout Temp " + t);
            // if we reached temperature stability then we should stop the pour timer
            if (pourStarted)
            {
                pourStarted = false;
                pourFinished = true;
                var ts = new Date;
                pourFinish = ts.getTime();
                record.addTemperature(t, pourFinish);
                record.addPour(t, ((pourFinish - pourStart)/1000), pourFinish);
                console.log ("pourFinished at: " + ts + "pour time = " + (pourFinish - pourStart)/1000 + "s");
                //record.recordTemp(t);
            };
        }
    }
    lasttemp = t;
    record.addTemperature(t, pourFinish);
    console.log ("Current: ", + t + " Last: " + lasttemp + " Room: " + roomtemp + " samples: " + samples);
    return;
};


setup = function() {
    pinMode(ledPin, OUTPUT);
    pinMode(ledPin2, OUTPUT);
    pinMode(ledPin3, OUTPUT);

    digitalWrite(ledPin2, HIGH);
    digitalWrite(ledPin, LOW);
    digitalWrite(ledPin3, LOW);
    var fileData =
            "/sys/bus/w1/devices/28-000004144e2f/w1_slave";
    var readData = function(fd) {
        fs.readFile(fileData, function(err, data) {
            if(err) console.log("Unable to read data: " + err);
            temp = String(data);
            var parsedtemp = temp.split("=");
            tempvalC = parsedtemp[2]/1000;
            tempvalF = tempvalC*1.8 + 32;
            //console.log ("temp: " + tempvalC +"C " + tempvalF +"F");
            lightleds(tempvalF);
            return tempvalF;
        });
        setTimeout(readData, delay);
    };
    var readTemp = function(fd) {
        fs.readFile(fileData, function(err, data) {
            if(err) console.log("Unable to read data: " + err);
            temp = String(data);
            var parsedtemp = temp.split("=");
            tempvalC = parsedtemp[2]/1000;
            tempvalF = tempvalC*1.8 + 32;
            return tempvalF;
        });
    };
    roomtemp = readTemp(0);
    lasttemp = roomtemp;
    setTimeout(readData, delay);
    console.log("setup complete");
};

/*loop = function() {

    digitalWrite(ledPin, HIGH);
    //digitalWrite(ledPin2, HIGH);
    digitalWrite(ledPin3, LOW);
    console.log("green led");
    delay(1000);
    digitalWrite(ledPin, LOW);
    //digitalWrite(ledPin2, LOW);
    digitalWrite(ledPin3, HIGH);
    console.log("red led");
    delay(250);
};*/

bb.run();