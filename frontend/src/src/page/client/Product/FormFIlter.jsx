import { Button, Divider } from "@mui/material";
import React, { useMemo } from "react";
import Option from "./Option";
import OptionAttribute from "./OptionAttribute";
import OptionGroupCategory from "./OptionGroupCategory";
import OptionPrice from "./OptionPrice";
import OptionRate from "./OptionRate";

const FormFIlter = ({
    formFilter,
    setSearchFiled,
    searchField,
    reset,
    setValue,
    getValues,
    control,
    getProductList,
    handleSubmit,
    isCompleteSetting,
    setComplateSetting
}) => {
    const ADVANCE_SEARCH = useMemo(() => {
        return (
            formFilter &&
            Object.keys(formFilter).map((option, index) => {
                if (option == "groupCategory") {
                    return (
                        <div key={index}>
                            <OptionGroupCategory
                                option={formFilter[option]}
                                setSearchFiled={setSearchFiled}
                                name="group_category_id"
                                searchField={searchField}
                                reset={reset}
                                setValue={setValue}
                                getValues={getValues}
                                getProductList={getProductList}
                                control={control}
                                handleSubmit={handleSubmit}
                                isCompleteSetting={isCompleteSetting}
                                setComplateSetting={setComplateSetting}
                            />
                            <Divider
                                style={{
                                    borderColor: "rgb(246, 249, 252)",
                                    borderBottomWidth: "medium",
                                    opacity: 1,
                                }}
                            />
                        </div>
                    );
                } else if (option == "category") {
                    return (
                        <div key={index}>
                            <Option
                                option={formFilter[option]}
                                label="Brand"
                                setSearchFiled={setSearchFiled}
                                name="category_id"
                                searchField={searchField}
                                reset={reset}
                                setValue={setValue}
                                getValues={getValues}
                                getProductList={getProductList}
                                control={control}
                                handleSubmit={handleSubmit}
                                isCompleteSetting={isCompleteSetting}
                                setComplateSetting={setComplateSetting}
                            />
                            <Divider
                                style={{
                                    borderColor: "rgb(246, 249, 252)",
                                    borderBottomWidth: "medium",
                                    opacity: 1,
                                }}
                            />
                        </div>
                    );
                } else if (option == "attribute") {
                    return (
                        <OptionAttribute
                            option={option}
                            setSearchFiled={setSearchFiled}
                            name="attribute"
                            searchField={searchField}
                            formFilter={formFilter}
                            key={index}
                            reset={reset}
                            setValue={setValue}
                            getValues={getValues}
                            getProductList={getProductList}
                            control={control}
                            handleSubmit={handleSubmit}
                            isCompleteSetting={isCompleteSetting}
                            setComplateSetting={setComplateSetting}
                        />
                    );
                } else if (option == "price") {
                    return (
                        <div key={index}>
                            {
                                <OptionPrice
                                    setSearchFiled={setSearchFiled}
                                    name="price"
                                    searchField={searchField}
                                    reset={reset}
                                    setValue={setValue}
                                    getValues={getValues}
                                    getProductList={getProductList}
                                    control={control}
                                    handleSubmit={handleSubmit}
                                    isCompleteSetting={isCompleteSetting}
                                    setComplateSetting={setComplateSetting}
                                />
                            }
                        </div>
                    );
                } else if (option == "rate") {
                    return (
                        <div key={index}>
                            <OptionRate
                                setSearchFiled={setSearchFiled}
                                name="rate"
                                searchField={searchField}
                                reset={reset}
                                setValue={setValue}
                                getValues={getValues}
                                getProductList={getProductList}
                                control={control}
                                handleSubmit={handleSubmit}
                                isCompleteSetting={isCompleteSetting}
                                setComplateSetting={setComplateSetting}
                            />
                            <Divider
                                style={{
                                    borderColor: "rgb(246, 249, 252)",
                                    borderBottomWidth: "medium",
                                    opacity: 1,
                                }}
                            />
                        </div>
                    );
                }
            })
        );
    }, [formFilter]);

    return <div className="addvance__search">{ADVANCE_SEARCH}</div>;
};

export default FormFIlter;
