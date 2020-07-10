import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import ReactStripeCheckout from "react-stripe-checkout";
import * as actions from '../actions';

class Payments extends Component {

  amount= 1000;

  render() {

    return (
      <ReactStripeCheckout
        name="cineticket"
        email="balblabla@gmail.com"
        description="Compra tus entradas"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRks8tpvWNATSuCgs00MauzIIWAAh7BNba4wQ&usqp=CAU"
        amount={this.amount}
        allowRememberMe
        panelLabel="Total: "
        currency="EUR"
        stripeKey={process.env.REACT_APP_STRIPE_KEY}

        token={(token) =>  {token.amount=this.amount;return this.props.handleToken(token)}}
      >
        <button className="btn">Proceder al pago</button>
      </ReactStripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
