import { AssessmentDetails, AssessmentDocument, Result } from '@utils/index';

export interface HistoryAcknowledgement {
  assessments: Array<{
    assessmentDetails?: AssessmentDetails;
    assessmentId: string;
    assessmentName?: string;
    date: number;
    dateSubmit?: number;
    hideResult: boolean;
    questionnaireVersion?: string;
    result?: Result;
    team?: string;
    timeOut: boolean;
    type?: string;
    userId: string;
  }>;
}

export function getResponseBody(
  assessmentHistory: AssessmentDocument[]
): HistoryAcknowledgement {
  const acknowledgement: HistoryAcknowledgement = {
    assessments: [],
  };

  assessmentHistory.forEach((item) => {
    const timeOut = item.questionnaireDetails
      ? item.questionnaireDetails.timeOut
        ? item.questionnaireDetails.timeOut
        : false
      : false;
    const hideResult = item.questionnaireDetails
      ? item.questionnaireDetails.hideResult
        ? item.questionnaireDetails.hideResult
        : false
      : false;
    if (item.result) {
      acknowledgement.assessments.push({
        assessmentDetails: item.assessmentDetails,
        assessmentId: item.assessmentId,
        assessmentName: item.assessmentName,
        date: item.date,
        dateSubmit: item.dateSubmit,
        hideResult,
        questionnaireVersion: item.questionnaireVersion,
        result: item.result,
        team: item.team,
        timeOut,
        type: item.type,
        userId: item.userId,
      });
    } else {
      if (!timeOut) {
        acknowledgement.assessments.push({
          assessmentDetails: item.assessmentDetails,
          assessmentId: item.assessmentId,
          assessmentName: item.assessmentName,
          date: item.date,
          dateSubmit: item.dateSubmit,
          hideResult,
          questionnaireVersion: item.questionnaireVersion,
          result: item.result,
          team: item.team,
          timeOut,
          type: item.type,
          userId: item.userId,
        });
      }
    }
  });

  return acknowledgement;
}
