import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;
  if (!alert || !alert.msg) {
    return null;
  } else {
    return (
      <div className={`alert alert-${alert?.type}`}>
        <i className='fas fa-info-circle'></i>
        {alert?.msg}
      </div>
    );
  }
}

export default Alert;
