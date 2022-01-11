import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel, makeStyles, Tooltip } from '@material-ui/core';
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

const useStylesLabel = makeStyles({
  icon: {
    textAlign: 'center',
    color: 'rgb(0,0,0,.8) !important',
    opacity: 1
  },
  /* active: {
    color: 'rgb(0,0,0,.9) !important'
  } */
}, { name: 'MuiTableSortLabel' });

const headCells: HeadCell[] = [
    { id: 'userName', label: 'User Name', align: 'left', headType: ALROUND },
    { id: 'date', label: 'Date Submitted', sortLabel: 'date', align: 'center', headType: ALROUND },
    { id: 'rating', label: 'Rating', sortLabel: 'rating', align: 'center', headType: FEEDBACK },
    { id: 'categories', label: 'Categories', align: 'center', headType: BUG_REPORT  },
    { id: 'comments', label: 'Comments', align: 'center', headType: ALROUND },
  ];

const EnhancedTableHead = (props: EnhancedTableProps) => {
    const sortClass = useStylesLabel()
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
            return(
            <TableCell
              key={headCell.id}
              align={headCell.align}
              sortDirection={orderBy === headCell.id ? order : false}
              style={{fontSize: '1.05rem', fontWeight: 500, color: '#666666'}}
            >
              {
                headCell.sortLabel ?
                  <Tooltip title={orderBy === headCell.sortLabel ? "Sorted according to this column" : "Click to apply sorting for this column"}
                    aria-label="sort-active">
                    <TableSortLabel
                      active={orderBy === headCell.sortLabel}
                      direction={orderBy === headCell.sortLabel ? order : 'asc'}
                      onClick={createSortHandler(headCell.sortLabel)}
                      style={{color: orderBy === headCell.sortLabel? 'rgba(0,0,0,1)' : '#666666'}}
                    >
                      <div >
                        {headCell.label}
                      </div>
                    </TableSortLabel>
                  </Tooltip> : 
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