import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UploadFile from '../../../../../components/partial/UploadFile';

const ProductImage = (props) => {
    const {
        control,
        setValue,
        getValues,
        setError,
        clearErrors,
        errors,
        imageRef,
        product,
    } = props;
    const [t] = useTranslation();
    const [initvalue, setInitValue] = useState([]);
    useEffect(() => {
        setInitValue(product?.product_media?.url && JSON.parse(product?.product_media?.url).map(item => ({ file: item })));
    }, [product])
    return (
        <div className="card__admin">
            <Typography variant="h5" className='cart_admin_title' gutterBottom>
                {t('product.list.table.image')}
            </Typography>

            <Grid container sx={{ margin: 0, padding: 1, width: '100%' }} spacing={10}>
                <UploadFile
                    name={"file"}
                    initValue={initvalue}
                    accept={{ 'image/*': [] }}
                    multiple={true}
                    control={control}
                    setValue={setValue}
                    setError={setError}
                    clearErrors={clearErrors}
                    currentRef={imageRef}
                    getValues={getValues}
                />
            </Grid>
        </div>
    );
};

export default ProductImage;