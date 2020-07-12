import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return "";
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <React.Fragment>
            <li style={{ marginRight: "20px" }}>
              Credits: {this.props.paym.waiting || this.props.paym.credits}
            </li>
            <li>
              <Payments email={this.props.auth.email} />
            </li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </React.Fragment>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper" style={{backgroundColor : "#523f5c"}}>
          <div className="row">
            <div className="col s1 m1 "></div>
            <div className="col s1 m1"><Link
              to={this.props.auth ? "/surveys" : "/"}
              className="left brand-logo"
            >
              CineTicket
            </Link></div>
                <div className="col s10 m10">
                <ul className="right">{this.renderContent()}</ul>
                </div>
          </div>

        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, paym: state.paym };
}

export default connect(mapStateToProps)(Header);
