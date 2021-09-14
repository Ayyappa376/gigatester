import {
  IAssessmentListItem,
  ITeamsAssessmentResponse,
  ITeamsAssessmentStoreFormat,
  ITeamAssessment,
} from '../../model';

/*
export const mapTeamAssessmet = (
  response: ITeamsAssessmentResponse
): ITeamsAssessmentStoreFormat => {
  const teamAssessment: ITeamAssessment[] = Object.keys(response).map((key) => {
    const totalScore = response[key].assessments.reduce(
      (acc, assessmentData) => {
        return assessmentData.result!.percentage + acc;
      },
      0
    );
    const totalAssessment = response[key].assessments.length;
    const averageScore = Math.floor(totalScore / totalAssessment);
    return {
      averageScore,
      teamName: key,
      maxScore: 10,
      level: 'low',
      assessments: response[key].assessments,
    };
  });

  return {
    teams: teamAssessment,
  };
};
*/
export const mapTeamAssessmet = (
  response: ITeamsAssessmentResponse
): ITeamsAssessmentStoreFormat => {
  const teamAssessments: ITeamAssessment[] = [];

  Object.keys(response.teams).forEach((team: string) => {
    const assessmentNameVersionMap: {
      [key: string]: IAssessmentListItem[];
    } = {};

    response.teams[team].assessments.forEach(
      (assessment: IAssessmentListItem) => {
        const key = `${assessment.assessmentName}_${assessment.questionnaireVersion}`;
        if (!Object.keys(assessmentNameVersionMap).includes(key)) {
          assessmentNameVersionMap[key] = [];
        }
        assessmentNameVersionMap[key].push(assessment);
      }
    );

    Object.keys(assessmentNameVersionMap).forEach((key: string) => {
      const totalScore = assessmentNameVersionMap[key].reduce(
        (acc, assessmentData) => {
          return assessmentData.result!.percentage + acc;
        },
        0
      );
      const totalAssessment = assessmentNameVersionMap[key].length;
      const averageScore = Math.round(totalScore / totalAssessment);

      const assessmentRow: ITeamAssessment = {
        teamName: team,
        assessmentName: assessmentNameVersionMap[key][0].assessmentName
          ? assessmentNameVersionMap[key][0].assessmentName
          : '',
        type: assessmentNameVersionMap[key][0].type
          ? assessmentNameVersionMap[key][0].type
          : '',
        questionnaireVersion: assessmentNameVersionMap[key][0]
          .questionnaireVersion
          ? assessmentNameVersionMap[key][0].questionnaireVersion
          : '1',
        averageScore,
        //        maxScore: 10,
        level: 'low',
        assessments: assessmentNameVersionMap[key],
      };
      teamAssessments.push(assessmentRow);
    });
  });

  return {
    teams: teamAssessments,
    userLevels: response.userLevels,
  };
};
