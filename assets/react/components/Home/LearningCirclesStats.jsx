import React, { Component } from 'react'
import ApiHelper from '../../helpers/ApiHelper'
import NumberWithLabel from 'p2pu-input-fields/dist/NumberWithLabel'

export default class LearningCirclesStats extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.api = new ApiHelper('stats');
    this.populateStats = () => this._populateStats();
    this.triggerCountup = () => this._triggerCountup();
    this.resetCountup = () => this._resetCountup();
    this.populateStats();
  }

  _populateStats() {
    const params = {}
    const callback = (response, options) => {
      this.setState({ stats: response })
    }

    const opts = { params, callback }

    this.api.fetchResource(opts);
  }

  render() {
    const stats = this.state.stats;
    if (stats) {
      return (
        <div className="stacked-numbers row">
          <div className="col-sm-12 col-md-4 card bg-light border-0">
            <p>People join a learning circle to meet up in person and learn together...</p>
            <h4 className="bold">
              <NumberWithLabel
                number={stats.learning_circle_count}
                label='learning circles'
              />
            </h4>
          </div>
          <div className="col-sm-12 col-md-4 card bg-light border-0">
            <p>... using free, online courses from around the web...</p>
            <h4 className="bold">
              <NumberWithLabel
                number={stats.facilitators}
                label='courses'
              />
            </h4>
          </div>
          <div className="col-sm-12 col-md-4 card bg-light border-0">
            <p>...at public spaces such as libraries and community centers.</p>
            <h4 className="bold">
              <NumberWithLabel
                number={stats.cities}
                label='participating cities'
              />
            </h4>
          </div>
        </div>
      );
    } else {
      return <div></div>
    }
  }
}

