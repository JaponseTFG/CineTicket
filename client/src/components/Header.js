import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


class Header extends Component {
  componentDidMount(){
    setTimeout(function() {
      document.getElementById('logo').className = 'left brand-logo scale-transition scale-in';
    }, 300)
  }

  showLoginLogout() {
    switch (this.props.auth) {
      case null:
        return (<li><a href="/auth/google">Login</a></li>);
      case false:
        return (<li><a href="/auth/google">Login</a></li>);
      default:
        return (<li><a href="/api/logout">Logout</a></li>);
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper" style={{backgroundColor : "#523f5c"}}>
          <div className="row">
            <div className="col s1 m1 "></div>
            <div className="col s1 m1">
              <Link to ={(this.props.auth && this.props.auth.tipo==2) ? ("/admin") : ("/")} id="logo" className="left brand-logo scale-transition scale-out">
                <i className="material-icons" style={{fontSize:"40px", marginRight:"2px"}}>movie</i><b>CineTicket</b>
              </Link>
            </div>
            <div className="col s10 m10">
                <ul className="right">{this.showLoginLogout()}</ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth};
}

export default connect(mapStateToProps)(Header);
