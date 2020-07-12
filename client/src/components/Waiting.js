import React from "react";
import {Link} from "react-router-dom";

const Waiting = () => {
  return (

      <div className="preloader-wrapper active right">
       <div className="spinner-layer spinner-green-only">
         <div className="circle-clipper left">
           <div className="circle"></div>
         </div><div className="gap-patch">
           <div className="circle"></div>
         </div><div className="circle-clipper right">
           <div className="circle"></div>
         </div>
       </div>
     </div>

  );
};

export default Waiting;
