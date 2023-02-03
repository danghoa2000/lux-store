import {
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from "@mui/material";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

const Option = ({
    option,
    label,
    setSearchFiled,
    searchField,
    name,
    control,
    setValue,
    getValues,
    getProductList,
    isCompleteSetting,
    setComplateSetting,
}) => {
    const [valueCat, setValueCategory] = useState(getValues("category_id"));
    useEffect(() => {
        setValue("category_id", valueCat);
        setComplateSetting((pre) => !pre);
        // return () => {
        //     console.log(111)
        //     setValue("category_id", []);
        // };
    }, [valueCat]);
    return (
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
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
                    {label}
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
                                Object.values(option).map((value) => (
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
                                                        field.onChange([
                                                            ...field.value,
                                                            value.id,
                                                        ]);
                                                        setValueCategory([
                                                            ...field.value,
                                                            value.id,
                                                        ]);
                                                        return;
                                                    }
                                                    const newSeleted =
                                                        field.value.filter(
                                                            (item) =>
                                                                item !==
                                                                value.id
                                                        );
                                                    field.onChange(newSeleted);
                                                    setValueCategory(
                                                        newSeleted
                                                    );
                                                }}
                                            />
                                        }
                                    />
                                ))
                            }
                        />
                    </FormGroup>
                </FormControl>
            }
        </List>
    );
};

export default Option;
