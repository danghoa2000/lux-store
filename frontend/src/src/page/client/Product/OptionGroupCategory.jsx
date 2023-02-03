import {
    FormControl,
    FormControlLabel,
    FormLabel,
    List,
    ListItem,
    ListSubheader,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Controller } from "react-hook-form";

const OptionGroupCategory = ({
    setSearchFiled,
    name,
    option,
    reset,
    setValue,
    getValues,
    control,
    handleSubmit,
    getProductList,
    isCompleteSetting,
    setComplateSetting
}) => {
    const [valueGroup, setValueGroupCategory] = useState(
        getValues("group_category_id")
    );

    useEffect(() => {
        setValue("group_category_id", valueGroup);
        setValue('attribute', []);
        setValue('category_id', []);
        setComplateSetting(pre => !pre)
        return () => {
            setValue("group_category_id", "");
        };
    }, [valueGroup]);
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
                    Category
                </ListSubheader>
            }
        >
            {
                <Controller
                    name="group_category_id"
                    control={control}
                    render={({ field }) => (
                        <FormControl variant="standard">
                            <RadioGroup>
                                {option.map((value) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            key={value.id}
                                            control={
                                                <Radio
                                                    value={value.id}
                                                    readOnly
                                                    style={{ display: "none" }}
                                                    onClick={() => {
                                                        if (
                                                            field.value ==
                                                            value.id
                                                        ) {
                                                            field.onChange("");
                                                            setValueGroupCategory(
                                                                ""
                                                            );
                                                        } else {
                                                            field.onChange(
                                                                value.id
                                                            );
                                                            setValueGroupCategory(
                                                                value.id
                                                            );
                                                        }
                                                    }}
                                                />
                                            }
                                            label={value.name}
                                            style={{ marginLeft: 0 }}
                                            className={`${
                                                getValues("group_category_id") == value.id
                                                    ? "active"
                                                    : ""
                                            }`}
                                        />
                                    );
                                })}
                            </RadioGroup>
                        </FormControl>
                    )}
                />
            }
        </List>
    );
};

export default OptionGroupCategory;
