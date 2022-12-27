// countFingers.js
// Author = Joseph Manfredi Cameron
// This file contains helper functions for
// counting the number of fingers held by users.

function getDigit(points) {
    if (points.length > 0) {
      const x1 = points[0][0];
      const y1 = points[0][1];
      const x2 = points[points.length-1][0];
      const y2 = points[points.length-1][1];
      return calculateFingerLength(x1, y1, x2, y2);
    }
  }
  
  function calculateFingerLength(x1, y1, x2, y2) {
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt(x * x + y * y);
  }
  
  function countFingers(fLengths) {
    let count = 0;
    fLengths.pop(); // Gets rid of empty last reading
    fLengths.shift(); // Remove thumb digit from reading (gets rid of first reading)
    if (fLengths.length > 0) {
      let longest = Math.max.apply(Math, fLengths);
      fLengths = fLengths.map((fLength) => getPercentage(fLength, longest));
      for (let i = 0; i < fLengths.length; i++) {
        if (fLengths[i] > 60) {
          count++;
        }
      }
      return count;
    } else {
      return 0;
    }
  }
  
  function getPercentage(x, y) {
    return ((x/y) * 100);
  }
