import React, {Component, Fragment} from 'react';
import Ionicon from 'react-ionicons';
import {
    Row, Col, ListGroupItem, ListGroup,
    Button, CardTitle, CustomInput

} from 'reactstrap';
import {
    Sparklines,
    SparklinesCurve,
    SparklinesReferenceLine,
    SparklinesSpots
} from 'react-sparklines';

import Circle from 'react-circle';

import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import {CopyToClipboard} from 'react-copy-to-clipboard';


import {
    faTrashAlt,
    faCheck,
    faFilePdf,
    faFileExcel,
    faFileArchive,
    faFileAlt,
    faFileImage,
    faImage,
    faCloudDownloadAlt

} from '@fortawesome/free-solid-svg-icons';

import avatar1 from '../../../../assets/utils/images/avatars/1.jpg';
import avatar2 from '../../../../assets/utils/images/avatars/2.jpg';
import avatar3 from '../../../../assets/utils/images/avatars/3.jpg';
import avatar4 from '../../../../assets/utils/images/avatars/4.jpg';
import avatar5 from '../../../../assets/utils/images/avatars/5.jpg';
import avatar6 from '../../../../assets/utils/images/avatars/8.jpg';
import avatar7 from '../../../../assets/utils/images/avatars/9.jpg';
import avatar8 from '../../../../assets/utils/images/avatars/10.jpg';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from "axios";
import { Bounce, toast } from 'react-toastify';

function boxMullerRandom() {
    let phase = false,
        x1, x2, w, z;

    return (function () {

        if (phase = !phase) {
            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);

            w = Math.sqrt((-2.0 * Math.log(w)) / w);
            return x1 * w;
        } else {
            return x2 * w;
        }
    })();
}

function randomData(n = 30) {
    return Array.apply(0, Array(n)).map(boxMullerRandom);
}

const sampleData = randomData(30);

