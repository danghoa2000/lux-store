import { Autocomplete, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const ProductAttributeName = (
    {
        attributeName,
        setAttributeName,
        attributeList,
        handleUpdateAttributeName,
        attributeSelectedList,
    },
    ref
) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
    const [inputValue, setInputValue] = React.useState("");
    // useEffect(() => {
    //     let active = true;

    //     if (!loading) {
    //         return undefined;
    //     }

    //     (async () => {
    //         await sleep(1e3); // For demo purposes.

    //         if (active) {
    //             setOptions([...attributeList]);
    //         }
    //     })();

    //     return () => {
    //         active = false;
    //     };
    // }, [loading]);

    // useEffect(() => {
    //     if (!open) {
    //         setOptions([]);
    //     }
    // }, [open]);

    return (
        <div className="d-flex flex-column">
            <Autocomplete
                onChange={(event, value) => {
                    handleUpdateAttributeName(value);
                }}
                sx={{ width: 170 }}
                className="select_dark_mode"
                disablePortal
                name="attribute"
                options={attributeList}
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
                    setInputValue(newInputValue);
                }}
                value={attributeName ? attributeName : null}
                getOptionLabel={(option) => option.name || ""}
                getOptionDisabled={(option) =>
                    attributeSelectedList.includes(option.id)
                }
                renderInput={(params) => (
                    <TextField {...params} label="properties" />
                )}
            />
        </div>
    );
};

export default ProductAttributeName;
