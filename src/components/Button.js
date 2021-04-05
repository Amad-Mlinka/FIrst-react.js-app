import React from "react";
import PropTypes from "prop-types"

export const Button = ({color,text,onClick}) => {   

  return  <button onClick={onClick} className="btn" style={{background:color}}> {text} </button>;
};

Button.defaultProps={
    color:"steelblue",
}

Button.propTypes ={
    color:PropTypes.string,
    text:PropTypes.string,
    onClick: PropTypes.func,
}
