import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import MetisMenu from "react-metismenu";
import { MainNav, AuthenticationNav, GMSNav } from "./NavItems";
import axios from "axios";

let permissionsList = [];
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: [],
      permissions: [],
    };
  }
  logout() {
    sessionStorage.clear();
    window.location.href = "/";
  }

  clearCache() {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/security/ClearCache",
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
      }).then(function (response) {          
          console.log('cache cleared');
      return response.data.refresh;
      }).catch(function (response) {
          console.log(response);
      });
  }
  // let permissionsList = [];
  componentDidMount() {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/user/current_user/",
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
    }).then((res) => {
      this.setState({
        current_user: res.data,
        permissions: res.data.user_permissions,
      });

      sessionStorage.setItem(
        "permissions",
        JSON.stringify(res.data.user_permissions)
      );
    //   console.log(res.data);
      /*res.data.groups.map((listValue, index) => {
        axios({
          method: "get",
          url: "http://localhost:8000/apiViewSet/groups/" + listValue + "/",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }).then((group) => {
          group.data.permissions.map((value, key) => {
            if (permissionsList.includes(value) === true) {
            } else {
            //   console.log(permissionsList.includes(value) + " in else");
              permissionsList.push(value);
            //   console.log(permissionsList);
              sessionStorage.setItem(
                "permissions",
                JSON.stringify(permissionsList)
              );
              // this.setState(prevState => ({
              //     permissions: [...prevState.permissions, value]
              //   }))
              // var joined = permissionsList.concat(value);
              this.setState({ permissions: permissionsList });
              //   permissionsList.push(value);
            }
          });
        });
        // console.log(permissionsList);

        // sessionStorage.setItem('current_user', JSON.parse(res.data));
      });*/
    });
  }

  render() {
    return (
      <Fragment>
        {this.state.permissions.includes(64) === true || this.state.permissions.includes(76) === true ||
        this.state.permissions.includes(68) === true || this.state.permissions.includes(60) === true ||
        this.state.permissions.includes(70) === true ? (
        <h5 className="app-sidebar__heading">HCI</h5>
        ) : ''}
        <div className="metismenu vertical-nav-menu">
          <ul className="metismenu-container">
            {/* {console.log(this.state.permissions)} */}
            {this.state.permissions.includes(64) === true ? (
              <li className="metismenu-item">
                <a className="metismenu-link" href="/instances">
                  <i className="metismenu-icon pe-7s-share"></i>Instances
                </a>
              </li>
            ) : (
              ""
            )}
            {this.state.permissions.includes(76) === true ? (
              <li className="metismenu-item">
                <a className="metismenu-link" href="/jobs">
                  <i className="metismenu-icon pe-7s-portfolio"></i>Jobs
                </a>
              </li>
            ) : (
              ""
            )}
            {this.state.permissions.includes(68) === true ? (
              <li className="metismenu-item">
                <a className="metismenu-link" href="/tasks">
                  <i className="metismenu-icon pe-7s-graph1"></i>Tasks
                </a>
              </li>
            ) : (
              ""
            )}
            {this.state.permissions.includes(60) === true ? (
              <li className="metismenu-item">
                <a className="metismenu-link" href="/index-datas">
                  <i className="metismenu-icon pe-7s-note2"></i>Index Data
                </a>
              </li>
            ) : (
              ""
            )}
            {this.state.permissions.includes(70) === true ? (
              <li className="metismenu-item">
                <a className="metismenu-link" href="/person-data-list">
                  <i className="metismenu-icon pe-7s-id"></i>Person Data
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        {this.state.permissions.includes(12) === true || this.state.permissions.includes(24) === true ? (
        <h5 className="app-sidebar__heading">AUTHENTICATION AND AUTHORIZATION</h5>
        ) : ''}
        <div className="metismenu vertical-nav-menu">
          <ul className="metismenu-container">
            {this.state.permissions.includes(12) === true ? (
              <li className="metismenu-item">
                <a className="metismenu-link" href="/groups">
                  <i className="metismenu-icon pe-7s-network"></i>Groups
                </a>
              </li>
            ) : (
              ""
            )}
            {this.state.permissions.includes(24) === true ? (
              <li className="metismenu-item">
                <a className="metismenu-link" href="/users">
                  <i className="metismenu-icon pe-7s-users"></i>Users
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        {this.state.permissions.includes(40) === true || this.state.permissions.includes(44) === true ||
        this.state.permissions.includes(36) === true || this.state.permissions.includes(56) === true ? (
        <h5 className="app-sidebar__heading">GMS</h5>
        ) : ''}
        <div className="metismenu vertical-nav-menu">
          <ul className="metismenu-container">
            {this.state.permissions.includes(40) === true ? (
              <li className="metismenu-item">
                <a className="metismenu-link" href="/regions">
                  <i className="metismenu-icon pe-7s-map"></i>Regions
                </a>
              </li>
            ) : (
              ""
            )}
            {this.state.permissions.includes(44) === true ? (
              <li className="metismenu-item">
                <a className="metismenu-link" href="/tenants">
                  <i className="metismenu-icon pe-7s-users"></i>Tenants
                </a>
              </li>
            ) : (
              ""
            )}
            {this.state.permissions.includes(36) === true ? (
              <li className="metismenu-item">
                <a className="metismenu-link" href="/namespaces">
                  <i className="metismenu-icon pe-7s-science"></i>Namespaces
                </a>
              </li>
            ) : (
              ""
            )}
            {this.state.permissions.includes(56) === true ? (
              <li className="metismenu-item">
                <a className="metismenu-link" href="/integer-tables">
                  <i className="metismenu-icon pe-7s-note2"></i>Integer Tables
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="metismenu vertical-nav-menu">
          <ul className="metismenu-container">
          <li
              onClick={this.clearCache}
              className="metismenu-item"
              style={{ cursor: "pointer" }}
            >
              <span className="metismenu-link">
                <i className="metismenu-icon pe-7s-angle-right-circle"></i>
                Clear Cache
              </span>
            </li>
            <li
              onClick={this.logout}
              className="metismenu-item"
              style={{ cursor: "pointer" }}
            >
              <span className="metismenu-link">
                <i className="metismenu-icon pe-7s-angle-right-circle"></i>
                Logout
              </span>
            </li>
          </ul>
        </div>
        {/* <h5 className="app-sidebar__heading">UI Components</h5>
                <MetisMenu content={ComponentsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Dashboard Widgets</h5>
                <MetisMenu content={WidgetsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Forms</h5>
                <MetisMenu content={FormsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Charts</h5>
                <MetisMenu content={ChartsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/> */}
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default Nav;
