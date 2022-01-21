import { IAppFeedback } from "./common";
import { Order } from "./RenderTable";

 export const sortTableByDate = (tableData: IAppFeedback[], sortOrder: string): IAppFeedback[] => {
    const data = [...tableData];
    data.sort((aData, bData) => {
      if (aData.createdOn > bData.createdOn) {
        return sortOrder === 'desc' ? -1 : 1;
      } else if (aData.createdOn < bData.createdOn) {
        return sortOrder === 'desc' ? 1 : -1;
      } else {
        return 0;
      }
    })
    return data;
  }
/*
export const sortTableByRating = (tableData: IAppFeedback[], sortOrder: string) => {
    const data = [...tableData];
    data.sort((aData, bData) => {
      if (aData.productRating > bData.productRating) {
        return sortOrder === 'desc' ? -1 : 1;
      } else if (aData.productRating < bData.productRating) {
        return sortOrder === 'desc' ? 1 : -1;
      } else {
        return 0;
      }
    })
    return data;
  }

export const sortTableBySeverity = (tableData: IAppFeedback[], sortOrder: string) => {
    const data = [...tableData];
    const severityMapping = {
      'Critical' : 5,
      'High': 4,
      'Medium': 3,
      'Low': 2,
      'Other': 1
    }
    data.sort((aData, bData) => {
      if (severityMapping[aData.bugPriority ? aData.bugPriority : 'Other'] > severityMapping[bData.bugPriority ? bData.bugPriority : 'Other']) {
        return sortOrder === 'desc' ? -1 : 1;
      } else if (severityMapping[aData.bugPriority ? aData.bugPriority : 'Other'] < severityMapping[bData.bugPriority ? bData.bugPriority : 'Other']) {
        return sortOrder === 'desc' ? 1 : -1;
      } else {
        return 0;
      }
    })
    return data;
  }

export const applySort = (sortData: IAppFeedback[], order: Order, orderBy: string) => {
    if (order === 'asc') {
      if(orderBy === 'date') {
        return (sortTableByDate(sortData, 'asc'))
      } else if(orderBy === 'rating') {
        return (sortTableByRating(sortData, 'asc'))
      } else if(orderBy === 'severity') {
        return (sortTableBySeverity(sortData, 'asc'))
      }
    }
    if (order === 'desc') {
      if(orderBy === 'date') {
        return (sortTableByDate(sortData, 'desc'))
      } else if(orderBy === 'rating') {
        return (sortTableByRating(sortData, 'desc'))
      } else if(orderBy === 'severity') {
        return (sortTableBySeverity(sortData, 'desc'))
      }
    }
  }
 */
/*
export const clearSearch = () => {
    const tableDataFiltered = tableData.filter((data) => {
      if(!isBugReport && data.productRating > 0) {
        return true
      }
      if(isBugReport && data.productRating === 0) {
        return true
      }
      return false;
    })
    applySort(tableDataFiltered);
    setSearchInitiated(false)
    setKeyword("")
  }


  /* const handleRequestSort = (property: string) => {
    if (orderBy === property) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrder('desc');
      setOrderBy(property);
    }
  }; */

  /*

  const filterRating = (val: number) => {
    let filteredTableData;
    if(val === -1) {
      filteredTableData = tableData.filter((data) => {
        if(!isBugReport && data.productRating > 0) {
          return true
        }
        if(isBugReport && data.productRating === 0) {
          return true
        }
        return false;
      })
    } else {
      filteredTableData = tableData.filter((el) => el.productRating === val ? true : false)
    }
    applySort(filteredTableData);
  }

  const filterSeverity = (val: string) => {
    let filteredTableData;
    if(val === "") {
      filteredTableData = tableData.filter((data) => {
        if(!isBugReport && data.productRating > 0) {
          return true
        }
        if(isBugReport && data.productRating === 0) {
          return true
        }
        return false;
      })
    } else {
      filteredTableData = tableData.filter((el) => el.bugPriority ? el.bugPriority.toLowerCase() === val.toLowerCase() ? true : false : false)
    }
    applySort(filteredTableData);
  }

  const filterCategory = (val: string) => {
    let filteredTableData;
    if(val === "") {
      filteredTableData = tableData.filter((data) => {
        if(!isBugReport && data.productRating > 0) {
          return true
        }
        if(isBugReport && data.productRating === 0) {
          return true
        }
        return false;
      })
    } else if(val === 'Other') {
      filteredTableData = tableData.filter((el) => (!el.feedbackCategory || (el.feedbackCategory.toLowerCase() === 'other')) && el.feedbackType === "BUG_REPORT" ? true : false )
    } else {
      filteredTableData = tableData.filter((el) => el.feedbackCategory ? el.feedbackCategory.toLowerCase() === val.toLowerCase() ? true : false : false)
    }
    applySort(filteredTableData);
  }
*/
