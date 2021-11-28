export interface Questionnaire {
  active?: boolean;
  categories?: string[];
  categoriesMap: CategoriesMap;
  createdBy?: string;
  createdOn: number;
  description?: string;
  modifiedBy?: string;
  modifiedOn?: number;
  name: string;
  publishedBy?: string;
  publishedOn?: number;
  questionnaireId: string;
  questions: string[];
  randomize?: boolean;
  benchmarkScore?: number;
  hideResult?: boolean;
  lastVersion?: string;
  showRecommendations?: boolean;
  timeOut?: boolean;
  timeOutTime?: number;
  version: string;
  warningTimePercentage?: number;
}

export interface CategoriesMap {
  [questionId: string]: string;
}
