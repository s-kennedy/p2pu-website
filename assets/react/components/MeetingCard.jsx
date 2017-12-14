import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const MeetingCard = (props) => {

  return (
    <div className="meeting-card col-xs-4">
      <div className='date'>
        <i className="material-icons">today</i>
        <p><span className="bold">{props.date}</span> at <span className="bold">{props.time}</span></p>
      </div>
      <div className='meeting-info'>
        <p><span className="bold">{props.facilitator}</span> is facilitating the <span className="bold">{props.title}</span> learning circle at { props.location } in { props.city }</p>
      </div>
    </div>
  );
}

export default MeetingCard
