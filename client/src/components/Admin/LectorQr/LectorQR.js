import React from "react";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../actions";


import QrReader from 'react-qr-reader'
import M from "materialize-css";
import Waiting from "../../Waiting"

class LectorQr extends Component {
  state = {
    result: 'No result'
  }
  componentDidMount(){

  }
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
    console.log(this.state.result);
  }
  handleError = err => {
    console.error(err)
  }
  render(){
    return(
      <div className="row" >
        <br></br>
        <div className="col s10 xl4 offset-xl4">
          <div>
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
            />
            <p>{this.state.result}</p>
          </div>
        </div>
        <div className="col  s12 xl10 offset-xl1" >
          <div className="divider"></div>
          <br></br>
        </div>
      </div>
    )

  }
}

export default (LectorQr);
