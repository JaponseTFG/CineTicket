import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Redirect } from "react-router";
import M from "materialize-css";

class LoginAdmin extends Component {

  constructor(props) {
    super(props);
    this.state = {admin_pass:null,admin_name:null};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    document.body.scrollIntoView({behavior: 'smooth', block: 'start'});

  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event){
    event.preventDefault();
    if (!event.which && this.state !=null) {
      this.props.loginAdmin(this.state.admin_name,this.state.admin_pass);
    }
  }

  redirect(){
    if(this.props.auth!=false && this.props.auth!=null){
      if(this.props.auth.tipo == 1)
        return <Redirect to={"/Forbidden"} />;
      else
        return <Redirect to={"/admin"} />;
    }
    return;
  }

  render() {
    return (
      <div className="row" style={{paddingTop:"1%"}}>
        <div className="col m1"></div>
        <div className="card-panel grey lighten-4 col s12 m10" style={{paddingTop:"1%"}}>
          <form onSubmit={this.handleSubmit}>
            {this.redirect()}
            <div className="row">
              <div className="col s0 m2 l4"></div>
              <div className="col s12 m8 l4">
                <div className="input-field col s12 m12 ">
                  <input id="adminname" name="admin_name" onChange={this.handleChange} type="text"/>
                  <label htmlFor="adminname">Usuario</label>
                </div>
                <div className="input-field col s12 m12 ">
                  <input id="adminpass" name="admin_pass" onChange={this.handleChange} type="password"/>
                  <label htmlFor="adminpass">Contraseña</label>
                </div>
                <div className="input-field col s12 m12 ">
                  <button className="btn blue-grey darken-1 right">Acceder</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(LoginAdmin);
