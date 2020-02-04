import * as React from "react";

import p5 from "p5";
import Sketch from "react-p5";
import DashboardCard, { DashboardCardProps } from "./DashboardCard";

export interface DashboardCardBoxProps {
};
export interface DashboardCardBoxState {
  cards: DashboardCardProps[]
};

const playerWidth: number = 50;
const playerHeight: number = 50;
const googleTime: number = 5000;

function overlap(
  rect0x: number, rect0y: number, rect0w: number, rect0h: number,
  rect1x: number, rect1y: number, rect1w: number, rect1h: number
): boolean {
  return rect0x < rect1x + rect1w && rect0y < rect1y + rect1h &&
         rect1x < rect0x + rect0w && rect1y < rect0y + rect0h;
}

function drawGoogle(p5: any, x: number, y: number) {
  p5.noStroke();
  p5.fill(247, 181, 41);
  p5.rect(x, y, playerWidth / 2, playerHeight / 2);
  p5.fill(255, 62, 48);
  p5.rect(x + playerWidth / 2, y, playerWidth / 2, playerHeight / 2);
  p5.fill(23, 156, 82);
  p5.rect(x, y + playerHeight / 2, playerWidth / 2, playerHeight / 2);
  p5.fill(23, 107, 239);
  p5.rect(x + playerWidth / 2, y + playerHeight / 2, playerWidth / 2, playerHeight / 2);
  p5.stroke(255);
  p5.noFill();
  p5.rect(x, y, playerWidth, playerHeight);
}

export default class DashboardCardBox extends React.Component<DashboardCardBoxProps, DashboardCardBoxState> {
  canvas: p5.Renderer | undefined;
  playerX: number;
  playerY: number;
  velX: number;
  velY: number;
  googleMode: boolean;
  googleIndex: number;
  timeElapsed: number;
  constructor(props: DashboardCardBoxProps) {
    super(props)
    this.playerX = 0;
    this.playerY = 0;
    this.velX = 0;
    this.velY = 0;
    this.googleMode = false;
    this.googleIndex = 0;
    this.timeElapsed = 0;
    this.state = {
      cards: [
        {
          uid: 0,
          cardColor: "rbg(69, 84, 164)",
          courseNickname: "Visual Language: On Images",
          courseName: "ARTV 10100 4,4 (Winter 2020) Visual Language: On Images",
          courseTerm: "2020.01",
          hasLoaded: false,
        },
        {
          uid: 1,
          cardColor: "#BD3C14",
          courseNickname: "Internet Censorship",
          courseName: "CMSC 33260 1 (Winter 2020) Internet Censorship and Online Speech",
          courseTerm: "2020.01",
          hasLoaded: false,
        },
        {
          uid: 2,
          cardColor: "#F06291",
          courseNickname: "Embodied Data",
          courseName: "MAAD 23640 1 (Winter 2020) Embodied Data and Gamified Interfaces",
          courseTerm: "2020.01",
          hasLoaded: false,
        },
        {
          uid: 3,
          cardColor: "rbg(69, 84, 164)",
          courseNickname: "Media Arts, Data, and Design Center",
          courseName: "MAAD Center",
          courseTerm: "ORG",
          hasLoaded: false,
        }
      ]
    }
  }

  setup = (p5: any, _canvasParentRef: Element) => {
    this.canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    if (this.canvas) {
      this.canvas.style('z-index', '10');
    }
  }

  playerHit(x: number, y: number, width: number, height: number): boolean {
    return overlap(this.playerX, this.playerY, playerWidth, playerHeight, x, y, width, height);
  }

