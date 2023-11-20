import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// Examples
import CRMDashboard1 from './variation';
// import CRMDashboard2 from './Examples/Variation2';


export default class CRMDashboard extends Component {

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
                    
                    {/* <Tabs
                        defaultActiveKey="1"
                        renderTabBar={() => <ScrollableInkTabBar/>}
                        renderTabContent={() => <TabContent/>}
                    > */}
                        {/* <TabPane tab='Variation 1' key="1"><CRMDashboard2/></TabPane> */}
                        <CRMDashboard1/>
                    {/* </Tabs> */}
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
