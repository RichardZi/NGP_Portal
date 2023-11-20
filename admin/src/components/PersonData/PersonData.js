import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// Examples
import PersonDataListing from './listing';
// import CRMDashboard2 from './Examples/Variation2';


export default class PersonData extends Component {

    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    
                        <PersonDataListing/>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
