import {
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Option from "./Option";

const OptionAttribute = ({
    formFilter,
    option,
    setSearchFiled,
    searchField,
    name,
    reset,
    setValue,
    getValues,
    getProductList,
    control,
    handleSubmit,
    isCompleteSetting,
    setComplateSetting,
}) => {
    const [valueAttr, setAttribute] = useState(getValues("attribute"));
    useEffect(() => {
        setValue("attribute", valueAttr);
        setComplateSetting((pre) => !pre);
        // return () => {
        //     setValue("attribute", []);
        // };
    }, [valueAttr, setComplateSetting, setValue]);

    return (
        formFilter[option] &&
        Object.keys(formFilter[option]).map((value, index) => {
            if (
                Object.keys(formFilter[option][value]["option"]).length > 0 ||
                formFilter[option][value]["option"].length > 0
            )
                return (
                    <List
                        sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                        }}
                        key={index}
                        subheader={
                            <ListSubheader
                                className="search-title"
                                component="div"
                                style={{
                                    fontWeight: "bold",
                                    padding: "10px 0",
                                    lineHeight: "22px",
                                    fontSize: "18px",
                                }}
                            >
                                {formFilter[option][value]["name"]}
                            </ListSubheader>
                        }
                    >
                        {
                            <FormControl component="fieldset">
                                <FormGroup>
                                    <Controller
                                        name={name}
                                        control={control}
                                        render={({ field }) =>
                                            Object.values(
                                                formFilter[option][value][
                                                    "option"
                                                ]
                                            ).map((value, index) => {
                                                return (
                                                    <FormControlLabel
                                                        {...field}
                                                        key={value.id}
                                                        label={value.name}
                                                        control={
                                                            <Checkbox
                                                                className="ligth__mode"
                                                                onChange={() => {
                                                                    if (
                                                                        !field.value.includes(
                                                                            value.id
                                                                        )
                                                                    ) {
                                                                        field.onChange(
                                                                            [
                                                                                ...field.value,
                                                                                value.id,
                                                                            ]
                                                                        );
                                                                        setAttribute(
                                                                            [
                                                                                ...field.value,
                                                                                value.id,
                                                                            ]
                                                                        );
                                                                        return;
                                                                    }
                                                                    const newSeleted =
                                                                        field.value.filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item !==
                                                                                value.id
                                                                        );
                                                                    field.onChange(
                                                                        newSeleted
                                                                    );
                                                                    setAttribute(
                                                                        newSeleted
                                                                    );
                                                                }}
                                                                // checked={field['value'].includes(value)}
                                                            />
                                                        }
                                                    />
                                                );
                                            })
                                        }
                                    />
                                </FormGroup>
                            </FormControl>
                        }
                    </List>
                );
        })
    );
};
export default OptionAttribute;
