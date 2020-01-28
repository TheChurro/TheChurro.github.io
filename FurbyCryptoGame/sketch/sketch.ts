
class GameResources {
  // Game resources
  furby : p5.Image;
  constructor() {
    this.furby = loadImage("resources/furby.png")
  }
}

class GameUI {
  canvas : p5.Renderer;
  // Setup UI
  player_name: TextBox;
  greeting : p5.Element;
  // Play UI
  name_text : p5.Element;
  score_text : p5.Element;
  play_button : p5.Element;
  constructor() {
    this.canvas = createCanvas(windowWidth, windowHeight);
    this.canvas.position(0, 0);
    this.canvas.style('z-index', '-1');

    this.greeting = createP("Please type your name and press enter!");
    this.player_name = make_input();
    this.player_name.changed(start_game);

    this.name_text = createP("");
    this.score_text = createP("");
    this.play_button = createButton("Mine Furbycoins!");
    this.play_button.mousePressed(mine_furbies);
    this.hide_play();
  }
  hide_setup() {
    this.greeting.hide();
    this.player_name.hide();
  }
  show_setup() {
    this.greeting.show();
    this.player_name.show();
  }
  hide_play() {
    this.name_text.hide();
    this.score_text.hide();
    this.play_button.hide();
  }
  show_play() {
    this.name_text.show();
    this.score_text.show();
    this.play_button.show();
  }
}

class Position {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class GameState {
  // Running state
  started : boolean = false;
  ended : boolean = false;
  // Game elements
  score : number = 0;
  furby_positions : Position[] = [];
  noiseR : number = 0;
  noiseG : number = 0;
  noiseB : number = 0;
  randomize_noise() {
    this.noiseR = random(1);
    this.noiseG = random(1);
    this.noiseB = random(1);
  }
}

function start_game() {
  game_state.started = true;
  game_ui.hide_setup();
  game_ui.show_play();
}

let game_resources : GameResources;
let game_ui : GameUI;
let game_state : GameState;

function preload() {
  game_resources = new GameResources();
}
function setup() {
  game_ui = new GameUI();
  game_state = new GameState();
  imageMode(CENTER);
}

function update() {
  game_ui.name_text.html("Hi " + game_ui.player_name.value());
  game_ui.score_text.html("You've generated $" + game_state.score * 10 + " Furbycoins!");
}

function mine_furbies() {
  game_state.score++;
  game_state.furby_positions.push(new Position(random(width), random(height)));
  if (game_state.score >= 100) {
    game_state.started = false;
    game_state.ended = true;
    game_state.randomize_noise();
    game_ui.hide_play();
  }
}

function draw() {
  background(150);
  if (game_state.started) {
    update();
    for (let i = 0; i < game_state.furby_positions.length; i++) {
      let pos = game_state.furby_positions[i];
      image(game_resources.furby, pos.x, pos.y);
      pos.x += random(-5, 5);
      pos.y += random(-5, 5);
    }
  } else if (game_state.ended) {
    background(
      255 * noise(game_state.noiseR),
      255 * noise(game_state.noiseG),
      255 * noise(game_state.noiseB)
    );
    game_state.noiseR += random(0.0001) * deltaTime;
    game_state.noiseG += random(0.0003) * deltaTime;
    game_state.noiseB += random(0.0005) * deltaTime;
  }
}
