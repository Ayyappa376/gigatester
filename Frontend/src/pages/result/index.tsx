import React, { useEffect, Fragment } from 'react';
import { ResultParent, Feedback } from '../../components';
import { useActions } from '../../actions';
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import { fetchAssesmentResultData } from '../../actions/result';
import { Text } from '../../common/Language';
import { RouteComponentProps } from 'react-router-dom';
interface IResultRouteParams {
  assesmentId: string;
}
type IResultProps = RouteComponentProps<IResultRouteParams>;
const Result = (props: IResultProps) => {
  const fetchAssessmentResult = useActions(fetchAssesmentResultData);
  const assesmentResult = useSelector(
    (state: IRootState) => state.assesment.result
  );
  // const assessmentId = props.match!.params;
  // console.log('assessment id---------------------------', assessmentId)
  const id = window.location.pathname;
  const assessmentId = id.substring(id.lastIndexOf('/') + 1, id.length);
  useEffect(() => {
    if (assesmentResult.status !== 'success') {
      // hardcoding the assessment id for now
      fetchAssessmentResult(assessmentId);
    }
  }, []);
  if (assesmentResult.status === 'success' && assesmentResult.data !== null) {
    return (
      <Fragment>
        <ResultParent data={assesmentResult.data} />
        <Feedback />
      </Fragment>
    );
  }
  return (
    <div>
      <Text tid='loading' />
    </div>
  );
};

export default Result;
