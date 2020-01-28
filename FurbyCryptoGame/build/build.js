var GameResources = (function () {
    function GameResources() {
        this.furby = loadImage("resources/furby.png");
    }
    return GameResources;
}());
var GameUI = (function () {
    function GameUI() {
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
    GameUI.prototype.hide_setup = function () {
        this.greeting.hide();
        this.player_name.hide();
    };
    GameUI.prototype.show_setup = function () {
        this.greeting.show();
        this.player_name.show();
    };
    GameUI.prototype.hide_play = function () {
        this.name_text.hide();
        this.score_text.hide();
        this.play_button.hide();
    };
    GameUI.prototype.show_play = function () {
        this.name_text.show();
        this.score_text.show();
        this.play_button.show();
    };
    return GameUI;
}());
var Position = (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    return Position;
}());
var GameState = (function () {
    function GameState() {
        this.started = false;
        this.ended = false;
        this.score = 0;
        this.furby_positions = [];
        this.noiseR = 0;
        this.noiseG = 0;
        this.noiseB = 0;
    }
    GameState.prototype.randomize_noise = function () {
        this.noiseR = random(1);
        this.noiseG = random(1);
        this.noiseB = random(1);
    };
    return GameState;
}());
function start_game() {
    game_state.started = true;
    game_ui.hide_setup();
    game_ui.show_play();
}
var game_resources;
var game_ui;
var game_state;
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
        for (var i = 0; i < game_state.furby_positions.length; i++) {
            var pos = game_state.furby_positions[i];
            image(game_resources.furby, pos.x, pos.y);
            pos.x += random(-5, 5);
            pos.y += random(-5, 5);
        }
    }
    else if (game_state.ended) {
        background(255 * noise(game_state.noiseR), 255 * noise(game_state.noiseG), 255 * noise(game_state.noiseB));
        game_state.noiseR += random(0.0001) * deltaTime;
        game_state.noiseG += random(0.0003) * deltaTime;
        game_state.noiseB += random(0.0005) * deltaTime;
    }
}
function make_input() {
    var input = createInput("");
    if ("changed" in input) {
        return input;
    }
}
//# sourceMappingURL=build.js.map