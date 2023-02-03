import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const ProductAttributeValue = ({
    attributeValue,
    setAttributeValue,
    attributeValueOption,
    handleUpdateAttributeValue
}) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
    const [inputValue, setInputValue] = React.useState('')
    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3);
        })();

        return () => {
            active = false;
        };
    }, [loading]);


    return (
        <Autocomplete
            sx={{ width: 170 }}
            name="attributeValue"
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}

            onChange={(event, value) => handleUpdateAttributeValue(value)}
            getOptionLabel={(option) => option.name || ""}
            options={attributeValueOption}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                );
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue)
            }}
            value={attributeValue ? attributeValue : null}
            defaultValue={attributeValue ? attributeValue : null}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="value"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <div>
                                {loading ? <CircularProgress size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </div>
                        ),
                    }}
                />
            )}
        />
    );
};

export default ProductAttributeValue;