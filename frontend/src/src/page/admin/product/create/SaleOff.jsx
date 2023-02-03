import { CalendarMonth, Paid } from '@mui/icons-material';
import { FormControl, Input, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const SaleOff = ({
    control,
    setValue,
    getValues,
    setError,
    errors
}) => {
    const [t] = useTranslation();
    return (
        <div>
            <Controller
                name="price_saled"
                control={control}
                render={({ field }) =>
                    <FormControl variant="standard"
                        style={{ margin: "0 0 10px 0" }}
                    >
                        <InputLabel htmlFor="">{t('product.list.table.price')}</InputLabel>
                        <Input
                            {...field}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Paid />
                                </InputAdornment>
                            }
                            placeholder={t('placehoder', { name: t('product.list.table.price') })}
                            onBlur={(event) => {
                                setValue(event.target.name, event.target.value ? event.target.value.trim() : '')
                            }}
                            type="number"
                        />
                    </FormControl>}
            />
            {errors.price_saled && <p className='text-danger'>{errors.price_saled.message}</p>}
            <Controller
                name="sale_type"
                control={control}
                render={({ field }) =>
                    <FormControl variant="standard"
                        style={{ margin: "0 0 10px 0" }}
                    >
                        <Select
                            {...field}
                            label={<div>{t('product.list.table.manufacturer_id')}<span className='required'></span></div>}
                            size="small"
                        >
                            <MenuItem key={-1} value={-1}>
                                {"Select sale type"}
                            </MenuItem>
                            <MenuItem key={1} value={1}>
                                {"vnđ"}
                            </MenuItem>
                            <MenuItem key={0} value={2}>
                                {"%"}
                            </MenuItem>
                        </Select>
                    </FormControl>}
            />
            {errors.sale_type && <p className='text-danger'>{errors.sale_type.message}</p>}
            <Controller
                name="expried"
                control={control}
                render={({ field }) =>
                    <FormControl variant="standard"
                        style={{ margin: "0 0 10px 0" }}
                    >
                        <InputLabel htmlFor="">Expried sale</InputLabel>
                        <Input
                            {...field}
                            startAdornment={
                                <InputAdornment position="start">
                                    <CalendarMonth />
                                </InputAdornment>
                            }
                            type='date'
                        />
                    </FormControl>}
            />
            {errors.expried && <p className='text-danger'>{errors.expried.message}</p>}
        </div>
    );
};

export default SaleOff;