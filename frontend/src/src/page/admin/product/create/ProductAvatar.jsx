import React, { useEffect, useState } from 'react';
import UploadFile from '../../../../../components/partial/UploadFile';

const ProductAvatar = (props) => {
    const {
        control,
        setValue,
        getValues,
        setError,
        clearErrors,
        errors,
        avatarRef,
        product,
    } = props;
    const [initvalue, setInitValue] = useState([]);
    useEffect(() => {
        setInitValue(product?.image && [{ file: product?.image }]);
    }, [product])
    return (
        <UploadFile
            name={"avatar"}
            initValue={initvalue}
            accept={{ 'image/*': [] }}
            multiple={false}
            control={control}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            currentRef={avatarRef}
            getValues={getValues}
        // name={"avatar"}
        // initValue={product?.product_media?.url && JSON.parse(product?.product_media?.url).map(item => ({ file: item }))}
        // accept={{ 'image/*': [] }}
        // multiple={false}
        // control={control}
        // setValue={setValue}
        // setError={setError}
        // clearErrors={clearErrors}
        // currentRef={avatarRef}
        // getValues={getValues}
        />
    );
};

export default ProductAvatar;