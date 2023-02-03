import { Autocomplete, Button, TextField } from '@mui/material';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';

import ProductAttributeName from './ProductAttributeName';
import ProductAttributeValue from './ProductAttributeValue';
import { AddCircleSharp, RemoveCircle } from '@mui/icons-material';
import { axiosClient } from '../../../hooks/useHttp';
import { ATTRIBUTE_API, PRODUCT_API } from '../../../constants/api';
import { useRef } from 'react';

const ProductPropertyItem = ({
    index,
    item,
    removeProperty,
    setProperties,
    properties,
    updateAttributeName,
    updateAttributeValue,
    attributeList,
    attributeValueList,
    attributeSelectedList,
}) => {
    const ref= useRef();
    const [attributeName, setAttributeName] = useState(() => {
        return attributeList.find(data => data.id === item.attributeName)
    });
    const [attributeValue, setAttributeValue] = useState(() => {
        return { id: item?.attributeValue, name: item?.attributeValueDisplay };
    });
    const [attributeValueOption, setAttributeValueOption] = useState([]);

    const getOptionByAttribute = useCallback(() => {
        axiosClient.post(ATTRIBUTE_API.OPTIONS, { id: attributeName?.id })
            .then((result) => {
                setAttributeValueOption(result.data.attribute?.attribute_value.map(({ id, attribute_value_name }) => ({ id, name: attribute_value_name })))
            }).catch((err) => {
                console.log(err);
            });
    }, [attributeName]);



    const handleUpdateAttributeName = (value) => {
        setAttributeName(value)
        setAttributeValue("")
        updateAttributeName(index, value)
    };

    const handleUpdateAttributeValue = (value) => {
        setAttributeValue(value)
        updateAttributeValue(index, value)
    }

    useEffect(() => {
        if (attributeName) {
            getOptionByAttribute();
        }
    }, [attributeName])
    return (
        <div style={{ padding: 5, display: 'inline-flex' }}>
            <div className='d-flex' style={{ border: '1px solid', padding: '5px', borderRadius: 5 }}>
                <ProductAttributeName
                    attributeName={attributeName}
                    setAttributeName={setAttributeName}
                    attributeList={attributeList}
                    handleUpdateAttributeName={handleUpdateAttributeName}
                    attributeSelectedList={attributeSelectedList}
                />
                <ProductAttributeValue
                    attributeValue={attributeValue}
                    setAttributeValue={setAttributeValue}
                    attributeValueOption={attributeValueOption}
                    handleUpdateAttributeValue={handleUpdateAttributeValue}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', padding: 2, justifyContent: 'space-between' }}>
                <Button variant="contained" style={{ padding: 3, minWidth: 'unset', color: 'red', background: 'white' }}
                    onClick={() => removeProperty(index)}
                ><RemoveCircle /></Button>
                <Button variant="contained" style={{ padding: 3, minWidth: 'unset' }}><AddCircleSharp /></Button>
            </div>
        </div>
    )
};

export default ProductPropertyItem;