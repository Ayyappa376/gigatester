import { IAppFeedback, IProcessedData } from ".";

export const processBarChartData = (items: IAppFeedback[]) => {
    let ratingData : IProcessedData = {"1" : 0, "2" : 0, "3" : 0, "4" : 0, "5" : 0};
    if(items.length > 0) {
        items.forEach((item) => {
            if(item.productRating) {
                ratingData[item.productRating.toString()]++;
            }  
        })
    }
    console.log(ratingData)
    return ratingData;
}