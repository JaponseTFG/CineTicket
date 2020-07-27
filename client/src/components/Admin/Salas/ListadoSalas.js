import React from "react";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../actions/salasActions";

import M from "materialize-css";
import Waiting from "../../Waiting"
const ItemSala = (props) => {

  const ItemSalaSmall = (props) => {
    return(
      <div className="hide-on-med-and-up">
        <div className="col s12">
            <h5 className="valign-wrapper"  style={{justifyContent: "center"}}>
               {props.nombre} &nbsp;&nbsp; {props.n_asientos}
              <i className="small material-icons " style={{marginLeft:"3px"}}>event_seat</i>
            </h5>
        </div>
        <div className="col s12 hide-on-med-and-up">
            <div className="divider"></div>
            <h5 className="valign-wrapper"  style={{justifyContent: "center"}}>
              <span>
                <button onClick={() => props.onDelete(props.index)} className="btn-floating red lighten-2" style={{marginRight: "20px"}}>
                   <i className="material-icons">delete_forever</i>
                 </button>
                 <Link to={"/admin/salas-edit"} onClick={() => props.onEdit(props.index)} className="btn-floating btn-large deep-purple lighten-2 " >
                   <i className="material-icons">edit</i>
                 </Link>
              </span>
            </h5>
        </div>
      </div>
    )
  }
  const ItemSalaLarge = (props) => {
    return(
      <div className="col s12 hide-on-small-only">
        <blockquote style={{borderLeft: "solid #000000"}}>
          <h5 className="valign-wrapper"  style={{justifyContent: "space-between"}}>
            <span className="valign-wrapper">
               {props.nombre} &nbsp;&nbsp; {props.n_asientos}
              <i className="small material-icons " style={{marginLeft:"3px"}}>event_seat</i>
            </span>
            <span>
              <button onClick={() => props.onDelete(props.index)} className="btn-floating red lighten-2" style={{marginRight: "20px"}}>
                 <i className="material-icons">delete_forever</i>
               </button>
               <Link to={"/admin/salas-edit"} onClick={() => props.onEdit(props.index)} className="btn-floating btn-large deep-purple lighten-2 " >
                 <i className="material-icons">edit</i>
               </Link>
            </span>
          </h5>
        </blockquote>
      </div>
    )
  }

  return (
    <div className="col s12 card ">
      <ItemSalaSmall  nombre={props.nombre} n_asientos={props.n_asientos} onDelete={props.onDelete} onEdit={props.onEdit} index={props.index}/>
      <ItemSalaLarge  nombre={props.nombre} n_asientos={props.n_asientos} onDelete={props.onDelete} onEdit={props.onEdit} index={props.index}/>
    </div>
  )
};

const BotonAddSala = (props) => {
  return (
      <Link  to={"/admin/salas-edit"} onClick={() => props.gotoEdit(null)} className="col s12 card hoverable" style={{color:"black",cursor: "pointer",display: "flex",justifyContent:"center" ,alignItems:"center"}}>
          <i className="large material-icons">add</i>  <h5></h5>
      </Link>
  );
}

class ListadoSalas extends Component {

  constructor(props) {
    super(props);
    this.deleteSala   = this.deleteSala.bind(this);
    this.gotoEditSala = this.gotoEditSala.bind(this);
  }

  componentDidMount(){
    this.props.loadListaSalas();
  }

  deleteSala(index){
    if(document.querySelectorAll('.toastdelete').length > 0){
      this.props.deleteSala(this.props.lista_salas[index]._id,index);
      M.Toast.dismissAll();
    }else{
      M.toast({
        html: "El elemento se eliminará permanentemente, vuelva a pulsar para confirmar.<p class='hide-on-med-and-up'>&nbsp</p>",
        classes: "right red darken-1 toastdelete",
        displayLength: 2000,
      });
    }
    return;
  }

  gotoEditSala(index){
    if(index !== null)
      this.props.loadSala(this.props.lista_salas[index]._id);
    else
      this.props.loadSala(false);
  }

  showSalas(){
    if(this.props.lista_salas){
      return(
        this.props.lista_salas.map((sala, index) => {
          return(<ItemSala key={"lsalas"+index} nombre={sala.nombre} n_asientos={sala.n_asientos} onDelete={this.deleteSala} onEdit={this.gotoEditSala} index={index}/>);
         })
      );
    }else{
      return <Waiting/>;
    }
  }

  render(){
    console.log(this.props.lista_salas);
    return (
      <div>
        <br className="hide-on-large-only"></br>
        <div className="row" style={{paddingTop:"1%"}}>
          <div className="col s10 m10 l10 offset-s1 offset-m1 offset-l1">
            <div className="row" style={{paddingTop:"1%"}}>
              {this.showSalas()}
              {<BotonAddSala gotoEdit={this.gotoEditSala} />}
            </div>
          </div>
        </div>
        <br></br>
      </div>
    );
  }
};



function mapStateToProps(state) {
  return { lista_salas: state.salas.lista_salas };
}

export default connect(mapStateToProps, actions)(ListadoSalas);
