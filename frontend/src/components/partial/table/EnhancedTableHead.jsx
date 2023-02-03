import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const EnhancedTableHead = (props) => {
    const {
        order,
        orderBy,
        onRequestSort,
        headCells
    } = props;

    const [t] = useTranslation();
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell
                    padding='normal'
                >
                    <span style={{ width: "70px", display: 'block' }}>Action</span>
                </TableCell>
                {
                    Object.keys(headCells).map((headCell, index) => (
                        <TableCell
                            key={headCells[headCell].id}
                            padding='normal'
                            sortDirection={orderBy === headCells[headCell].id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCells[headCell].id}
                                direction={orderBy === headCells[headCell].id ? order : 'asc'}
                                onClick={createSortHandler(headCells[headCell].id)}
                            >
                                {t(headCells[headCell].label)}
                            </TableSortLabel>
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    );
};

export default EnhancedTableHead;