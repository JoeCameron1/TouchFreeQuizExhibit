# Touch-Free Museum Quiz Exhibit

This exhibit was inspired by the circumstances presented during the COVID-19 global pandemic and was created by me, Joseph Manfredi Cameron, for an assignment in the Interactive Software & Hardware (CS5041) module at the University of St Andrews.

A **report** of this project's details, software and hardware specifications, and creation can be found [here](Report/CS5041-P2-Report.pdf).

## Abstract
This project’s aim was to create a museum exhibit where visitors can participate in and interact with a multiple-choice quiz without having to touch anything.
Visitors can achieve this solely by showing their hands to a camera to answer questions and by hovering their hands over a photoresistor sensor to perform confirmation actions.
The main motivation for creating this exhibit to be touch-free and to not require any contact with buttons or the like was to develop a museum exhibit that can reduce the potential for contamination spread.
The need for this type of exhibit in busy public settings such as museums has been highlighted by the COVID-19 global pandemic where it is necessary to limit the spread of the virus.
This exhibit was developed using the [p5.js JavaScript software library](https://p5js.org) and the [Arduino Uno microcontroller](https://www.arduino.cc).
The software developed in p5.js acts as both an input and an output for the exhibit, where a screen displays the quiz screen as an output, and a camera collects images from which the software can detect the number of fingers a visitor is holding up.
Similarly, the hardware controlled by the Arduino also serve as inputs and outputs of the exhibit.

## How to run the Touch-Free Museum Quiz Exhibit
* Arduino Code:
First, upload the [ArduinoCode.ino](ArduinoCode/ArduinoCode.ino) file to an Arduino Uno micro controller connected to the circuit specified in the [project report](Report/CS5041-P2-Report.pdf).
* Exhibit Browser Code:
Run the [index.html](index.html) file on a web browser.
Make sure to run this application on a local server (ie. using http:// rather than file://) in order to correctly ensure access between all the Javascript and JSON files. NOTE: 1. You must also have [p5.serialcontrol](https://github.com/p5-serial/p5.serialcontrol/releases) running at the same time in order to allow the serial connection between p5.js and the Arduino to work. 2. Also, you must update lines 8 and 50 in the [sketch.js](sketch.js) file with your computer's details (as your computer will be different from the one I developed this on).

## Video
A brief video demonstration of this touch-free museum quiz exhibit can be accessed by clicking on the preview image below or by clicking [here](https://youtu.be/Fwh_4_8Kooo).

[![Watch the video](https://img.youtube.com/vi/Fwh_4_8Kooo/hqdefault.jpg)](https://youtu.be/Fwh_4_8Kooo)
