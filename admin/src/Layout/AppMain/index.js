import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment, useState} from 'react';
import Loader from 'react-loaders'
import Login from '../../components/Login/Login';
import axios from 'axios';

import {
    ToastContainer,
} from 'react-toastify';
const Dashboard = lazy(() => import('../../components/Dashboard/Dashboard'));
const Instances = lazy(() => import('../../components/Instances/Instances'));
const InstancesAdd = lazy(() => import('../../components/Instances/Add'));
const InstancesEdit = lazy(() => import('../../components/Instances/Edit'));
const Jobs = lazy(() => import('../../components/Jobs/Jobs'));
const JobsAdd = lazy(() => import('../../components/Jobs/Add'));
const JobsEdit = lazy(() => import('../../components/Jobs/Edit'));
const Tasks = lazy(() => import('../../components/Tasks/Tasks'));
const TasksAdd = lazy(() => import('../../components/Tasks/Add'));
const TasksEdit = lazy(() => import('../../components/Tasks/Edit'));
const Regions = lazy(() => import('../../components/Regions/Regions'));
const RegionsAdd = lazy(() => import('../../components/Regions/Add'));
const RegionsEdit = lazy(() => import('../../components/Regions/Edit'));
const Tenants = lazy(() => import('../../components/Tenants/Tenants'));
const TenantsAdd = lazy(() => import('../../components/Tenants/Add'));
const TenantsEdit = lazy(() => import('../../components/Tenants/Edit'));
const Namespaces = lazy(() => import('../../components/Namespaces/Namespaces'));
const NamespacesAdd = lazy(() => import('../../components/Namespaces/Add'));
const NamespacesEdit = lazy(() => import('../../components/Namespaces/Edit'));
const IndexData = lazy(() => import('../../components/IndexData/IndexData'));
const IndexDataAdd = lazy(() => import('../../components/IndexData/Add'));
const IndexDataEdit = lazy(() => import('../../components/IndexData/Edit'));
const IntegerTable = lazy(() => import('../../components/IntegerTable/IntegerTable'));
const IntegerTableAdd = lazy(() => import('../../components/IntegerTable/Add'));
const IntegerTableEdit = lazy(() => import('../../components/IntegerTable/Edit'));
const PersonData = lazy(() => import('../../components/PersonData/PersonData'));
const PersonDataAdd = lazy(() => import('../../components/PersonData/Add'));
const PersonDataEdit = lazy(() => import('../../components/PersonData/Edit'));
const Groups = lazy(() => import('../../components/Groups/Groups'));
const GroupsAdd = lazy(() => import('../../components/Groups/Add'));
const GroupsEdit = lazy(() => import('../../components/Groups/Edit'));
const Users = lazy(() => import('../../components/Users/Users'));
const UsersAdd = lazy(() => import('../../components/Users/Add'));
const UsersEdit = lazy(() => import('../../components/Users/Edit'));

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = tokenString;
    return userToken
}

function updateToken() {
        // let refresh = sessionStorage.getItem('tokenRefresh')
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/auth/token/refresh/",
            data: {refresh: sessionStorage.getItem('tokenRefresh')},
            headers: { "Content-Type": "multipart/form-data" },
          }).then(function (response) {
              sessionStorage.setItem('token', response.data.access);
            }).catch(function (response) {
              console.log(response);
            });    
}

setInterval(() => updateToken(), 60000);

function logout() {
    localStorage.clear();
    window.location.href = '/';
}

const AppMain = () => {
    
    const token = getToken();
    console.log(token);
    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <Fragment>
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="ball-grid-beat"/>
                        </div>
                        <h6 className="mt-3">
                            {/* Please wait while we load all the Dashboards examples
                            <small>Because this is a demonstration, we load at once all the Dashboards examples. This wouldn't happen in a real live app!</small> */}
                        </h6>
                    </div>
                </div>
            }>
                <Router>
                    <Route path="/dashboard/" component={Dashboard}/>
                    <Route path="/instances/" component={Instances}/>
                    <Route path="/instance/add/" component={InstancesAdd}/>
                    <Route path="/instance/details/:instanceId" component={InstancesEdit}/>
                    <Route path="/jobs/" component={Jobs}/>
                    <Route path="/job/add/" component={JobsAdd}/>
                    <Route path="/job/details/:jobId" component={JobsEdit}/>
                    <Route path="/tasks/" component={Tasks}/>
                    <Route path="/task/add" component={TasksAdd}/>
                    <Route path="/task/details/:taskId" component={TasksEdit}/>
                    <Route path="/regions/" component={Regions}/>
                    <Route path="/region/add" component={RegionsAdd}/>
                    <Route path="/region/edit/:regionId" component={RegionsEdit}/>
                    <Route path="/tenants/" component={Tenants}/>
                    <Route path="/tenant/add" component={TenantsAdd}/>
                    <Route path="/tenant/edit/:tenantId" component={TenantsEdit}/>
                    <Route path="/namespaces/" component={Namespaces}/>
                    <Route path="/namespace/add" component={NamespacesAdd}/>
                    <Route path="/namespace/edit/:namespaceId" component={NamespacesEdit}/>
                    <Route path="/index-datas/" component={IndexData}/>
                    <Route path="/index-data/add" component={IndexDataAdd}/>
                    <Route path="/index-data/edit/:IndexId" component={IndexDataEdit}/>
                    <Route path="/integer-tables/" component={IntegerTable}/>
                    <Route path="/integer-table/add" component={IntegerTableAdd}/>
                    <Route path="/integer-table/edit/:IntId" component={IntegerTableEdit}/>
                    <Route path="/person-data-list/" component={PersonData}/>
                    <Route path="/person-data/add" component={PersonDataAdd}/>
                    <Route path="/person-data/edit/:PersonId" component={PersonDataEdit}/>
                    <Route path="/groups/" component={Groups}/>
                    <Route path="/group/add" component={GroupsAdd}/>
                    <Route path="/group/edit/:groupId" component={GroupsEdit}/>
                    <Route path="/users/" component={Users}/>
                    <Route path="/user/add" component={UsersAdd}/>
                    <Route path="/user/edit/:userId" component={UsersEdit}/>
                </Router>
            </Suspense>
            <ToastContainer/>
        </Fragment>
    )
};

export default AppMain;