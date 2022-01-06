import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel, makeStyles } from '@material-ui/core';
import { IAlign, Order, useStyles } from './RenderTable';

type HeadType = 'bug_report' | 'feedback' | 'alround'

const BUG_REPORT = 'bug_report'

const FEEDBACK = 'feedback'

const ALROUND = 'alround'

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (property: string) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  isBugReport: boolean;
}

interface HeadCell {
  id: string;
  label: string;
  sortLabel?: string;
  align: IAlign;
  headType: HeadType;
}

const headCells: HeadCell[] = [
    { id: 'userName', label: 'User Name', align: 'left', headType: ALROUND },
    { id: 'date', label: 'Date Submitted', sortLabel: 'date', align: 'center', headType: ALROUND },
    { id: 'rating', label: 'Rating', sortLabel: 'rating', align: 'center', headType: FEEDBACK },
    { id: 'categories', label: 'Categories', align: 'center', headType: BUG_REPORT  },
    { id: 'comments', label: 'Comments', align: 'center', headType: ALROUND },
  ];

const EnhancedTableHead = (props: EnhancedTableProps) => {
    const { classes, order, orderBy, onRequestSort, isBugReport } = props;
    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => {
            if(isBugReport && headCell.headType === FEEDBACK) {
              return;
            }
            if(!isBugReport && headCell.headType === BUG_REPORT) {
              return;
            }
            console.log({orderBy, headCell})
            return(
            <TableCell
            style={{maxWidth: 200}}
              key={headCell.id}
              align={headCell.align}
              padding={'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {
                headCell.sortLabel ? 
                
                  <TableSortLabel
                    active={orderBy === headCell.sortLabel}
                    direction={orderBy === headCell.sortLabel ? order : 'asc'}
                    onClick={createSortHandler(headCell.sortLabel)}
                  >
                    {headCell.label}
                    {/* {orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </span>
                    ) : null} */}
                  </TableSortLabel> : 
                  <div>
                    {headCell.label}
                  </div>
              }
              
            </TableCell>
          )})}
        </TableRow>
      </TableHead>
    );
  }
  
  export default EnhancedTableHead;