class DrawerBigExample extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            dropdownOpen: false,
            instances: [],
            active_jobs: [],
            canceled_jobs: [],
            pending_jobs: [],
            namespace_file: [],
            tasks: [],
            group_users_list: [],
            workflow_users: [],
            security_users: [],
            identity_provider: []
        };

        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/SideBar/",
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
          }).then((res) => {
            this.setState({
                instances: res.data.instances,
                active_jobs: res.data.active_jobs,
                canceled_jobs: res.data.canceled_jobs,
                pending_jobs: res.data.pending_jobs,
                namespace_file: res.data.namespace_file,
                tasks: res.data.tasks,
                group_users_list: res.data.group_users_list
            });

            console.log(this.state);
        });

        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/workflows/groups/",
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
          }).then((res) => {
            console.log(res)
            let cleanedString = res.data.replace(/\\/g, '');
            cleanedString = cleanedString.substring(1, cleanedString.length - 1);
            console.log(cleanedString);

            this.setState({
                workflow_users: JSON.parse(cleanedString)
            });
            console.log(this.state);
        });
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/security/groups",
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
          }).then((res) => {
            
            this.setState({
                security_users: res.data
            });

            console.log(this.state);
        });

        /*axios({
            method: "POST",
            url: "http://127.0.0.1:8000/security/identityProviders",
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
          }).then((res) => {
              console.log(res.data);
              if (Array.isArray(res.data) && res.data.length) {
                  this.setState({
                      identity_provider: res.data
                  });
              }

            console.log(this.state);
        });*/
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    copyToClipboard = (data) => {
        // this.textArea.select();
        document.execCommand('copy', true, data);
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        // e.target.focus();
        // this.setState({ copySuccess: 'Copied!' });
      };

      notify2 = () => this.toastId = toast("AWS URL copied!", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });
    
    render() {
        return (
            <Fragment>
                <h3 className="drawer-heading">
                    Instances Status
                </h3>
                <div className="drawer-section">
                    <Row>
                    {this.state.instances.map((instnace, index) => {
                        let metrices = JSON.parse(instnace.matrices)
                        return (
                            <Col key={index}>
                            <div className="progress-box">
                                <h4>Instance {instnace.id}</h4>
                                <Circle
                                    animate={true} // Boolean: Animated/Static progress
                                    animationDuration="8s" // String: Length of animation
                                    responsive={true} // Boolean: Make SVG adapt to parent size
                                    size="80" // String: Defines the size of the circle.
                                    lineWidth="25" // String: Defines the thickness of the circle's stroke.
                                    progress={metrices.totalCpuPercent} // String: Update to change the progress and percentage.
                                    progressColor="var(--warning)" // String: Color of "progress" portion of circle.
                                    bgColor="#f3f5f2" // String: Color of "empty" portion of circle.
                                    textColor="#bcbebf" // String: Color of percentage text color.
                                    /* textStyle={{
                                         font: 'bold 4rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                                     }}*/
                                    percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                                    roundedStroke={true} // Boolean: Rounded/Flat line ends
                                    showPercentage={true} // Boolean: Show/hide percentage.
                                    showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                                />
                            </div>
                        </Col>
                        )
                    })
                    }
                        
                    </Row>
                    <div className="divider"/>
                    <div className="mt-3">
                        <CardTitle className="text-center">Job Statistics</CardTitle>

                        {/* <Sparklines data={sampleData} height={44} limit={20} margin={6}>
                            <SparklinesCurve length={20}
                                             style={{strokeWidth: 1, stroke: "var(--primary)", fill: "#ffffff"}}/>
                            <SparklinesSpots size={3}
                                             style={{stroke: "var(--success)", strokeWidth: 2, fill: "#ffffff"}}/>
                            <SparklinesReferenceLine height={22} type="avg"/>
                        </Sparklines> */}

                        <Row>
                            <Col>
                                <div className="widget-chart p-0">
                                    <div className="widget-chart-content">
                                        <div
                                            className="widget-numbers text-warning fsize-3">
                                            {this.state.active_jobs}
                                        </div>
                                        <div className="widget-subheading pt-1">
                                            Active
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="widget-chart p-0">
                                    <div className="widget-chart-content">
                                        <div
                                            className="widget-numbers text-danger fsize-3">
                                            {this.state.pending_jobs}
                                        </div>
                                        <div className="widget-subheading pt-1">
                                            Pending
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="widget-chart p-0">
                                    <div className="widget-chart-content">
                                        <div
                                            className="widget-numbers text-success fsize-3">
                                            {this.state.canceled_jobs}
                                        </div>
                                        <div className="widget-subheading pt-1">
                                            Canceled
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="divider"/>
                        {/* <div className="text-center mt-2 d-block">
                            <Button outline className="mr-2 border-0 btn-transition" color="danger">Escalate
                                Issue</Button>
                            <Button outline className="border-0 btn-transition" color="success">Support Center</Button>
                        </div> */}
                    </div>
                </div>
                <h3 className="drawer-heading">
                    Files Uploaded
                </h3>
                <div className="drawer-section p-0">
                    <div className="files-box">
                        <ListGroup flush>
                        {this.state.namespace_file.map((file, f_index) => {
                            var parts = file.files.split("/");
                            var result = parts[parts.length - 1]; // Or parts.pop();
                            return (
                            <ListGroupItem className="pt-2 pb-2 pr-2" key={f_index}>
                                <div className="widget-content p-0">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left opacity-6 fsize-2 mr-3 text-primary center-elem">
                                            <FontAwesomeIcon icon={faImage}/>
                                        </div>
                                        <div className="widget-content-left">
                                            <div className="widget-heading font-weight-normal">
                                                {file.namespace} / {result}
                                            </div>
                                        </div>
                                        <div className="widget-content-right ">
                                            <CopyToClipboard text={file.awsURL}
                                                onCopy={() => this.setState({copied: true})}>
                                                <Button className="btn-shadow p-1" size="sm" onClick={this.notify2} color="info"
                                                        id="Tooltip-copy">
                                                    <Ionicon color="#ffffff" fontSize="20px" icon="ios-clipboard-outline"/>
                                                </Button>
                                            </CopyToClipboard>
                                            {/* <Button size="sm" className="btn-icon btn-icon-only" color="link"
                                            onClick={this.copyToClipboard(file.awsURL)}>
                                                <FontAwesomeIcon icon={faCloudDownloadAlt}/>
                                            </Button> */}
                                        </div>
                                    </div>
                                </div>
                            </ListGroupItem>
                            )
                        })}
                            
                        </ListGroup>
                    </div>
                </div>
                <h3 className="drawer-heading">
                    Tasks in Progress
                </h3>
                <div className="drawer-section p-0">
                    <div className="todo-box">
                        <ListGroup className="todo-list-wrapper" flush>
                        {this.state.tasks.map((task, t_index) => {
                            return (
                                <ListGroupItem key={t_index}>
                                    <div className="todo-indicator"/>
                                    <div className="widget-content p-0">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">
                                                    {task.displayName}
                                                    {task.status === 'Inprogress' 
                                                    ?<div className="badge badge-warning ml-2">In Progress</div> : ''
                                                    }
                                                    
                                                    {task.status === 'Canceled'
                                                    ? <div className="badge badge-danger ml-2">Rejected</div> : ''
                                                    }
                                                    
                                                </div>
                                                <div className="widget-subheading">
                                                    <i>{task.type}</i>
                                                </div>
                                            </div>
                                            {t_index === 0
                                            ?<div className="widget-content-right ml-3">
                                            <div className="badge badge-pill badge-success">Latest Task</div>
                                        </div> : ''}
                                            
                                        </div>
                                    </div>
                                </ListGroupItem>
                            )
                        })}
                        </ListGroup>
                    </div>
                </div>
                <h3 className="drawer-heading">
                    User Groups
                </h3>
                <div className="drawer-section">
                    <div className="notifications-box">
                        <VerticalTimeline animate={false} layout="1-column"
                                          className="vertical-time-simple vertical-without-time">
                            {this.state.group_users_list.map((user, u_index) => {
                                return (
                                <VerticalTimelineElement key={u_index}
                                    className="vertical-timeline-item dot-primary"
                                >
                                    <h4 className="timeline-title">
                                        {user.group}
                                        <div className="avatar-wrapper mt-2 avatar-wrapper-overlap">
                                        {user.users.map((group_user, gu_index) => {
                                            return (
                                                <div className="avatar-icon-wrapper avatar-icon-sm" key={gu_index}>
                                                    <div className="avatar-icon">
                                                        <img src={"https://ui-avatars.com/api/?background=random&name="+group_user.first_name+" "+group_user.last_name} alt={group_user.first_name+" "+group_user.last_name} title={group_user.first_name+" "+group_user.last_name}/>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                            
                                            {/* <div className="avatar-icon-wrapper avatar-icon-sm avatar-icon-add">
                                                <div className="avatar-icon">
                                                    <i>+</i>
                                                </div>
                                            </div> */}
                                        </div>
                                    </h4>
                                </VerticalTimelineElement>
                                )
                            })}
                        </VerticalTimeline>
                    </div>
                </div>
                <h3 className="drawer-heading">
                    Workflow Groups
                </h3>
                <div className="drawer-section">
                    <div className="notifications-box">
                        <VerticalTimeline animate={false} layout="1-column"
                                          className="vertical-time-simple vertical-without-time">
                            {this.state.workflow_users.map((w_groups, w_index) => {
                                return (
                                <VerticalTimelineElement key={w_index}
                                    className="vertical-timeline-item dot-primary"
                                >
                                    <h4 className="timeline-title">
                                        {w_groups.name}
                                        {/* <div className="avatar-wrapper mt-2 avatar-wrapper-overlap">
                                        {w_groups.users.map((group_user, gu_index) => {
                                            return (
                                                <div className="avatar-icon-wrapper avatar-icon-sm" key={gu_index}>
                                                    <div className="avatar-icon">
                                                        <img src={"https://ui-avatars.com/api/?background=random&name="+group_user.first_name+" "+group_user.last_name} alt={group_user.first_name+" "+group_user.last_name} title={group_user.first_name+" "+group_user.last_name}/>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        </div> */}
                                    </h4>
                                </VerticalTimelineElement>
                                )
                            })}
                        </VerticalTimeline>
                    </div>
                </div>
                
                <h3 className="drawer-heading">
                    Identity Providers
                </h3>
                <div className="drawer-section">
                    <div className="notifications-box">
                        <VerticalTimeline animate={false} layout="1-column"
                                          className="vertical-time-simple vertical-without-time">
                            {this.state.identity_provider.map((provider, p_index) => {
                                return (
                                <VerticalTimelineElement key={p_index}
                                    className="vertical-timeline-item dot-primary"
                                >
                                    <h4 className="timeline-title">
                                        {provider.name}
                                        {provider.propertyGroups.map((group, g_index) => {
                                            return (
                                            <VerticalTimelineElement key={g_index}
                                                className="vertical-timeline-item dot-primary"
                                            >
                                                <h4 className="timeline-title">
                                                    {group.name}
                                                </h4>
                                            </VerticalTimelineElement>
                                            )
                                        })}
                                        {/* <div className="avatar-wrapper mt-2 avatar-wrapper-overlap">
                                        {w_groups.users.map((group_user, gu_index) => {
                                            return (
                                                <div className="avatar-icon-wrapper avatar-icon-sm" key={gu_index}>
                                                    <div className="avatar-icon">
                                                        <img src={"https://ui-avatars.com/api/?background=random&name="+group_user.first_name+" "+group_user.last_name} alt={group_user.first_name+" "+group_user.last_name} title={group_user.first_name+" "+group_user.last_name}/>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        </div> */}
                                    </h4>
                                </VerticalTimelineElement>
                                )
                            })}
                        </VerticalTimeline>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default DrawerBigExample;