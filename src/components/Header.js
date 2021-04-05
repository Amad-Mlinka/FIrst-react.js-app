import React from "react";
import PropTypes from "prop-types";
import "../style/header.css"
import { Button } from './Button';
import {useLocation} from 'react-router-dom'

const Header = ({ title,showAddTask,onAdd }) => {
  const location=useLocation()
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname=="/" && <Button color={showAddTask?"red":"green"} text={showAddTask?"Close":"Add"} onClick={onAdd}/>}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
