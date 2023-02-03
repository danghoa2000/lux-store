import { Box, Button, CircularProgress, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AccountCircle } from '@mui/icons-material';
import { ATTRIBUTE_API, GROUP_CATEGORY_API } from '../../../constants/api';
import { axiosClient } from '../../../hooks/useHttp';
import { CODE } from '../../../constants/constants';

const CreateAttributeValueModal = ({
    groupCategorytList,
    setShowNoti,
    setStatus,
    currentRef,
}) => {
    const [t] = useTranslation();
    const [loading, setLoading] = useState(false);
    const [attributeList, setAttributeList] = useState([]);
    const [groupCategoryId, setGroupCategoryId] = useState(-1);
    const [attribute, setAttribute] = useState(-1);
    const validationSchema = Yup.object().shape({
        attributeValue: Yup.string().
            required(t('validate.required', { name: 'attribute' })),
        group_category_id: Yup.string()
            .required(t('validate.required', { name: 'Group category' }))
            .test("isSelect", t('validate.required', { name: 'Group category' }), value => value != -1),
        attribute: Yup.string()
            .required(t('validate.required', { name: 'attribute' }))
            .test("isSelect", t('validate.required', { name: 'attribute' }), value => value != -1),
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
                group_category_id: groupCategoryId,
                attributeValue: "",
                attribute: attribute
            },
            resolver: yupResolver(validationSchema),
        });

    const getAttributeList = useCallback(() => {
        axiosClient.get(GROUP_CATEGORY_API.ATTRIBUTE, {
            params: {
                group_category_id: groupCategoryId
            }
        })
            .then((result) => {
                setAttributeList(result.data.groupCategories?.attributes.map(({ id, name }) => ({ id, name })))
            }).catch((err) => {
                console.log(err);
            });
    }, [groupCategoryId]);

    const handleCreate = useCallback((value) => {
        setLoading(true);
        axiosClient.post(ATTRIBUTE_API.CREATE, {
            ...value
        })
            .then((response) => {
                setShowNoti(true);
                setLoading(false);
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({ type: 'success', message: response.data.message });
                    reset();
                    setGroupCategoryId(-1);
                    setAttribute(-1);
                }

                if (response.data.code === CODE.HTTP_NOT_FOUND) {
                    setStatus({ type: 'error', message: response.data.message });
                }
            }).catch(( response ) => {
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

    useEffect(() => {
        if (groupCategoryId != -1) {
            getAttributeList();
        } else {
            setAttributeList([])
        }
    }, [groupCategoryId])
    return (
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"} color="#fff">
                Create new value
            </Typography>
            <form>
                <Grid container sx={{ margin: 0, padding: 1, width: '100%' }} spacing={10}>
                    <Grid item xs={12}>
                        <div className='d-inline'>
                            <Controller
                                name="group_category_id"
                                control={control}
                                render={({ field }) =>
                                    <FormControl variant="standard">
                                        <Select
                                            {...field}
                                            label={<div>{"Group category"}<span className='required'></span></div>}
                                            size="small"
                                            value={groupCategoryId}
                                            onChange={e => {
                                                setGroupCategoryId(e.target.value)
                                                setValue("group_category_id", e.target.value)
                                                setValue("attribute", -1)
                                                setAttribute(-1)
                                            }}
                                        >
                                            <MenuItem key={""} value={-1}>
                                                {"select Group category"}
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
                                    </FormControl>
                                }
                            />
                            {errors.group_category_id && <p className='text-danger'>{errors.group_category_id.message}</p>}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="attribute"
                            control={control}
                            render={({ field }) =>
                                <FormControl variant="standard">
                                    <Select
                                        {...field}
                                        label={<div>{"attribute"}<span className='required'></span></div>}
                                        size="small"
                                        value={attribute}
                                        onChange={e => {
                                            setAttribute(e.target.value)
                                            setValue("attribute", e.target.value)
                                        }}
                                    >
                                        <MenuItem key={""} value={-1}>
                                            {"select attribute name"}
                                        </MenuItem>

                                        {
                                            attributeList.length > 0 && (
                                                attributeList.map(item => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))
                                            )
                                        }
                                    </Select>
                                </FormControl>}
                        />
                        {errors.attribute && <p className='text-danger'>{errors.attribute.message}</p>}
                    </Grid>
                    <Grid item xs={12}>
                        <div className='d-inline'>
                            <Controller
                                name="attributeValue"
                                control={control}
                                render={({ field }) =>
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="userCode">Attribute value <span className='required'></span></InputLabel>
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
                            {errors.attributeValue && <p className='text-danger'>{errors.attributeValue.message}</p>}
                        </div>
                    </Grid>
                    <Button variant="contained" className='m-1' style={{ textTransform: 'none', width: 180, maxWidth: '100%' }}
                        onClick={handleSubmit(handleCreate)}
                        disabled={loading}>{loading &&
                            <CircularProgress
                                disableShrink
                                style={{ color: 'white', width: '14px', height: '14px', margin: '0 5px 0 0' }} />}
                        Create new value
                    </Button>
                </Grid>
            </form>
        </div>
    );
};

export default CreateAttributeValueModal;