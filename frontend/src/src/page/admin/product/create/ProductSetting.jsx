import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const ProductSetting = (props) => {
    const {
        control,
        setValue,
        getValues,
        setError,
        clearErrors,
        errors,
    } = props;
    const [t] = useTranslation();
    return (
        <div className="card__admin">
            <Typography variant="h5" className='cart_admin_title' gutterBottom>
                Setting
            </Typography>

            <Grid container sx={{ margin: 0, padding: 1, width: '100%' }} spacing={10}>
                <Grid item xs={6}>
                    <div className='d-inline'>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) =>
                                <FormControl>
                                    <FormLabel id="status">Status<span className='required'></span></FormLabel>
                                    <RadioGroup
                                        defaultValue="1"
                                        {...field}
                                        checked={'1'}
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="Active" />
                                        <FormControlLabel value="0" control={<Radio />} label="Block" />
                                    </RadioGroup>
                                </FormControl>
                            }
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductSetting;