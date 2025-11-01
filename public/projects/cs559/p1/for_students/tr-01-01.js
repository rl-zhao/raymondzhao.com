/*jshint esversion: 6 */
// @ts-check

// these two things are the main UI code for the train
// students learned about them in last week's workbook

import { draggablePoints } from "../libs/CS559/dragPoints.js";
import { RunCanvas } from "../libs/CS559/runCanvas.js";

// this is a utility that adds a checkbox to the page
// useful for turning features on and off
import { makeCheckbox } from "../libs/CS559/inputHelpers.js";

// Register the sliders for each parameter that we want to control
const sliderVals = {
}

/**
 * Registers a slider to control a parameter.
 * This would be really useful if I ended up having to use it more than once...
 */
function registerSlider(name, initialValue) {
  let slider = document.getElementById(name);
  if(!(slider instanceof HTMLInputElement))
    throw new Error("slider is not an HTMLInputElement");

  let sliderLabel = document.getElementById(name + "-label");

  slider.value = initialValue;
  sliderVals[name] = initialValue;

  slider.oninput = () => {
    sliderVals[name] = Number(slider.value);
    sliderLabel.innerText = sliderVals[name];
    wrapDraw();
  };
}

registerSlider("tension", 0);


/**
 * Have the array of control points for the track be a
 * "global" (to the module) variable
 *
 * Note: the control points are stored as Arrays of 2 numbers, rather than
 * as "objects" with an x,y. Because we require a Cardinal Spline (interpolating)
 * the track is defined by a list of points.
 *
 * things are set up with an initial track
 */
/** @type Array<number[]> */
let thePoints = [
  [300, 50],
  [200, 150],
  [150, 500],
  [450, 500],
  [400, 150],
];

let smoke = [];

/**
 * Draw function - this is the meat of the operation
 *
 * It's the main thing that needs to be changed
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} param
 */
