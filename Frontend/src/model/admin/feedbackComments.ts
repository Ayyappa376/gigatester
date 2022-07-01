import { ICategory, IFeedbackFlowType, IProductParams } from ".";

interface ISignedUrlObj {
    signedUrl: string;
    date: number;
}

export interface ISignedUrls {
    [key: string] : ISignedUrlObj
}

export interface IBugSettingProps {
    productParams: IProductParams;  
    addBugCategory: Function;
    handleChangeBugCategoryName: Function;
    handleChangeJiraFieldMapping: Function;
    handleChangeExtSeverityFilter: Function;
    handleChangeExtCategoryFilter: Function;
    deleteBugCategory: Function;
    addBugStdFeedbackText: Function;
    handleChangeBugStdFeedbackText: Function;
    handleExtTrackingSystemSync: Function;
    deleteBugStdFeedbackText: Function;
    handleBugTitleChange: Function;
    handleBugTooltipChange: Function;
    handleBugDialogMsgChange: Function;
    handleBugThanksMsgChange: Function;
    handleReqComments: Function;
    handleReqDisplayEmail: Function;
    addBugSeverity: Function;
    handleChangeBugSeverityName: Function;
    deleteBugSeverity: Function;
    handleShowSeverityOption: Function;
      handleIconChange: Function;
    handleURLChange: Function,
    handleAuthChange: Function,
    handleTrackingSytemProjectDetails: Function,
    handleSystemTypeChange: Function,
    handleExtSystemSeverity: Function,
    handleBugGeneralCommentsHeadingChange: Function,
    handleBugCategoryHeadingChange: Function,
    handleBugStdFeedbackHeadingChange: Function,
    handleBugSeverityHeadingChange: Function
  //  handleTrackingSystemDetails: Function,
  //  handleSetTrackingSystemBugSeverity: Function,
  //  useTrackingSystemSeverity: boolean,
  }

  export interface IFeedbackSettingProps {
    productParams: IProductParams;
    addFeedbackCategory: Function;
    handleChangeFeedbackCategoryName: Function;
    deleteFeedbackCategory: Function;
    addFeedbackStdFeedbackText: Function;
    handleChangeFeedbackStdFeedbackText: Function;
    deleteFeedbackStdFeedbackText: Function;
    handleFeedbackTitleChange: Function;
    handleFeedbackTooltipChange: Function;
    handleFeedbackDialogMsgChange: Function;
    handleFeedbackThanksMsgChange: Function;
    handleRatingLimitChange: Function;
    handleReqComments: Function;
    handleReqDisplayEmail: Function;
    handleIconChange: Function;
    handleFeedbackRatingHeadingChange: Function;
    handleFeedbackFlowChange: Function;
    handleChangeFeedbackStdPositiveFeedbackText: Function;
    handleChangeFeedbackStdNegativeFeedbackText: Function;
    addFeedbackStdPositiveFeedbackText: Function;
    addFeedbackStdNegativeFeedbackText: Function;
    deleteFeedbackStdPositiveFeedbackText: Function;
    deleteFeedbackStdNegativeFeedbackText: Function;
    handleFeedbackGeneralCommentsHeadingChange: Function,
    handleFeedbackCategoryHeadingChange: Function,
    handleFeedbackStdFeedbackHeadingChange: Function
  }

  export interface ICategoryList {
    category: ICategory,
    catIndex: number,
    feedbackFlowType: IFeedbackFlowType,
    handleChangeFeedbackCategoryName: Function,
    deleteFeedbackCategory: Function,
    addFeedbackStdFeedbackText: Function,
    handleChangeFeedbackStdFeedbackText: Function,
    deleteFeedbackStdFeedbackText: Function,
    handleChangeFeedbackStdPositiveFeedbackText: Function,
    handleChangeFeedbackStdNegativeFeedbackText: Function,
    addFeedbackStdPositiveFeedbackText: Function,
    addFeedbackStdNegativeFeedbackText: Function,
    deleteFeedbackStdPositiveFeedbackText: Function,
    deleteFeedbackStdNegativeFeedbackText: Function
  }