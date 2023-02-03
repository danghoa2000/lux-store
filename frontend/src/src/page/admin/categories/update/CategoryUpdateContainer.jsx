import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { CATEGORIES_API, GROUP_CATEGORY_API } from '../../../../../constants/api';
import { axiosClient } from '../../../../../hooks/useHttp';
import CategoryUpdate from './CategoryUpdate';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { CODE, STATUS } from '../../../../../constants/constants';
import { useEffect } from 'react';

const CategoryUpdateContainer = () => {

    const navigate = useNavigate();
    const [toggleDirection, setToggleDirection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [category, setCategory] = useState();
    const { state } = useLocation();
    const [groupCategoryList, setGroupCategoryList] = useState([]);

    const [t] = useTranslation();
    const redirectBack = () => navigate(-1);

    const validationSchema = Yup.object().shape({
        category_code: Yup.string().
            required(t('validate.required', { name: 'Category code' })),
    });

    const getCategory = useCallback(() => {
        axiosClient.get(CATEGORIES_API.SHOW, {
            params: {
                id: state.id
            }
        }).then((response) => {
            setCategory(response.data.category);
            if (response.data.code === CODE.HTTP_NOT_FOUND) {
                setStatus({ type: 'error', message: response.data.message });
                setShowNoti(true)
            };
        }).catch(({ response }) => {
            setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            setShowNoti(true)
        });
    }, [state])

    useEffect(() => {
        getCategory();
    }, [state])

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
                category_code: '',
                name: '',
                status: STATUS.ACTIVE,
                group_category_id: '',
                description: '',
            },
            resolver: yupResolver(validationSchema),
        });

    const handleUpdate = useCallback((value) => {
        setLoading(true);
        axiosClient.put(CATEGORIES_API.UPDATE, {
            ...value
        })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({ type: 'success', message: response.data.message });
                }
                if (response.data.code === CODE.HTTP_NOT_FOUND) {
                    setStatus({ type: 'error', message: response.data.message });
                };
                setShowNoti(true)
                setLoading(false);
            }).catch(({ response }) => {
                if (response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    Object.keys(response.data.errors).forEach(element => {
                        setError(element, { type: 'custom', message: Object.values(response.data.errors[element]) })
                    });
                }
                setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
                setShowNoti(true)
                setLoading(false);
            });
    }, []);

    const getGroupCategory = useCallback(() => {
        axiosClient.get(GROUP_CATEGORY_API.LIST)
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setGroupCategoryList(response.data.groupCategories);
                }
            }).catch((response) => {
                setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
                setShowNoti(true)
            });
    }, [])

    useEffect(() => {
        getGroupCategory();
    }, [])

    useEffect(() => {
        setValue('id', category ? category.id : '')
        setValue('category_code', category ? category.category_code : '')
        setValue('name', category ? category.name : '')
        setValue('status', category ? category.status : -1)
        setValue('group_category_id', category ? category.group_category_id : '')
        setValue('description', category ? category.description : '')
    }, [category]);


    return <CategoryUpdate
        redirectBack={redirectBack}
        handleUpdate={handleUpdate}
        toggleDirection={toggleDirection}
        setToggleDirection={setToggleDirection}
        handleSubmit={handleSubmit}
        control={control}
        reset={reset}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        loading={loading}
        showNoti={showNoti}
        status={status}
        setShowNoti={setShowNoti}
        groupCategoryList={groupCategoryList}
    />
};

export default CategoryUpdateContainer;