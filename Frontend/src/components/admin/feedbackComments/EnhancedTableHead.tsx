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
  rowCount: number;
  isBugReport: boolean;
  searchInitiated: boolean;
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
    { id: 'date', label: 'Date Submitted(UTC)', sortLabel: 'date', align: 'center', headType: ALROUND },
    { id: 'rating', label: 'Rating', align: 'center', headType: FEEDBACK },
    { id: 'severity', label: 'Severity', align: 'center', headType: BUG_REPORT  },
    { id: 'category', label: 'Category', align: 'center', headType: ALROUND  },
    { id: 'comments', label: 'Comments', align: 'center', headType: ALROUND },
  ];

const EnhancedTableHead = (props: EnhancedTableProps) => {
    const sortClass = useStylesLabel()
    const { classes, order, onRequestSort, searchInitiated } = props;
    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(property);
    };
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => {
            if(props.isBugReport && headCell.headType === FEEDBACK) {
              return;
            }
            if(!props.isBugReport && headCell.headType === BUG_REPORT) {
              return;
            }
            return(
            <TableCell
              key={headCell.id}
              align={headCell.align}
              style={{fontSize: '1.05rem', fontWeight: 500, color: '#666666'}}
            >
              {
                !searchInitiated && headCell.sortLabel ?
                  <Tooltip title={"Sorted according to this column"}
                    aria-label="sort-active">
                    <TableSortLabel
                      active={true}
                      direction={order}
                      onClick={createSortHandler(headCell.sortLabel)}
                      style={{color: 'rgba(0,0,0,1)'}}
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