  draw = (p5: any) => {
    if (this.canvas) {
      this.timeElapsed += p5.deltaTime;
      if (this.timeElapsed > googleTime) {
        this.timeElapsed = 0;
      }
      p5.clear();
      if (this.state.cards.every((x) => x.hasLoaded)) {
        return;
      }
      let box = p5.select('.ic-Layout-contentWrapper');
      let bWidth = box.width;
      let bHeight = box.height;
      if (bWidth !== p5.width || bHeight !== p5.height) {
        p5.resizeCanvas(bWidth, bHeight);
        this.playerX = bWidth - playerWidth;
        this.playerY = bWidth - playerHeight;
      }
      this.canvas.parent(box);
      this.canvas.position(0, 0);
      this.playerX += this.velX * p5.deltaTime / 100;
      this.playerY += this.velY * p5.deltaTime / 100;
      if (this.playerX < 0) { this.playerX = 0; }
      if (this.playerX + playerWidth > bWidth) { this.playerX = bWidth - playerWidth; }
      if (this.playerY < 0) { this.playerY = 0; }
      if (this.playerY + playerHeight > bHeight) { this.playerY = bHeight - playerHeight; }
      p5.noFill();
      p5.stroke(0);
      p5.strokeWeight(10);
      p5.rect(this.playerX, this.playerY, playerWidth, playerHeight);
      if (this.googleMode) {
        p5.noStroke();
        p5.fill(200, 200, 50);
        p5.rect(bWidth - playerWidth, 0, playerWidth, bHeight);
        if (this.playerHit(bWidth - playerWidth, 0, playerWidth, bHeight)) {
          this.setState({
            cards: this.state.cards.map((x) => {
              if (x.uid === this.googleIndex) {
                x.hasLoaded = true;
              }
              return x;
            })
          })
          if (this.state.cards.every((x) => x.hasLoaded)) {
            window.location.href = "https://canvas.uchicago.edu/";
          }
          this.googleMode = false;
        } else {
          let googleX: number = 3 * bWidth / 4;
          let googleY: number = bHeight / 2 * (1 + p5.sin(this.timeElapsed * 2 * p5.PI / googleTime));
          drawGoogle(p5, googleX, googleY);
          if (this.playerHit(googleX, googleY, playerWidth, playerHeight)) {
            this.googleMode = false;
          }
          // progressively more difficult.
          if (this.googleIndex < 3) {
            googleX = 5 * bWidth / 6;
            googleY = bHeight / 2 * (1 - p5.sin(this.timeElapsed * 4 * p5.PI / googleTime));
            drawGoogle(p5, googleX, googleY);
            if (this.playerHit(googleX, googleY, playerWidth, playerHeight)) {
              this.googleMode = false;
            }
          }
          if (this.googleIndex === 2 || this.googleIndex === 0) {
            googleX = bWidth / 2 + bHeight / 2 * p5.cos(this.timeElapsed * 2 * p5.PI / googleTime);
            googleY = bHeight / 2 * (1 - p5.sin(this.timeElapsed * 2 * p5.PI / googleTime));
            drawGoogle(p5, googleX, googleY);
            if (this.playerHit(googleX, googleY, playerWidth, playerHeight)) {
              this.googleMode = false;
            }
          }

          if (this.googleIndex === 0) {
            googleX = bWidth / 2 + bHeight / 2 * p5.cos(this.timeElapsed * 4 * p5.PI / googleTime);
            googleY = bHeight / 2 * (1 - p5.sin(this.timeElapsed * 2 * p5.PI / googleTime));
            drawGoogle(p5, googleX, googleY);
            if (this.playerHit(googleX, googleY, playerWidth, playerHeight)) {
              this.googleMode = false;
            }
          }
        }
      } else {
        let cards = p5.selectAll('.ic-DashboardCard');
        for (let i = 0; i < cards.length; i++) {
          let pos = cards[i].position();
          if (this.playerHit(pos.x, pos.y, cards[i].width, cards[i].height)) {
            let idStr = cards[i].id();
            let id = parseInt(idStr[idStr.length-1]);
            if (!this.state.cards[id].hasLoaded) {
              this.googleMode = true;
              this.googleIndex = id;
              return;
            }
          }
        }
      }
    }
  }

  keyPressed = (p5: any) => {
    if (p5.key === 'w') {
      this.velY = -100;
    } else if (p5.key === "a") {
      this.velX = -100;
    } else if (p5.key === "s") {
      this.velY = 100;
    } else if (p5.key === "d") {
      this.velX = 100;
    }
  }
  keyReleased = (p5: any) => {
    if (p5.key === 'w') {
      this.velY = 0;
    } else if (p5.key === "a") {
      this.velX = 0;
    } else if (p5.key === "s") {
      this.velY = 0;
    } else if (p5.key === "d") {
      this.velX = 0;
    }
  }

  windowResized = (p5: any) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }

  render() {
    return (
      <div id="content-wrapper" className="ic-Layout-contentWrapper">
        <div id="content" className="ic-Layout-contentMain" role="main">
          <div id="dashboard" className="ic-dashboard-app">
            <div id="dashboard_header_container" className="ic-Dashboard-header">
              <div className="large ic-Dashboard-header__layout">
                <h1 className="ic-Dashboard-header__title">
                  <span>ERROR WASD MOVE ERROR</span>
                </h1>
              </div>
            </div>
            <div id="DashboardCard_Container" style={{display: "block"}}>
              <div className="ic-DashboardCard__box">
                {this.state.cards.map((card) => <DashboardCard key={card.uid} uid={card.uid} cardColor={card.cardColor} courseName={card.courseName} courseNickname={card.courseNickname} courseTerm={card.courseTerm} hasLoaded={card.hasLoaded}/>)}
              </div>
              <Sketch setup={this.setup} draw={this.draw} windowResized={this.windowResized} keyPressed={this.keyPressed} keyReleased={this.keyReleased}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
