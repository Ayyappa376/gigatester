import {
    FETCH_TEAM_ASSESMENTS_START,
    FETCH_TEAM_ASSESMENTS_FAIL,
    FETCH_TEAM_ASSESMENTS_SUCCESS,
    AssesmentActions
} from '../../actions';

import { ILoadTeamAssessmentsRequest, IAssesment } from '../../model'

const teamAssessments = {
    [FETCH_TEAM_ASSESMENTS_START]
        (state: IAssesment,
            action: AssesmentActions<ILoadTeamAssessmentsRequest>) {
        return {
            ...state,
            teamAssessments: {
                ...action.payload
            }
        }
    },
    [FETCH_TEAM_ASSESMENTS_FAIL]
        (state: IAssesment,
            action: AssesmentActions<ILoadTeamAssessmentsRequest>) {
        return {
            ...state,
            teamAssessments: {
                ...action.payload
            }
        }
    },
    [FETCH_TEAM_ASSESMENTS_SUCCESS]
        (state: IAssesment,
            action: AssesmentActions<ILoadTeamAssessmentsRequest>) {
        return {
            ...state,
            teamAssessments: {
                ...action.payload
            }
        }
    },
}

export { teamAssessments }
