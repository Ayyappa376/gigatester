import React, { Fragment, useRef, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import IdleTimer from 'react-idle-timer'
import { IdleTimeOutModal } from './components/idleTimeoutModal'
import {
  About,
  Admin,
  Assessment,
  AssessmentDetail,
  AssessmentSelect,
  Auth,
  ErrorPage,
  Logout,
  ManageSoftwareFiles,
  MetricSelect,
  Relogin,
  Result,
  TeamAssessments,
  TeamSelect,
  Trends,
  UserProfile,
  ViewAssessment,
  ViewTeams,
} from './pages';
import { QuestionRenderer } from './components';
import Dashboard from './components/admin/dashboard';
import LatestNews from './pages/latest-news';

const Layout = (props: any) => {
  const [openDialog, setOpenDialog] = useState(false);
  const idleTimeout = 1000 * 60 * 60; // In milliseconds - 1000 (1 second) * 60 (1 minute) * 60 (60 minutes) = 1 Hour
  const idleWarningTimeout = 1000 * 60 * 2; // In milliseconds - 1000 (1 second) * 60 (1 minute) * 2 (2 minutes) = 2 minutes
  let idleTimerRef: any = useRef(null)
  let sessionTimeoutRef: any = useRef(null);

  const handleOnActive = () => {
    clearTimeout(sessionTimeoutRef.current);
  }

  const handleLogout = () => {
    setOpenDialog(false);
    clearTimeout(sessionTimeoutRef.current)
    props.history.push('/logout')
  }

  const handleOnIdle = () => {
    setOpenDialog(true);
    sessionTimeoutRef.current = setTimeout(handleLogout, idleWarningTimeout);
  }

  const handleClose = () => {
    setOpenDialog(false);
  }

  return (
    <Fragment>
      <IdleTimer
        ref={idleTimerRef}
        timeout={idleTimeout}
        onIdle={handleOnIdle}
        onActive={handleOnActive}
      />
      <Switch>
        <Route
          exact path='/auth'
          render={() => <Auth {...props} />} />
        <Route
          exact path='/logout'
          render={() => <Logout {...props} />} />
        <Route
          exact path='/assessment'
          render={() => <Assessment {...props} />} />
        <Route
          exact path='/assessmentselect'
          render={() => <AssessmentSelect {...props} />} />
        <Route
          exact path='/about'
          render={() => <About {...props} />} />
        <Route
          exact path='/relogin'
          render={() => <Relogin {...props} />} />
        <Route
          exact path='/admin'
          render={() => <Admin {...props} />} />
        <Route
          exact
          path='/metricSelect'
          render={() => <MetricSelect metricType={props.metricType} metricSelection={props.metricSelection} {...props} />}
        />
        <Route
          exact
          path='/assessment/history'
          render={() => <ViewAssessment {...props} />}
        />
        <Route
          exact path={`/assessment/:assessmentId/question/:index`}
          render={() => <QuestionRenderer {...props} />} />
        <Route
          exact
          path='/result/:assessmentId'
          render={() => <Result {...props} />}
        />
        <Route
          exact
          path='/assessment/detail/:assessmentId'
          render={() => <AssessmentDetail {...props} />}
        />
        <Route exact path='/assessment/teams' component={ViewTeams} />
        <Route
          exact
          path='/assessment/teams/:teamId/:assessmentName/:version'
          render={() => <TeamAssessments {...props} />}
        />
        <Route exact path='/teamselect'
          render={() => <TeamSelect {...props} />} />
        <Route exact path='/manageSoftwareFiles'
          render={() => <ManageSoftwareFiles {...props} />} />
        <Route exact path='/error' render={() => <ErrorPage {...props} />} />
        <Route exact path='/admin/dashboard' render={() => <Dashboard {...props} />} />
        <Route exact path='/trends' render={() => <Trends {...props} />} />
        <Route
          exact path='/latestNews'
          render={() => <LatestNews {...props} />} />
        <Route
          exact path='/profile'
          render={() => <UserProfile {...props} />} />
      </Switch>

      <IdleTimeOutModal
        openDialog={openDialog}
        handleClose={handleClose}
        handleLogout={handleLogout}
      />
    </Fragment>
  )
}

export default Layout;