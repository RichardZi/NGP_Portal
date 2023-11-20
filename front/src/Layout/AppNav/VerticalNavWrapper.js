import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';

import MetisMenu from 'react-metismenu';

import {MainNav, ComponentsNav, FormsNav, WidgetsNav, ChartsNav} from './NavItems';

class Nav extends Component {
    logout() {

        sessionStorage.clear();
        window.location.href = '/';
    }

    state = {};

    render() {
        return (
            <Fragment>
                <h5 className="app-sidebar__heading">Menu</h5>
                <MetisMenu content={MainNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <div className='metismenu vertical-nav-menu'>

                    <ul className='metismenu-container'>
                        <li onClick={this.logout} className='metismenu-item' style={{cursor: "pointer"}}>
                            <span className='metismenu-link'>
                                <i className="metismenu-icon pe-7s-angle-right-circle"></i>Logout
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

export default (Nav);