import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import ReactStripeCheckout from "react-stripe-checkout";
import * as actions from '../../actions/userActions';

import keys from "../../config/keys";


class StripePago extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReactStripeCheckout
        name="cineticket"
        email = { this.props.email }
        description="Compra tus entradas"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRks8tpvWNATSuCgs00MauzIIWAAh7BNba4wQ&usqp=CAU"
        amount = {this.props.precio_total}
        allowRememberMe
        panelLabel = "Total: "
        currency ="EUR"
        stripeKey = { keys.stripePublic }
        token={(token) =>  { token.amount = this.props.precio_total; return this.props.handleTokenStripe(token) }}>
        <button className="btn-large  blue-grey darken-1 right">Proceder al pago</button>
      </ReactStripeCheckout>
    );
  }
}

function mapStateToProps(state) {
  return { email: state.auth.email};
}

export default connect(mapStateToProps, actions)(StripePago);
