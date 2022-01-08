export interface AppFeedback {
    createdOn: number;
    feedbackComment?: string;
    id: string;
    productId?: string;
    productRating?: number;
    productVersion?: number;
    sourceIP?: string;
    userId?: string;
}
