import { Grid } from '@mui/material';
import React, { useRef } from 'react';
import Dropzone from './Dropzone';

const UploadFile = ({
    name,
    accept,
    multiple,
    control,
    setValue,
    getValues,
    setError,
    clearErrors,
    currentRef,
    initValue
}) => {

    return (
        <Grid item xs={12}>
            <Dropzone
                ref={currentRef}
                accept={accept}
                multiple={multiple}
                name={name}
                setValue={setValue}
                setError={setError}
                clearErrors={clearErrors}
                initValue={initValue}
                getValues={getValues}
            />
        </Grid>
    );
};

export default UploadFile;