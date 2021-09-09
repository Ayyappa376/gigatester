import React, { useEffect, useState } from 'react';
import { Route, Router } from 'react-router-dom';
import { history } from './configureStore';
import {
  Assesment,
  Home,
  Auth,
  About,
  Result,
  Logout,
  ViewAssessment,
  AssessmentDetail,
  ViewTeams,
  TeamAssessments,
  Relogin,
  TeamSelect,
  AssessmentSelect,
  Admin,
  ErrorPage,
  TrialHome,
  TrialClose,
  MetricSelect,
} from './pages';
import { QuestionRenderer, PageHeader } from './components';
import { useSelector } from 'react-redux';
import { useActions, removeUserDetails } from './actions';
import { IRootState } from './reducers';
import ReactGA from 'react-ga';
import Dashboard from './components/admin/dashboard';
import { LanguageProvider } from '../../Frontend/src/common/Language.js';

interface IDoitrightProps {}

const GA_id_prod = 'UA-154108167-2';
const GA_id_dev = 'UA-154108167-1';
const GA_id_beta = 'UA-154108167-3';

const DoItRight = (props: IDoitrightProps) => {
  const userData = useSelector((state: IRootState) => state.user.userDetails);
  const removeUserData = useActions(removeUserDetails);
  const env = process.env.REACT_APP_STAGE;
  const [metricType, setMetricType] = useState('doraMetrics');

  useEffect(() => {
    if (userData) {
      const date = Number(new Date());
      const dateSeconds = date / 1000;
      if (dateSeconds > userData.exp) {
        removeUserData();
      }
    }
    if (env === 'Prod') {
      ReactGA.initialize(GA_id_prod);
    } else if (env === 'Beta') {
      ReactGA.initialize(GA_id_beta);
    } else if (env === 'Dev') {
      ReactGA.initialize(GA_id_dev);
    }
    // https://levelup.gitconnected.com/using-google-analytics-with-react-3d98d709399b
    if (userData && userData.email) {
      ReactGA.set({
        userId: userData.email,
      });
    }
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const getMetricsType = (type: any) => {
    setMetricType(type);
  };

  return (
    <LanguageProvider>
      <Router history={history}>
        <PageHeader getMetricsType={(type: any) => getMetricsType(type)} />
        <Route exact path='/' component={Home} />
        <Route exact path='/assessment' component={Assesment} />
        <Route exact path='/assessmentselect' component={AssessmentSelect} />
        <Route exact path='/auth' component={Auth} />
        <Route exact path='/about' component={About} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/relogin' component={Relogin} />
        <Route exact path='/assessment/history' component={ViewAssessment} />
        <Route exact path={`/assessment/:assesmentId/question/:index`} component={QuestionRenderer} />
        <Route exact path='/result/:assesmentId' component={Result} />
        <Route exact path='/assessment/detail/:assessmentId' component={AssessmentDetail} />
        <Route exact path='/assessment/teams' component={ViewTeams} />
        <Route exact path='/assessment/teams/:teamName/:assessmentName/:version' component={TeamAssessments} />
        <Route exact path='/teamselect' component={TeamSelect} />
        <Route exact path='/error' component={ErrorPage} />
        <Route exact path='/admin' component={Admin} />
        <Route exact path='/admin/dashboard' component={Dashboard} />
        <Route exact path='/trial' component={TrialHome} />
        <Route exact path='/trial/close' component={TrialClose} />
        <Route exact path='/metricSelect' render={() => <MetricSelect metricType={metricType} />} />
      </Router>
    </LanguageProvider>
  );
};

export default DoItRight;
