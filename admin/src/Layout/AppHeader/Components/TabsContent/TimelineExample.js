import React, {Component, Fragment} from 'react';

import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';

import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from "axios";
import moment from 'moment';
class TimelineEx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            alertsData: [],
            alerts: []
        };
        axios({
            method: "GET",
            url: "http://localhost:8000/workflows/alerts/",
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
          }).then((res) => {
            let cleanedString = res.data.replace(/\\/g, '');
            console.log(cleanedString);
            cleanedString = cleanedString.substring(1, cleanedString.length - 1);
            console.log(cleanedString);
              let results = JSON.parse(cleanedString)
            this.setState({
                alertsData: res.data,
                alerts: results.alerts,
            });
        });
    }

    componentDidMount = () => {
        
      };
    render() {
        return (
            <Fragment>
                <div className="scroll-area-sm">
                    <PerfectScrollbar>
                        <div className="p-3">
                            <VerticalTimeline layout="1-column" className="vertical-without-time">
                            {this.state.alerts.map((alert, a_index) => {
                                return (
                                    <VerticalTimelineElement key={a_index}
                                        className="vertical-timeline-item"
                                        icon={<i className="badge badge-dot badge-dot-xl badge-success"> </i>}
                                    >
                                        <h4 className="timeline-title">{alert.subject}</h4>
                                        <p>
                                            {alert.message} <span className='alert-time' style={{FontSize: '10px'}}><i>{moment((alert.time)*1000).format('DD-MM-YYYY')}</i></span>
                                        </p>
                                    </VerticalTimelineElement>
                                )
                            })}
                            </VerticalTimeline>
                        </div>
                    </PerfectScrollbar>
                </div>
            </Fragment>
        )
    }
}

export default TimelineEx;