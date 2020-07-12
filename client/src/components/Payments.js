import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import ReactStripeCheckout from "react-stripe-checkout";
import * as actions from '../actions';
import keys from "../config/keys";

class Payments extends Component {
  constructor(props) {
    super(props);
    this.amount = 1000;
  }

  render() {

    return (
      <ReactStripeCheckout
        name="cineticket"
        email={this.props.email}
        description="Compra tus entradas"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRks8tpvWNATSuCgs00MauzIIWAAh7BNba4wQ&usqp=CAU"
        amount={this.amount}
        allowRememberMe
        panelLabel="Total: "
        currency="EUR"
        stripeKey={keys.stripePublic}

        token={(token) =>  {token.amount=this.amount;return this.props.handleToken(token)}}
      >
        <button className="btn">Proceder al pago</button>
      </ReactStripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
