import Link from 'react-router-dom/es/Link';
import React from 'react';
import './Station.css';

class Station extends React.Component {
  render() {
    const { station, index } = this.props;

    return (
      <Link
        key={station.id}
        className="col-md-4 station animated fadeInUp"
        style={{
        	animationDelay: (index)+'00ms'
        }}
        to={{ pathname: '/gare/' + station.id }}
      >
        <div className="station-image">
          <img src={station.image} alt={station.name} />
        </div>
        <div className="station-name">
          <b>{station.name}</b>
        </div>
      </Link>
    );
  }
}

export default Station;
