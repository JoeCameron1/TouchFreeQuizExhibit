// response.js
// Author = Joseph Manfredi Cameron
// Defines the response dialog

function response(correct, canvasWidth, canvasHeight) {

    if (correct) {
        this.col = "#ADFF2F";
        this.responseText = "Correct!";
    } else {
        this.col = "#FF0000";
        this.responseText = "Incorrect.";
    }
    
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = 100;
    this.growthSpeed = 20;

    this.grow = function() {
        this.width += this.growthSpeed;
    };

    this.show = function() {
        if (this.width < 200) {
            push();
            fill(this.col);
            strokeWeight(10);
            stroke(this.col);
            rectMode(CENTER);
            rect(this.canvasWidth/2, this.canvasHeight/2, this.width, this.width);
            fill(0);
            textAlign(CENTER);
            text(this.responseText, this.canvasWidth/2, this.canvasHeight/2);
            pop();
        }
    };

}
