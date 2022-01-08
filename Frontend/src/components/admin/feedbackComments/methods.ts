import { IAppFeedback, IProcessedData } from ".";
import { FEEDBACK } from "./RenderTable";

export const processBarChartData = (items: IAppFeedback[]) => {
    let ratingData : IProcessedData = {"1" : 0, "2" : 0, "3" : 0, "4" : 0, "5" : 0};
    if(items.length > 0) {
        items.forEach((item) => {
            if(item.productRating && typeof item.productRating !== 'string') {
                ratingData[item.productRating.toString()]++;
            }  
        })
    }
    console.log(ratingData)
    return ratingData;
}

export const getImportantKeywords = (rawTableData: IAppFeedback[]) => {
    return new Promise((resolve, reject) => {
        const bugKeywords: string[] = [];
        const feedbackKeywords: string[] = [];

        const NUMBER_OF_KEYWORDS = 15;
        let bugsConc = "" // Conc stands for concatenated
        let feedbackConc = "" // Conc stands for concatenated
        rawTableData.forEach((el) => {
            if(el.feedbackType==='FEEDBACK') {
                feedbackConc = feedbackConc + ' ' + ((el.feedbackComments && el.feedbackComments.length > 0) ? el.feedbackComments.join(" ") : '')
            } else if(el.feedbackType==='BUG_REPORT') {
                bugsConc = bugsConc + ' ' + ((el.feedbackComments && el.feedbackComments.length > 0) ? el.feedbackComments.join(" ") : '')
            }
        })

        const bugTokens = bugsConc.split(/(?:,.| )+/).filter((el) => el.length >= 5)
        const feedbackTokens = feedbackConc.split(/(?:,.| )+/).filter((el) => el.length >= 5)

        Array.from(Array(NUMBER_OF_KEYWORDS).keys()).forEach(() => {
            const randomElBug = Math.floor(Math.random() * bugTokens.length);
            const randomElFeedback = Math.floor(Math.random() * feedbackTokens.length);

            bugKeywords.push(bugTokens[randomElBug]);
            feedbackKeywords.push(feedbackTokens[randomElFeedback])
        })

        return resolve({
            bugKeywords: bugKeywords,
            feedbackKeywords: feedbackKeywords
        })
    })
}