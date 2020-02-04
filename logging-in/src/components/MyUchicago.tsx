import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

export interface MyUchicagoProps { };
export interface MyUchicagoState {
  displayIndex: number
};

export default class MyUchicago extends React.Component<RouteComponentProps<MyUchicagoProps>, MyUchicagoState> {
  constructor(props: RouteComponentProps<MyUchicagoProps>) {
    super(props);
    this.state = {
      displayIndex: 0
    };
  }
  submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.assign("/bad-login");
  }
  onTimer = () => {
    if (this.state.displayIndex === 3) {
      window.location.assign("/bad-login");
    } else {
      this.setState({ displayIndex: this.state.displayIndex + 1 });
    }
  }
  componentDidMount() {
    setInterval(this.onTimer, 10 * 100 * (4 - this.state.displayIndex));
  }
  getDisplayForState() {
    switch (this.state.displayIndex) {
      case 0:
        return <h2>Log in to Your UChicago Account</h2>;
      case 1:
        return <h2>Come on, can't you do it?</h2>;
      case 2:
        return <h2>If you don't login I'll do it for you!</h2>;
      default:
        return <h2>Dunce!</h2>;
    }
  }
  render() : React.ReactNode {
    return (
      <React.Fragment>
      <link href="https://d3qi0qp55mx5f5.cloudfront.net/shibboleth/css/site.css" rel="stylesheet" media="all"/>
      <div id="shiblogin" className="maroon">
        <div id="wrapper">
          <header className="wordmark">
            <h1><b>The University of Chicago</b></h1>
          </header>
          <main>
            <section id="loginbox">
              {this.getDisplayForState()}
              <form onSubmit={this.submit} method="post" id="login">
                <div id="alert" aria-atomic="true" role="alert"></div>
                <div className="input-wrapper">
                  <input id="username" name="j_username" type="text" className="form-control" autoCapitalize="off" spellCheck="false" value="" aria-label="CNetID / UCHADID" placeholder="CNetID / UCHADID" autoFocus/>
                </div>
                <div className="input-wrapper">
                  <input type="password" name="j_password" id="password" className="form-control" autoCapitalize="off" spellCheck="false" value="" aria-label="password" placeholder="Password"/>
                </div>
                <div className="submit-buttons">
                  <button type="submit" id="submit" name="_eventId_proceed" className="btn btn-default btn-lg btn-block">LOG IN</button>
                  <button type="submit" id="golfr" name="_eventId_golfr" className="link-default">Forgot your password?</button>
                </div>
                <p className="help-block">To securely log out, you must restart your&nbsp;browser.</p>
                <button className="help open" aria-label="Open help content"><b>?</b></button>
              </form>
            </section>
          </main>
        </div>
      </div>
      </React.Fragment>);
    }
}