function draw(canvas, param) {
  let context = canvas.getContext("2d");
  // clear the screen
  context.clearRect(0, 0, canvas.width, canvas.height);

  // black points
  context.fillStyle = "black";
  // draw the control points
  thePoints.forEach(function(pt) {
    context.beginPath();
    context.arc(pt[0], pt[1], 5, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  });

  const derivs = thePoints.map((pt, i) => {
    return getCardinalSplineDeriv(
        thePoints[i === 0 ? (thePoints.length - 1) : (i - 1)],
        thePoints[(i + 1) % thePoints.length],
        sliderVals.tension
    );
  });

  // SIMPLE TRACK
  let simpleTrackCheckbox = document.getElementById("check-simple-track");
  if(!(simpleTrackCheckbox instanceof HTMLInputElement))
    throw new Error("simpleTrackCheckbox is not an HTMLInputElement");

  let simpleTrack = simpleTrackCheckbox.checked;

  const spline = (t) => fullCardinalSpline(t, thePoints, derivs);
  const approximations = generateApproximations(spline, thePoints.length, 0.005);

  if(simpleTrack) {
    context.beginPath();
    // move to first point
    context.moveTo(thePoints[0][0], thePoints[0][1]);

    // draw the cardinal spline
    for(let i = 0; i < thePoints.length; i++) {
      const nextPt = thePoints[(i + 1) % thePoints.length];
      const nextDeriv = derivs[(i + 1) % thePoints.length];
      const cp1 = [thePoints[i][0] + derivs[i][0], thePoints[i][1] + derivs[i][1]];
      const cp2 = [nextPt[0] - nextDeriv[0], nextPt[1] - nextDeriv[1]];
      context.bezierCurveTo(
          cp1[0], cp1[1],
          cp2[0], cp2[1],
          nextPt[0], nextPt[1]
      );
    }

    context.closePath();
    context.lineWidth = 3;
    context.stroke();
  }
  else {
    // draw track (rail ties)
    // calculate number of rail ties (one every 25px or so)
    let trackLength = approximations[approximations.length - 1][2];
    let numTies = Math.floor(trackLength / 25);

    // better too many than too few - draw one extra to make the track look better
    for(let i = 0; i <= numTies; i++) {
      let t = i * 25 * thePoints.length / trackLength;
      let pt = reparametrize(spline, approximations, t, thePoints.length);
      context.fillStyle = "brown";
      // draw beams
      context.save();
      context.translate(pt[0], pt[1]);

      // approximate tangent vector of the curve and rotate according to it
      let prev = reparametrize(spline, approximations, wrapT(t - 0.01, thePoints.length), thePoints.length);
      let future = reparametrize(spline, approximations, wrapT(t + 0.01, thePoints.length), thePoints.length);
      context.rotate(Math.atan2(future[1] - prev[1], future[0] - prev[0]));
      context.fillRect(-2, -10, 4, 20);
      context.restore();
    }

    // draw parallel track lines
    // right track
    const drawTrack = (offset) => {
      context.beginPath();
      context.moveTo(thePoints[0][0], thePoints[0][1]);

      for(let i = 0; i < approximations.length; i++) {
        let curApprox = approximations[i];
        let pt = spline(curApprox[0]);
        let next = spline(approximations[(i + 1) % approximations.length][0]);

        let angle = Math.atan2(next[1] - pt[1], next[0] - pt[0]);
        // move 5px parallel to the angle
        let dx = Math.cos(angle + Math.PI / 2) * offset;
        let dy = Math.sin(angle + Math.PI / 2) * offset;
        if(i === 0) {
          context.moveTo(pt[0] + dx, pt[1] + dy);
        } else {
          context.lineTo(pt[0] + dx, pt[1] + dy);
        }
      }

      context.closePath();
      context.lineWidth = 1;
      context.stroke();
    }

    drawTrack(5);
    drawTrack(-5);
  }

  // draw train cart itself
  // current position:
  let pos, prevPos, futurePos;

  if(document.getElementById("check-arc-length").checked) {
    pos = reparametrize(spline, approximations, param, thePoints.length);
    prevPos = reparametrize(spline, approximations, Math.max(0, param - 0.01), thePoints.length);
    futurePos = reparametrize(spline, approximations, (param + 0.01) % thePoints.length, thePoints.length);
  } else {
    pos = spline(param);
    prevPos = spline(wrapT(param - 0.01, thePoints.length));
    futurePos = spline(wrapT(param + 0.01, thePoints.length));
  }

  context.save();
  context.translate(pos[0], pos[1]);
  // approximate tangent vector
  context.rotate(Math.atan2(futurePos[1] - prevPos[1], futurePos[0] - prevPos[0]));
  context.fillStyle = "black";
  context.fillRect(-10, -5, 20, 10);

  // draw light
  context.save();

  context.fillStyle = "rgba(255, 255, 0, 0.5)";
  context.translate(10, 0);
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(20, 10);
  context.lineTo(20, -10);
  context.closePath();
  context.fill();

  context.restore();

  context.restore();

  // calculate reparametrized t
  let cur_t = param;
  // convert cur_t to arc-length if not already
  if(!document.getElementById("check-arc-length").checked) {
    cur_t = reverseReparametrize(approximations, cur_t, thePoints.length);
  }

  let totalLength = approximations[approximations.length - 1][2];
  let t_delta = 25 / totalLength * thePoints.length;

  cur_t = wrapT(cur_t - t_delta, thePoints.length);

  // draw second train cart behind main one
  let secondPoint = reparametrize(spline, approximations, cur_t, thePoints.length);

  let secondPrev = reparametrize(spline, approximations, wrapT(cur_t - 0.01, thePoints.length), thePoints.length);
  let secondFuture = reparametrize(spline, approximations, wrapT(cur_t + 0.01, thePoints.length), thePoints.length);

  context.save();
  context.translate(secondPoint[0], secondPoint[1]);

  context.rotate(Math.atan2(secondFuture[1] - secondPrev[1], secondFuture[0] - secondPrev[0]));
  context.fillStyle = "black";
  context.fillRect(-10, -5, 20, 10);

  context.restore();

  // draw third train cart behind main one

  cur_t = wrapT(cur_t - t_delta, thePoints.length);

  // draw third train cart behind main one
  let thirdPoint = reparametrize(spline, approximations, cur_t, thePoints.length);

  let thirdPrev = reparametrize(spline, approximations, wrapT(cur_t - 0.01, thePoints.length), thePoints.length);
  let thirdFuture = reparametrize(spline, approximations, wrapT(cur_t + 0.01, thePoints.length), thePoints.length);

  context.save();
  context.translate(thirdPoint[0], thirdPoint[1]);

  context.rotate(Math.atan2(thirdFuture[1] - thirdPrev[1], thirdFuture[0] - thirdPrev[0]));
  context.fillStyle = "black";
  context.fillRect(-10, -5, 20, 10);

  context.restore();

  // draw smoke
  if(document.getElementById("check-smoke").checked) {
    if(Math.random() < 0.1) {
      let dx = Math.random() - 0.5;
      let dy = Math.random() - 0.5;
      smoke.push([pos[0], pos[1], 5, dx, dy]);
    }

    for(let i = 0; i < smoke.length; i++) {
      let s = smoke[i];
      context.fillStyle = `rgba(100, 100, 100, ${0.7 - s[2] / 30})`;
      context.beginPath();
      context.arc(s[0], s[1], s[2], 0, Math.PI * 2);
      context.closePath();
      context.fill();
      s[2] += 0.1;

      s[0] += s[3];
      s[1] += s[4];

      if(s[2] > 15) {
        // delete this smoke
        smoke.splice(i, 1);
      }
    }
  }
}

function wrapT(t, maxT) {
  if(t < 0) return maxT + t;
  return t % maxT;
}

// Catmull-Rom Cardinal Spline derivative
function getCatmullRomDeriv(lastPt, nextPt) {
  return getCardinalSplineDeriv(lastPt, nextPt, 0);
}

function getCardinalSplineDeriv(lastPt, nextPt, tension) {
  let s = (1 - tension) / 2;
  return [(nextPt[0] - lastPt[0]) * s / 3, (nextPt[1] - lastPt[1]) * s / 3];
}

// parametric equation for a cubic bezier curve
function bezierParametric(t, start, cp1, cp2, end) {
  return [
    ((1 - t) ** 3) * start[0]
    + 3 * ((1 - t) ** 2) * t * cp1[0]
    + 3 * (1 - t) * (t ** 2) * cp2[0]
    + (t ** 3) * end[0],
    ((1 - t) ** 3) * start[1]
    + 3 * ((1 - t) ** 2) * t * cp1[1]
    + 3 * (1 - t) * (t ** 2) * cp2[1]
    + (t ** 3) * end[1]
  ];
}

// parametric equation for the full cardinal spline
// runs from t=0 to t=(num points)
function fullCardinalSpline(t, points, derivs) {
  for(let i = 0; i < thePoints.length; i++) {
    if(t < i + 1) {
      return bezierParametric(
        t - i,
        points[i],
        [points[i][0] + derivs[i][0], points[i][1] + derivs[i][1]],
        [points[(i + 1) % points.length][0] - derivs[(i + 1) % points.length][0], points[(i + 1) % points.length][1] - derivs[(i + 1) % points.length][1]],
        points[(i + 1) % points.length]
      );
    }
  }
}

function generateApproximations(fullSpline, numPoints, step) {
  let approximations = [];

  let lastX = thePoints[0][0];
  let lastY = thePoints[0][1];
  let totalDist = 0;

  for(let t = 0; t < numPoints; t += step) {
    let [x, y] = fullSpline(t);
    let dist = Math.sqrt((lastX - x) ** 2 + (lastY - y) ** 2);
    totalDist += dist;
    approximations.push([t, dist, totalDist]);
    [lastX, lastY] = [x, y];
  }

  return approximations;
}

function reparametrize(fullSpline, approximations, t, numPoints) {
  // target distance
  let target = approximations[approximations.length - 1][2] * t / numPoints;

  let i = 0;
  while(approximations[i][2] < target) {
    i++;
  }
  // if i = 0 (first point) interpolate between point 0 and 1 instead in approximations
  // to avoid out of bounds error
  // this will just give back the first point (t=0)
  if(i === 0) i = 1;

  // linearly interpolate
  let dist = (target - approximations[i - 1][2]) / (approximations[i][2] - approximations[i - 1][2]);
  let reparametrized_t = (1 - dist) * approximations[i - 1][0] + dist * approximations[i][0];
  return fullSpline(reparametrized_t);
}

function reverseReparametrize(approximations, t, numPoints) {
  // t = target time
  let i = 0;
  while(approximations[i][0] < t) {
    i++;
  }

  if(i === 0) i = 1;

  // linearly interpolate
  let betweenage = (t - approximations[i - 1][0]) / (approximations[i][0] - approximations[i - 1][0]);
  let total_dist = (1 - betweenage) * approximations[i - 1][2] + betweenage * approximations[i][2];

  return total_dist * numPoints / approximations[approximations.length - 1][2];
}

/**
 * Initialization code - sets up the UI and start the train
 */
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext("2d");

// we need the slider for the draw function, but we need the draw function
// to create the slider - so create a variable and we'll change it later
let slider; // = undefined;
let sliderInput;

// note: we wrap the draw call so we can pass the right arguments
function wrapDraw() {
    // do modular arithmetic since the end of the track should be the beginning
    draw(canvas, Number(sliderInput.value) % thePoints.length);
}
// create a UI
let runcanvas = new RunCanvas(canvas, wrapDraw);
// now we can connect the draw function correctly
// I added runcanvas.text, because if we take the value from
// the slider, it will be forced to be in steps of 0.05, which makes the train look really choppy.
slider = runcanvas.range;
sliderInput = runcanvas.text;

// note: if you add these features, uncomment the lines for the checkboxes
// in your code, you can test if the checkbox is checked by something like:
// document.getElementById("check-simple-track").checked
// in your drawing code
// WARNING: makeCheckbox adds a "check-" to the id of the checkboxes
//
// lines to uncomment to make checkboxes
let stCheckbox = makeCheckbox("simple-track");
stCheckbox.onchange = wrapDraw;
makeCheckbox("arc-length").checked=true;
makeCheckbox("smoke").checked=true;
//makeCheckbox("bspline");

// helper function - set the slider to have max = # of control points
function setNumPoints() {
    runcanvas.setupSlider(0, thePoints.length, 0.05);
}

setNumPoints();
runcanvas.setValue(0);

// add the point dragging UI
draggablePoints(canvas, thePoints, wrapDraw, 10, setNumPoints);
