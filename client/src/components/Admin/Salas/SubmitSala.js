import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../../actions/salasActions";

import M from "materialize-css";

class SubmitSala extends Component {

  constructor(props) {
    super(props);
    this.saveSala = this.saveSala.bind(this);
  }
  saveSala(){
    this.props.saveSala(this.props.sala,this.props.butacas);
  }

  render() {
    return (
      <React.Fragment>
        <div className="col l2 xl2  hide-on-med-and-down valign-wrapper "  style={{justifyContent: "flex-end"}}>
          <Link to={"/admin/salas"} className="btn-floating indigo lighten-3 ">
            <i className="material-icons">undo</i>
          </Link>
          &nbsp;&nbsp;
          <button  onClick={this.saveSala} className="btn-floating btn-large blue-grey darken-1">
            <i className="material-icons">save</i>
          </button>
        </div>

        <div className="fixed-action-btn">
          <button onClick={this.saveSala} className="btn-floating btn-large hide-on-large-only blue-grey darken-1">
            <i className="large material-icons">save</i>
          </button>
        </div>
        <div className="fixed-action-btn" style={{margin:"0px 70px 8px 0px"}}>
          <Link to={"/admin/salas"} className="btn-floating  hide-on-large-only indigo lighten-3">
            <i className="material-icons">undo</i>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state,ownProps) {
  return {sala: state.salas.sala, butacas : state.salas.butacas};
}

export default connect(mapStateToProps, actions)(SubmitSala);
