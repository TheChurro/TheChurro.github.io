// https://kylemcdonald.github.io/cv-examples/
// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2

let capture;
let tracker;
let time = 0;

let w = 640;
let h = 480;

let charges = [];
let time_open = 0;
let time_til_next = 5;
let has_fired = false;
const fire_time = 5000;
const max_stay_time = 500;
const min_stay_time = 100;

function setup() {
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();
    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);


}

const mouth_start = 56;
const mouth_len = 6;
const lip_start = 44;
const lip_len = 12;
// lip outline: 44-55
// mouth outline: 56-61

function tri(a, b, c) {
  triangle(a[0], a[1], b[0], b[1], c[0], c[1]);
}

function get_centroid(points, min, len) {
  let center_x = 0;
  let center_y = 0;
  for (let i = 0; i < len; i++) {
    center_x += points[min + i][0];
    center_y += points[min + i][1];
  }
  return createVector(center_x / len, center_y / len);
}

function get_circle(points, min, len) {
  let center = get_centroid(points, min, len);
  let radius = 0;
  for (let i = 0; i < len; i++) {
    let disp_x = points[min + i][0] - center.x;
    let disp_y = points[min + i][1] - center.y;
    radius = max(radius, sqrt(disp_x * disp_x + disp_y * disp_y));
  }
  return [center, radius];
}

function draw() {
    imageMode(CORNERS);
    image(capture, 0, 0, width, height);
    let positions = tracker.getCurrentPosition();
    imageMode(CENTER);
    noFill();
    stroke(255);
    strokeWeight(1);

    if (positions.length > 61) {
      time += deltaTime / 1000;

      let mouth_bottom = createVector(positions[57][0], positions[57][1]);
      let mouth_top = createVector(positions[60][0], positions[60][1]);
      let opening_amount = mouth_bottom.dist(mouth_top);

      for (let i = 0; i < 6; i++) {
        let idx = mouth_start + mouth_len - 1 - i;
        let prev = mouth_start + mouth_len - 1 - ((i + 5) % 6);
        let lip_index_0 = lip_start + i * 2;
        let lip_index_1 = lip_start + (i * 2 + 1) % lip_len;
        let lip_index_2 = lip_start + (i * 2 + 2) % lip_len;
        fill(map(3 * i, 0, 18, 0, 360), 50, 100);
        stroke(map(3 * i, 0, 18, 0, 360), 50, 100);
        tri(positions[idx], positions[prev], positions[lip_index_0]);
        fill(map(3 * i + 1, 0, 18, 0, 360), 50, 100);
        stroke(map(3 * i + 1, 0, 18, 0, 360), 50, 100);
        tri(positions[idx], positions[lip_index_0], positions[lip_index_1]);
        fill(map(3 * i + 2, 0, 17, 0, 360), 50, 100);
        stroke(map(3 * i + 2, 0, 18, 0, 360), 50, 100);
        tri(positions[idx], positions[lip_index_1], positions[lip_index_2]);
      }
      noFill();
      stroke(255);
      beginShape();
      for (let i = lip_start; i < lip_start + lip_len; i++) {
        vertex(positions[i][0], positions[i][1]);
      }
      endShape(CLOSE);
      let mouth_circle = get_circle(positions, mouth_start, mouth_len);
      if (opening_amount > 10.0) {
        fill(0 + 30 * noise(time * 20 * time_open / fire_time), 255, 255);
        time_open += deltaTime;
        time_til_next -= deltaTime;
        if (time_til_next <= 0 && time_open < fire_time) {
          time_til_next = random(50, map(time_open, 0, fire_time, 60, 500));
          let small_radius = random(mouth_circle[1] / 2, mouth_circle[1]);
          let large_radius = random(mouth_circle[1] * 4, mouth_circle[1]);
          let angle = random(TWO_PI);
          let offset = createVector(cos(angle), sin(angle));
          charges.push([
            p5.Vector.add(mouth_circle[0], p5.Vector.mult(offset, small_radius)),
            p5.Vector.add(mouth_circle[0], p5.Vector.mult(offset, large_radius)),
            random(min_stay_time, max_stay_time) + deltaTime,
            color(random(-15, 30), 255, 255)
          ]);
        }
      } else {
        time_open = 0;
        has_fired = false;
        charges = [];
      }
      beginShape();
      for (let i = mouth_start; i < mouth_start + mouth_len; i++) {
        vertex(positions[i][0], positions[i][1]);
      }
      endShape(CLOSE);

      let new_charges = [];
      charges.forEach((item, i) => {
        let cur_time = item[2] - deltaTime;
        if (cur_time > 0) {
          new_charges.push([item[0], item[1], cur_time, item[3]]);
          stroke(item[3]);
          strokeWeight((10 + cur_time) / min_stay_time);
          line(item[0].x, item[0].y, item[1].x, item[1].y);
        }
      });
      if (time_open > fire_time) {
        let line_center = get_centroid([positions[mouth_start + 1], positions[mouth_start + 4]], 0, 2);
        let fire_direction = p5.Vector.sub(line_center, mouth_circle[0]);
        fire_direction.normalize();
        let fire_end = p5.Vector.add(mouth_circle[0], p5.Vector.mult(fire_direction, 1000));
        strokeWeight(2 * mouth_circle[1]);
        stroke(0, 255, 255);
        line(fire_end.x, fire_end.y, mouth_circle[0].x, mouth_circle[0].y);
      } else {
        noStroke();
        fill(0, 255, 255);
        rect(0, height - 20, width * time_open / fire_time, height);
      }
      charges = new_charges;
    }
}
