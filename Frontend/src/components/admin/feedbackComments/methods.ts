import { IAppFeedback, IProcessedData } from ".";
import { BUG_REPORT } from "./RenderTable";

const convertFirstLetterToUppercase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

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

export const processPieChartData = (pData: IProcessedData) => {
    let dissatisfied = 0;
    let satisfied = 0;
    let somewhatSatisfied = 0;
    dissatisfied = pData['1'] + pData['2'];
    somewhatSatisfied = pData['3'];
    satisfied = pData['4'] + pData['5'];
    return {dissatisfied, satisfied, somewhatSatisfied}
}

export const bugProcessBarChartData = (items: IAppFeedback[]) => {
    let severityData : IProcessedData = {"Critical" : 0, "High" : 0, "Medium" : 0, "Low" : 0};
    if(items.length > 0) {
        items.forEach((item) => {
            if(item.bugPriority && (item.feedbackType === 'BUG_REPORT' || item.productRating === 0 || typeof item.productRating === undefined )) {
                severityData[convertFirstLetterToUppercase(item.bugPriority)]++;
            }  
        })
    }
    return severityData;
}

export const bugProcessPieChartData = (items: IAppFeedback[]) => {
    let categoryData : IProcessedData = {"Audio" : 0, "Video" : 0, "Screen" : 0, "Images" : 0, "Other": 0};
    if(items.length > 0) {
        items.forEach((item) => {
            if(item.feedbackCategory && (item.feedbackType === 'BUG_REPORT' || item.productRating === 0 || typeof item.productRating === undefined )) {
                categoryData[convertFirstLetterToUppercase(item.feedbackCategory)]++;
            }  
        })
    }
    return categoryData;
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