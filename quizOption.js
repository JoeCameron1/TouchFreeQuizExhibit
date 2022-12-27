// quizOption.js
// Author = Joseph Manfredi Cameron
// Defines a single quiz option (out of 4 available options)

function quizOption(optionText, tag, x, y, optionWidth, optionHeight) {

    this.optionText = optionText;
    this.tag = tag;
    this.x = x;
    this.y = y;
    this.optionWidth = optionWidth;
    this.optionHeight = optionHeight;
    this.optionColour = '#4FC3F7';
    this.highlightedColour = '#FF9248';
    this.currentColour = this.optionColour;

    this.show = function() {
        push();
        fill(this.currentColour);
        noStroke();
        rect(this.x, this.y, this.optionWidth, this.optionHeight);
        fill(0);
        textAlign(LEFT, CENTER);
        text(this.optionText, this.x + 25, this.y + 25);
        pop();
    }

    this.highlight = function() {
        this.currentColour = this.highlightedColour;
    }

    this.lowlight = function() {
        this.currentColour = this.optionColour;
    }

    // For possible mouse interaction
    this.contains = function(mousePos) {
        return ((this.x < mousePos.x) && (this.x + this.optionWidth > mousePos.x) && (this.y < mousePos.y) && (this.y + this.optionHeight > mousePos.y));
    }

}
