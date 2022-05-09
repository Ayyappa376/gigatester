import uuidv1 from 'uuid/v1';

export const processExternalTrackSystem = (trackingSystem: any, tableparams: any) => {
    const{ filters } = trackingSystem;
    let trackingTableParams: any = {};
    console.log(filters, 'filter');
    let filterResult = false;
    if(filters) {
    Object.keys(trackingSystem.filters).map((filterList) => {
        if(filterList.toLowerCase() === 'categories') {
            Object.keys(trackingSystem.filters[filterList]).map((catList) => {
                if(trackingSystem.filters[filterList][catList] === true && catList.toLowerCase() === tableparams.Item.feedbackCategory.toLowerCase()) {
                    filterResult = true;
                }
            });
        } else if(filterList.toLowerCase() === 'severities') {
            Object.keys(trackingSystem.filters[filterList]).map((sevList) => {
                if(trackingSystem.filters[filterList][sevList] === true && sevList.toLowerCase() === tableparams.Item.bugPriority.toLowerCase()) {
                    filterResult = true;
                }
            });
        }
        console.log(filterList, filterResult);
    });
    }
    if(filterResult) {
        trackingTableParams = {
          Item: {
            createdOn: tableparams.Item.createdOn,
            feedbackId: tableparams.Item.id,
            id: `extIssueTracker_${uuidv1()}`,
            trackingSystem,
          }
        };
    }
    return trackingTableParams && trackingTableParams.Item ? trackingTableParams : false;
};
