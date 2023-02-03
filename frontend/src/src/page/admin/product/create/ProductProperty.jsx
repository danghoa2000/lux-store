import {
    Add,
    AddCircle,
    AddCircleSharp,
    RemoveCircle,
    Save,
    Search,
} from "@mui/icons-material";
import {
    Autocomplete,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import BasicModal from "../../../../../components/partial/BasicModal";
import CreateAttributeModal from "../../../../../components/partial/Modal/CreateAttributeModal";
import CreateAttributeValueModal from "../../../../../components/partial/Modal/CreateAttributeValueModal";
import ProductPropertyItem from "../../../../../components/partial/product/ProductPropertyItem";
import { GROUP_CATEGORY_API, PRODUCT_API } from "../../../../../constants/api";
import { axiosClient } from "../../../../../hooks/useHttp";
import { formatPrice } from "../../../../../utils/helper";
import { result } from "lodash";

const ProductProperty = (props, ref) => {
    const {
        control,
        setValue,
        name,
        getValues,
        setError,
        clearErrors,
        errors,
        setStatus,
        setShowNoti,
        getGroupCategory,
        groupCategorytList,
        product,
    } = props;
    const [t] = useTranslation();
    const [properties, setProperties] = useState([]);
    const [propertiesList, setPropertiesList] = useState([]);
    const [attributeList, setAttributeList] = useState([]);
    const [attributeValueList, setAttributeValueList] = useState([]);
    const [attributeSelectedList, setAttributeSelectedList] = useState([]);
    const [qty, setQty] = useState("");
    const [price, setPrice] = useState("");
    const [idEdit, setIdEdit] = useState(null);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(1);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [currentRef, setCurrentRef] = useState();
    const getAttributeList = useCallback(() => {
        axiosClient
            .get(GROUP_CATEGORY_API.ATTRIBUTE, {
                params: {
                    group_category_id: getValues("group_category_id"),
                },
            })
            .then((result) => {
                setAttributeList(
                    result.data.groupCategories?.attributes.map(
                        ({ id, name }) => ({ id, name })
                    )
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const removeProperty = useCallback(
        (index) => {
            const { [index]: _, ...newProperties } = properties;
            setProperties(
                Object.keys(newProperties).map((key) => newProperties[key])
            );
            setAttributeSelectedList(
                attributeSelectedList.filter(
                    (item) => item !== properties[index].attributeName
                )
            );
        },
        [attributeSelectedList, properties]
    );

    const updateAttributeName = useCallback(
        (index, value) => {
            let newProperties = [...properties];
            newProperties[index] = {
                ...newProperties[index],
                attributeName: value?.id,
                attributeNameDisplay: value?.name,
            };
            setProperties(newProperties);
            let newAttributeSelectedList = [...attributeSelectedList];
            newAttributeSelectedList = newAttributeSelectedList.filter(
                (item) => item !== properties[index].attributeName
            );
            if (value?.id && !newAttributeSelectedList.includes(value?.id)) {
                newAttributeSelectedList.push(value.id);
            }
            setAttributeSelectedList(newAttributeSelectedList);
        },
        [attributeSelectedList, properties]
    );

    const updateAttributeValue = useCallback(
        (index, value) => {
            let newProperties = [...properties];
            newProperties[index] = {
                ...newProperties[index],
                attributeValue: value?.id,
                attributeValueDisplay: value?.name,
            };
            setProperties(newProperties);
        },
        [properties]
    );

    const saveProperty = useCallback(() => {
        const error = validateProperty();
        if (error) {
            setStatus({
                type: "error",
                message: "Please enter full information!",
            });
            setShowNoti(true);
            return;
        }
        if (idEdit === null) {
            let checkExist = [...propertiesList];
            let indexExist = null;
            properties.forEach((itemProperty) => {
                let arr = Object.values(checkExist).filter(
                    (itemClone) => {
                        const { prict, qty, ...res } = itemClone;
                        let result = Object.values(res).filter(
                            (itemRes) =>
                                itemRes.attributeName ==
                                    itemProperty.attributeName &&
                                itemRes.attributeValue ==
                                    itemProperty.attributeValue
                        );
                        if (result.length > 0) {
                            return true;
                        }
                        return false;
                    }
                );
                checkExist = [...arr];
            });

            if (checkExist.length == 1) {
                Object.values(propertiesList).map((item, index) => {
                    if (JSON.stringify(item) == JSON.stringify(checkExist[0])) {
                        indexExist = index;
                        return item;
                    }
                });
            }

            if (indexExist !== null) {
                let newPropertiesList = [...propertiesList];
                newPropertiesList[indexExist]["qty"] = Number(newPropertiesList[indexExist]["qty"]) + Number(qty);
                setPropertiesList(newPropertiesList);
            } else {
                setPropertiesList((pre) => [
                    ...pre,
                    { ...properties, qty: qty, price: price },
                ]);
            }
        } else {
            let newPropertiesList = [...propertiesList];
            newPropertiesList[idEdit] = { ...properties };
            newPropertiesList[idEdit]["qty"] = qty;
            newPropertiesList[idEdit]["price"] = price;
            setPropertiesList(newPropertiesList);
        }
        setPrice("");
        setProperties([]);
        setIdEdit(null);
        setAttributeSelectedList([]);
    }, [properties, propertiesList, idEdit, qty, price]);

    const validateProperty = useCallback(() => {
        let error = false;
        Object.entries(properties).forEach(([key, item]) => {
            if (
                properties[key].attributeName &&
                properties[key].attributeValue
            ) {
            } else {
                error = true;
            }
        });
        return error;
    }, [properties]);

    const removeAll = useCallback(() => {
        setProperties([]);
        setPropertiesList([]);
        setValue(name, []);
        setAttributeSelectedList([]);
    }, [name]);

    useImperativeHandle(
        ref,
        () => ({
            removeAll: () => {
                removeAll();
            },
        }),
        [name, ref]
    );

    const renderProperty = useCallback(
        (key, item) => {
            return (
                <div key={key}>
                    <ProductPropertyItem
                        setCurrentRef={setCurrentRef}
                        index={key}
                        item={item}
                        removeProperty={removeProperty}
                        setProperties={setProperties}
                        properties={properties}
                        updateAttributeName={updateAttributeName}
                        updateAttributeValue={updateAttributeValue}
                        attributeList={attributeList}
                        attributeValueList={attributeValueList}
                        attributeSelectedList={attributeSelectedList}
                    />
                </div>
            );
        },
        [
            properties,
            propertiesList,
            attributeList,
            attributeValueList,
            attributeSelectedList,
        ]
    );

    useEffect(() => {
        if (product) {
            const newData = product?.product_detail?.map((item) => {
                const newItem = item.property_value.map((element) => ({
                    attributeName: element.attribute.id,
                    attributeNameDisplay: element.attribute.name,
                    attributeValue: element.id,
                    attributeValueDisplay: element.attribute_value_name,
                }));
                return {
                    ...newItem,
                    qty: item.qty,
                    price: item.price,
                };
            });
            setPropertiesList(newData);
        }
    }, [product]);

    useEffect(() => {
        if (Object.keys(properties).length === 0) {
            setIdEdit(null);
            setQty(0);
        } else {
            let data = [];
            Object.keys(properties).map((item) => {
                if (
                    properties[item]?.attributeName &&
                    !data.includes(properties[item]?.attributeName)
                ) {
                    data.push(properties[item]?.attributeName);
                }
                return item;
            });
            setAttributeSelectedList(data);
        }
    }, [properties]);

    useEffect(() => {
        setValue(name, propertiesList);
    }, [name, propertiesList]);

    useEffect(() => {
        if (
            getValues("group_category_id") &&
            getValues("group_category_id") != -1
        ) {
            getAttributeList();
        } else {
            setAttributeList([]);
        }
    }, [getValues("group_category_id")]);

    return (
        <div className="card__admin">
            <Typography variant="h5" className="cart_admin_label" gutterBottom>
                Properties
            </Typography>

            <Grid
                container
                sx={{ margin: 0, width: "100%", padding: 0 }}
                spacing={10}
            >
                <Grid item xs={10}>
                    <Grid>
                        {properties &&
                            Object.keys(properties).length > 0 &&
                            Object.entries(properties).map(([key, item]) => {
                                return renderProperty(key, item);
                            })}
                    </Grid>
                    {properties && Object.keys(properties).length > 0 && (
                        <div>
                            <Grid item xs={5} style={{ margin: "10px 0" }}>
                                <TextField
                                    label="Qty"
                                    variant="standard"
                                    type="number"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={5} style={{ margin: "10px 0" }}>
                                <TextField
                                    label="Price"
                                    variant="standard"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Grid>
                        </div>
                    )}
                    <Grid>
                        <IconButton
                            aria-label="delete"
                            style={{
                                background: "rgba(0, 0, 0, 0.04)",
                                borderRadius: "50%",
                                width: 80,
                                height: 80,
                            }}
                            onClick={() => {
                                setProperties((pre) => [
                                    ...pre,
                                    {
                                        attributeName: "",
                                        attributeNameDisplay: "",
                                        attributeValue: "",
                                        attributeValueDisplay: "",
                                    },
                                ]);
                            }}
                        >
                            <Add style={{ color: "#fff" }} />
                        </IconButton>
                    </Grid>

                    <Grid>
                        <Typography
                            variant="h6"
                            className="cart_admin_label"
                            gutterBottom
                        >
                            Properties list
                        </Typography>
                        {propertiesList &&
                            propertiesList.length > 0 &&
                            propertiesList.map((item, index) => {
                                const { qty, price, ...newItem } = item;
                                return (
                                    <div key={index}>
                                        {
                                            <p>
                                                {Object.values(newItem).map(
                                                    (item, index) => {
                                                        return (
                                                            item?.attributeNameDisplay +
                                                            ": " +
                                                            item?.attributeValueDisplay +
                                                            ", "
                                                        );
                                                    }
                                                )}
                                                {"Price: " +
                                                    formatPrice(price) +
                                                    ", Qty: " +
                                                    qty}
                                                <span
                                                    className="edit__property"
                                                    onClick={() => {
                                                        setProperties(
                                                            Object.keys(
                                                                newItem
                                                            ).map(
                                                                (key) =>
                                                                    newItem[key]
                                                            )
                                                        );
                                                        setIdEdit(index);
                                                        setQty(qty);
                                                        setPrice(price);
                                                    }}
                                                >
                                                    Edit
                                                </span>
                                            </p>
                                        }
                                    </div>
                                );
                            })}
                    </Grid>
                </Grid>

                <Grid item xs={2}>
                    {properties && Object.keys(properties).length > 0 && (
                        <div>
                            <Button
                                variant="contained"
                                className="m-1"
                                style={{
                                    textTransform: "none",
                                    width: 180,
                                    maxWidth: "100%",
                                }}
                                onClick={() => {
                                    setOpen(true);
                                    setType(1);
                                }}
                            >
                                Create new attribute
                            </Button>

                            <Button
                                variant="contained"
                                className="m-1"
                                style={{
                                    textTransform: "none",
                                    width: 180,
                                    maxWidth: "100%",
                                }}
                                onClick={() => {
                                    setOpen(true);
                                    setType(2);
                                }}
                            >
                                Create new value
                            </Button>

                            <Button
                                variant="contained"
                                className="m-1"
                                style={{
                                    textTransform: "none",
                                    width: 180,
                                    background: "rgb(73, 170, 25)",
                                    maxWidth: "100%",
                                }}
                                onClick={() => saveProperty(idEdit)}
                            >
                                <Save style={{ marginRight: 2 }} />
                                Save
                            </Button>
                        </div>
                    )}
                </Grid>
            </Grid>
            {open && (
                <BasicModal open={open} handleClose={handleClose}>
                    {type === 1 && (
                        <CreateAttributeModal
                            getAttributeList={getAttributeList}
                            groupCategorytList={groupCategorytList}
                            setShowNoti={setShowNoti}
                            setStatus={setStatus}
                        />
                    )}
                    {type === 2 && (
                        <CreateAttributeValueModal
                            currentRef={currentRef}
                            groupCategorytList={groupCategorytList}
                            setShowNoti={setShowNoti}
                            setStatus={setStatus}
                        />
                    )}
                </BasicModal>
            )}
        </div>
    );
};

export default forwardRef(ProductProperty);
