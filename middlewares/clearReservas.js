const mongoose = require("mongoose");
const Reserva = mongoose.model("reservas");
const Usuar = mongoose.model("reservas");
module.exports = async (req, res, next) => {
  if(req.user.n_reservas =! 0){
    let hora_actual = new Date().getTime();
    let reservas = await Reserva.find({ _usuario : req.user._id});
    if(reservas.length == 0){
      req.user.n_reservas = 0;
      await req.user.save();
    }else{
      reservas.forEach( async (reserva) => {
        var tiempo_desde_reserva = (hora_actual - reserva.fecha_reserva.getTime());
        if(tiempo_desde_reserva > 600000){
          reserva.fecha_reserva = null;
          reserva._usuario = null;
          reserva.estado = "disponible";
          await reserva.save();
          req.user.n_reservas -= 1;
        }
      });
      await req.user.save();
    }
  }
  next();
};
