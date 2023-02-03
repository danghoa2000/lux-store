import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES_API, GROUP_CATEGORY_API } from '../../../../../constants/api';
import { axiosClient } from '../../../../../hooks/useHttp';
import CategoryCreate from './CategoryCreate';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { CODE, STATUS } from '../../../../../constants/constants';

const CategoryCreateContainer = () => {
    const navigate = useNavigate();
    const [toggleDirection, setToggleDirection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [t] = useTranslation();
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [groupCategoryList, setGroupCategoryList] = useState([]);
    const redirectBack = () => navigate(-1);

    const validationSchema = Yup.object().shape({
        category_code: Yup.string().
            required(t('validate.required', { name: 'Category code' })),
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
                category_code: '',
                name: '',
                status: STATUS.ACTIVE,
                group_category_id: -1,
                description: '',
            },
            resolver: yupResolver(validationSchema),
        });

    const handleCreate = useCallback((value) => {
        setLoading(true);
        axiosClient.post(CATEGORIES_API.CREATE, {
            ...value
        })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({ type: 'success', message: response.data.message });
                    reset();
                }
                setShowNoti(true);
                setLoading(false);
            }).catch(({ response }) => {
                if (response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    Object.keys(response.data.errors).forEach(element => {
                        setError(element, { type: 'custom', message: Object.values(response.data.errors[element]) })
                    });
                }
                setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
                setShowNoti(true);
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

    return <CategoryCreate
        redirectBack={redirectBack}
        handleCreate={handleCreate}
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

export default CategoryCreateContainer;