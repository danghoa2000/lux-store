import { Input, TableCell, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const EditTableCell = ({ children, editting, label, flagEdit, inputNode, name, control }) => {
    const [t] = useTranslation();
    const INPUTMOD = useMemo(() => {
        switch (inputNode) {
            default:
                return (
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) =>
                            <Input
                                {...field}
                                type={inputNode}
                                placeholder={t('placehoder', { name: t(label) })}
                            />}
                    />
                )
        }
    }, [inputNode, control]);
    return (
        <TableCell
            component="td"
            scope="row"
            padding="normal"
        >
            {editting && flagEdit ? (
                INPUTMOD
            ) : (
                children
            )}
        </TableCell>
    );
};

export default EditTableCell;