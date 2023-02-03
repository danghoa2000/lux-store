import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import Filter from './Filter';

const LeftColumn = ({
    productSelected,
    productListClone,
    arrowLeft,
    title,
    addToSelectedList,
    removeFromSelectedList
}) => {
    const [listItem, setListItem] = useState(productListClone);
    useEffect(() => {
        const newData = productListClone.map(item => {
            if (productSelected.find(({ id }) => id === item.id)) {
                return { ...item, selected: true };
            }
            return item;
        });
        setListItem(newData)
    }, [productSelected, productListClone])

    return (
        <Filter
            item={listItem}
            arrowLeft={arrowLeft}
            title={title}
            addToSelectedList={addToSelectedList}
            removeFromSelectedList={removeFromSelectedList}

        />
    );
};

export default LeftColumn;