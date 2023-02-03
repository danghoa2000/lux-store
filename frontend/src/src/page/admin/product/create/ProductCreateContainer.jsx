import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES_API, GROUP_CATEGORY_API, MANUFACTURER_API, PRODUCT_API } from '../../../../../constants/api';
import { axiosClient } from '../../../../../hooks/useHttp';
import ProductCreate from './ProductCreate';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { CODE, DATE_TIME, SALE_TYPE, STATUS } from '../../../../../constants/constants';
import { format, parseISO } from 'date-fns';
import '../check_editor.css'
import _ from 'lodash';

const ProductCreateContainer = () => {
    const navigate = useNavigate();
    const [toggleDirection, setToggleDirection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [t] = useTranslation();
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [groupCategorytList, setGroupCategoryList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [manufacturerList, setManufacturerList] = useState([]);
    const [groupCategoryId, setGroupCategoryId] = useState(-1);

    const avatarRef = useRef();
    const imageRef = useRef();
    const productPropertyRef = useRef();
    const categoryGroupRef = useRef();

    const redirectBack = () => navigate(-1);

    const validationSchema = Yup.object().shape({
        product_code: Yup.string().
            required(t('validate.required', { name: 'Product code' })),
        name: Yup.string().
            required(t('validate.required', { name: 'Product name' })),
        group_category_id: Yup.string()
            .required(t('validate.required', { name: 'Group category' }))
            .test("isSelect", t('validate.required', { name: 'Group category' }), value => value != "-1"),
        category_id: Yup.string()
            .required(t('validate.required', { name: 'Category' }))
            .test("isSelect", t('validate.required', { name: 'Category' }), value => value != "-1"),
        manufacturer_id: Yup.string()
            .required(t('validate.required', { name: 'Manufacturer' }))
            .test("isSelect", t('validate.required', { name: 'Manufacturer' }), value => value != "-1"),
        price_saled: Yup.string()
            .when(['sale_type', 'expried'], {
                is: (sale_type, expried) => {
                    if ((sale_type && sale_type != -1) || expried) {
                        return true
                    }
                },
                then: () => Yup.string()
                    .required(t('validate.required', { name: 'Price saled' }))
                    .test("", "Invalid value", (value, testContext) => {
                        if (testContext.parent.sale_type == SALE_TYPE.PRICE) {
                            return value
                        }
                        else if (testContext.parent.sale_type == SALE_TYPE.PERSEN) {
                            return 0 <= value <= 100
                        }
                    })
            }),
        sale_type: Yup.string().when(['expried', 'price_saled'], {
            is: (expried, price_saled) => {
                if (expried || price_saled) {
                    return true
                }
            },
            then: () => Yup.string().required(t('validate.required', { name: 'Sale type' }))
                .test("isSelect", t('validate.required', { name: 'Sale type' }), value => value != "-1"),
        }),
        expried: Yup.string().when(['sale_type', 'price_saled'], {
            is: (sale_type, price_saled) => {
                if ((sale_type && sale_type != -1) || price_saled) {
                    return true
                }
            },
            then: () => Yup.string().required(t('validate.required', { name: 'Expried sale' }))
            .test("", "Invalid value", value => {
                console.log(value, format(new Date(), 'yyyy-MM-dd'));
                return value > format(new Date(), 'yyyy-MM-dd');
            })
        }),
    }, [['sale_type', 'expried'], ['expried', 'price_saled'], ['sale_type', 'price_saled']]);

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        setError,
        clearErrors,
        formState: { errors }
    }
        = useForm({
            shouldUnregister: false,
            defaultValues: {
                avatar: [],
                file: [],
                product_code: '',
                name: '',
                status: STATUS.ACTIVE,
                group_category_id: groupCategoryId,
                category_id: -1,
                manufacturer_id: -1,
                description: '',
                price_saled: '',
                sale_type: -1,
                expried: ''
            },
            resolver: yupResolver(validationSchema),
        });

    const handleCreate = useCallback((value) => {
        setLoading(true);
        axiosClient.post(PRODUCT_API.CREATE, {
            ...value
        })
            .then((response) => {
                setShowNoti(true);
                setLoading(false);
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({ type: 'success', message: response.data.message });
                    setTimeout(() => {
                        navigate(-1);
                    }, 1500);

                }
            }).catch(({ response }) => {
                setShowNoti(true);
                setLoading(false);
                if (response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    Object.keys(response.data.errors).forEach(element => {
                        setError(element, { type: 'custom', message: Object.values(response.data.errors[element]) })
                    });
                }
                setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            });
    });

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

    const getCategoryList = useCallback(() => {
        axiosClient.get(CATEGORIES_API.LIST).then((response) => {
            if (response.data.code === CODE.HTTP_OK) {
                setCategoryList(response.data.categories);
            }
        }).catch((response) => {
            setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            setShowNoti(true)
        });
    }, []);

    const getManufacturerList = useCallback(() => {
        axiosClient.get(MANUFACTURER_API.LIST).then((response) => {
            if (response.data.code === CODE.HTTP_OK) {
                setManufacturerList(response.data.manufacturers);
            }
        }).catch((response) => {
            setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            setShowNoti(true)
        });
    }, []);

    useEffect(() => {
        getGroupCategory();
        getCategoryList();
        getManufacturerList();
    }, [])

    // useEffect(() => {
    //     setValue('group_category_id', groupCategoryId)
    // }, [groupCategoryId])

    return <ProductCreate
        redirectBack={redirectBack}
        handleCreate={handleCreate}
        toggleDirection={toggleDirection}
        setToggleDirection={setToggleDirection}
        handleSubmit={handleSubmit}
        control={control}
        reset={reset}
        setValue={setValue}
        getValues={getValues}
        setError={setError}
        clearErrors={clearErrors}
        errors={errors}
        loading={loading}
        showNoti={showNoti}
        status={status}
        setStatus={setStatus}
        setShowNoti={setShowNoti}
        groupCategorytList={groupCategorytList}
        categoryList={categoryList}
        manufacturerList={manufacturerList}
        avatarRef={avatarRef}
        imageRef={imageRef}
        categoryGroupRef={categoryGroupRef}
        productPropertyRef={productPropertyRef}
        getGroupCategory={getGroupCategory}
        groupCategoryId={groupCategoryId}
        setGroupCategoryId={setGroupCategoryId}
    />
};

export default ProductCreateContainer;