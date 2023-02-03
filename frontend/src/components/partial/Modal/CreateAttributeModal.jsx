import { Box, Button, CircularProgress, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AccountCircle } from '@mui/icons-material';
import { axiosClient } from '../../../hooks/useHttp';
import { GROUP_CATEGORY_API } from '../../../constants/api';
import { CODE, STATUS } from '../../../constants/constants';

const CreateAttributeModal = ({
    getAttributeList,
    groupCategorytList,
    setShowNoti,
    setStatus,
}) => {
    const [t] = useTranslation();
    const [loading, setLoading] = useState(false);
    const validationSchema = Yup.object().shape({
        attribute: Yup.string().
            required(t('validate.required', { name: 'attribute' })),
        group_category_id: Yup.string()
            .required(t('validate.required', { name: 'Group category' }))
            .test("isSelect", t('validate.required', { name: 'Group category' }), value => value != "-1"),
    });
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        setError,
        formState: { errors } }
        = useForm({
            shouldUnregister: false,
            defaultValues: {
                attribute: "",
                group_category_id: -1
            },
            resolver: yupResolver(validationSchema),
        });

    const handleCreate = useCallback((value) => {
        setLoading(true);
        axiosClient.post(GROUP_CATEGORY_API.ATTRIBUTE_CREATE, {
            ...value
        })
            .then((response) => {
                setShowNoti(true);
                setLoading(false);
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({ type: 'success', message: response.data.message });
                    reset();
                    getAttributeList()
                }

                if (response.data.code === CODE.HTTP_NOT_FOUND) {
                    setStatus({ type: 'error', message: response.data.message });
                }
            }).catch(({ response }) => {
                setShowNoti(true);
                setLoading(false);
                if (response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    Object.keys(response.data.errors).forEach(element => {
                        setError(element, { type: 'custom', message: Object.values(response.data.errors[element]) })
                    });
                } else {
                    setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
                }
            });
    }, []);
    return (
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"} color="#fff">
                Create new Attribute
            </Typography>
            <form>
                <Grid container sx={{ margin: 0, padding: 1, width: '100%' }} spacing={10}>
                    <Grid item xs={12}>
                        <Controller
                            name="group_category_id"
                            control={control}
                            render={({ field }) =>
                                <FormControl variant="standard">
                                    <Select
                                        {...field}
                                        label={<div>{t('product.list.table.group_category_id')}<span className='required'></span></div>}
                                        size="small"
                                    >
                                        <MenuItem key={""} value={-1}>
                                            {"select group category"}
                                        </MenuItem>

                                        {
                                            groupCategorytList.length > 0 && (
                                                groupCategorytList.map(item => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))
                                            )
                                        }
                                    </Select>
                                </FormControl>}
                        />
                        {errors.group_category_id && <p className='text-danger'>{errors.group_category_id.message}</p>}
                    </Grid>
                    <Grid item xs={12}>
                        <div className='d-inline'>
                            <Controller
                                name="attribute"
                                control={control}
                                render={({ field }) =>
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="userCode">Attribute <span className='required'></span></InputLabel>
                                        <Input
                                            {...field}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            }
                                            placeholder={t('placehoder', { name: 'Attribute' })}
                                            onBlur={(event) => {
                                                setValue(event.target.name, event.target.value ? event.target.value.trim() : '')
                                            }}
                                        />
                                    </FormControl>
                                }
                            />
                            {errors.attribute && <p className='text-danger'>{errors.attribute.message}</p>}
                        </div>
                    </Grid>

                    <Button variant="contained" className='m-1' style={{ textTransform: 'none', maxWidth: '100%' }}
                        onClick={handleSubmit(handleCreate)}
                        disabled={loading}>{loading &&
                            <CircularProgress
                                disableShrink
                                style={{ color: 'white', width: '14px', height: '14px', margin: '0 5px 0 0' }} />}
                        Create new attribute
                    </Button>
                </Grid>
            </form>
        </div>
    );
};

export default CreateAttributeModal;