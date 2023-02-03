import React, { useState } from "react";
import SliderProduct from "./SliderProduct";
import "./detail.scss";
import "../../../../components/client/MainPage/Home.css";
import Sdata from "../../../../components/client/MainPage/Sdata";
import { BASE_URL } from "../../../../constants/constants";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    OutlinedInput,
    Pagination,
    Rating,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import TabPanel from "../../../../components/partial/tabs/TabPanel";
import { useMemo } from "react";
import ShowSnackbars from "../../../../components/partial/ShowSnackbars";
import { formatPrice } from "../../../../utils/helper";
import { Add, Check, Remove, Star } from "@mui/icons-material";
import { format, parseISO } from "date-fns";

const Detail = ({
    qty,
    setQty,
    product,
    handleChange,
    tab,
    handleSubmit,
    FORM,
    stock,
    SLIDE,
    customPaging,
    SALLED,
    currentOption,
    page,
    setPage,
    totalRecord,
    rowsPerPage,
    totalRate,
}) => {
    return (
        <section className="detail py-5">
            <div className="container">
                <div className="detail__product">
                    <div
                        className="detail__product__slide"
                        style={{ width: "50%" }}
                    >
                        <SliderProduct
                            slideClass={"homeSlide"}
                            dots={true}
                            slidesToShow={1}
                            slidesToScroll={1}
                            autoplay={true}
                            data={SLIDE}
                            customPaging={customPaging}
                            dotsClass={"custom-dot m-auto"}
                        />
                    </div>
                    <div
                        className="detail__product__info"
                        style={{ width: "50%" }}
                    >
                        <h3 className="detail__product__info-name">
                            {product?.name}
                        </h3>
                        <div style={{ display: "flex" }}>
                            <div className="detail__product__info-rate">
                                <span className="text-underline total__rate">
                                    {parseFloat(totalRate || 0).toFixed(1)}
                                </span>
                                <Rating
                                    name="simple-controlled"
                                    value={totalRate || 0}
                                    readOnly
                                />
                            </div>
                            <div className="detail__product__info-review">
                                <span className="text-underline">
                                    {product?.reviews.length}
                                </span>
                                <span>Reviews</span>
                            </div>
                            <div className="detail__product__info-selled">
                                <span className="">{SALLED}</span>
                                <span>Selled</span>
                            </div>
                        </div>
                        <div
                            className="margin-5"
                            style={{
                                display: "flex",
                                alignItems: "baseline",
                                padding: "15px 20px",
                                background: "#fafafa",
                            }}
                        >
                            {Object.keys(currentOption).length == 0 ? (
                                product?.sale_price ? (
                                    product?.max_price ===
                                    product?.min_price ? (
                                        <div>
                                            <span className="old-price detail__product__info-price font-bold">
                                                {formatPrice(
                                                    product?.max_price
                                                )}
                                            </span>
                                            <span
                                                className="new-price detail__product__info-price font-bold"
                                                style={{ marginLeft: 5 }}
                                            >
                                                {formatPrice(
                                                    product?.max_price -
                                                        product?.sale_price
                                                )}
                                            </span>
                                            <span
                                                className="saled_price detail__product__info-price font-bold"
                                                style={{ marginLeft: 5 }}
                                            >{`${product?.sale_persen}% off`}</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <span className="old-price detail__product__info-price font-bold">
                                                {formatPrice(
                                                    product?.min_price
                                                )}{" "}
                                                -{" "}
                                                {formatPrice(
                                                    product?.max_price
                                                )}
                                            </span>
                                            <span
                                                className="new-price detail__product__info-price font-bold"
                                                style={{ marginLeft: 5 }}
                                            >
                                                {formatPrice(
                                                    product?.min_price -
                                                        (product?.sale_price || 0)
                                                )}{" "}
                                                <span
                                                    style={{ margin: "0 5px" }}
                                                >
                                                    -
                                                </span>
                                                {formatPrice(
                                                    product?.max_price -
                                                        (product?.sale_price || 0)
                                                )}
                                            </span>
                                            <span
                                                className="saled_price detail__product__info-price font-bold"
                                                style={{ marginLeft: 5 }}
                                            >{`${product?.sale_persen}% off`}</span>
                                        </div>
                                    )
                                ) : product?.max_price ===
                                  product?.min_price ? (
                                    <span className="new-price detail__product__info-price font-bold">
                                        {formatPrice(product?.max_price)}
                                    </span>
                                ) : (
                                    <div>
                                        <span className="new-price detail__product__info-price font-bold">
                                            {formatPrice(product?.min_price)}
                                        </span>
                                        <span style={{ margin: "0 10px" }}>
                                            -
                                        </span>
                                        <span className="new-price detail__product__info-price font-bold">
                                            {formatPrice(product?.max_price)}
                                        </span>
                                    </div>
                                )
                            ) : currentOption?.sale_price ? (
                                <div>
                                    <span className="old-price detail__product__info-price font-bold">
                                        {formatPrice(currentOption?.price)}
                                    </span>
                                    <span
                                        className="new-price detail__product__info-price font-bold"
                                        style={{ marginLeft: 5 }}
                                    >
                                        {formatPrice(
                                            currentOption?.price -
                                                currentOption?.sale_price
                                        )}
                                    </span>
                                    <span
                                        className="saled_price detail__product__info-price font-bold"
                                        style={{ marginLeft: 5 }}
                                    >{`${currentOption?.sale_persen}% off`}</span>
                                </div>
                            ) : (
                                <span className="new-price detail__product__info-price font-bold">
                                    {formatPrice(currentOption?.price)}
                                </span>
                            )}
                        </div>
                        <div className="detail__product__info-brand margin-5">
                            <span className="detail__product__info-title">
                                Brand
                            </span>
                            <span className="font-bold">
                                {product?.category.name || "No brand"}
                            </span>
                        </div>
                        <div className="detail__product__info-status margin-5">
                            <span className="detail__product__info-title">
                                Stock Available
                            </span>
                            <span className="font-bold">{stock}</span>
                        </div>
                        <div className="product__option">{FORM}</div>
                        <hr
                            style={{
                                color: "#2b2b2b",
                                width: "100%",
                                height: "2px",
                            }}
                        />
                        <div className="d-flex align-items-center mb-2">
                            <div className="cart__product__btn ">
                                <Button
                                    className="btn__remove"
                                    onClick={() => {
                                        if (qty == 1) {
                                            setQty(1);
                                        } else {
                                            setQty((pre) => pre - 1);
                                        }
                                    }}
                                >
                                    <Remove />
                                </Button>
                                <FormControl>
                                    <OutlinedInput value={qty} />
                                </FormControl>
                                <Button
                                    className="btn__add"
                                    onClick={() => {
                                        if (qty < stock) {
                                            setQty((pre) => pre + 1);
                                        }
                                    }}
                                >
                                    <Add />
                                </Button>
                            </div>
                            <Button
                                className="btn-add-product ml-2"
                                onClick={() => handleSubmit()}
                            >
                                Add To Cart
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="product__description">
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={tab}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            <Tab
                                className="tab__header"
                                label={"Description"}
                                index={0}
                            />
                            <Tab
                                className="tab__header"
                                label={`Review (${totalRecord})`}
                                index={1}
                            />
                        </Tabs>
                    </Box>
                    <TabPanel value={tab} index={0}>
                        <Typography variant="h6" component="div">
                            <span style={{ fontWeight: "bold" }}>
                                Specification:
                            </span>
                            <List
                                sx={{ width: "100%" }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                <ListItemText primary={product?.description} />
                            </List>
                        </Typography>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <div className="rating__overview">
                            <Typography
                                variant="h5"
                                className="rating__overview__rate"
                            >
                                {parseFloat(totalRate || 0).toFixed(1)}
                                /5.0
                            </Typography>
                            <Rating
                                name="text-feedback"
                                value={totalRate || 0}
                                readOnly
                                precision={0.5}
                                emptyIcon={
                                    <Star
                                        style={{ opacity: 0.55 }}
                                        fontSize="inherit"
                                    />
                                }
                            />
                        </div>
                        <List sx={{ width: "100%" }}>
                            {product?.reviews.length > 0
                                ? product?.reviews.map((review, index) => {
                                      return (
                                          <div key={index}>
                                              <ListItem>
                                                  <ListItemAvatar>
                                                      <Avatar>
                                                          {review?.pivot?.name
                                                              ? review?.pivot?.name.split(
                                                                    ""
                                                                )[0]
                                                              : ""}
                                                      </Avatar>
                                                  </ListItemAvatar>

                                                  <ListItemText
                                                      primary={
                                                          <span
                                                              style={{
                                                                  fontWeight:
                                                                      "bold",
                                                              }}
                                                              className="mx-2"
                                                          >
                                                              {
                                                                  review?.pivot
                                                                      ?.name
                                                              }
                                                          </span>
                                                      }
                                                      secondary={
                                                          <div className="detail__product__info">
                                                              <div className="detail__product__info-rate review">
                                                                  <Rating
                                                                      name="simple-controlled"
                                                                      className="mx-2"
                                                                      value={
                                                                          review
                                                                              ?.pivot
                                                                              ?.rate
                                                                      }
                                                                      readOnly
                                                                  />
                                                                  <span
                                                                      className="font-bold mx-2"
                                                                      style={{
                                                                          fontSize: 14,
                                                                      }}
                                                                  >
                                                                      {review
                                                                          ?.pivot
                                                                          ?.created_at
                                                                          ? format(
                                                                                parseISO(
                                                                                    review
                                                                                        ?.pivot
                                                                                        ?.created_at
                                                                                ),
                                                                                "dd MMM, yyyy hh:mm"
                                                                            )
                                                                          : ""}
                                                                  </span>
                                                              </div>
                                                          </div>
                                                      }
                                                  />
                                              </ListItem>
                                              <ListItemText
                                                  style={{ marginLeft: 16 }}
                                                  primary={
                                                      review?.pivot?.content
                                                  }
                                              ></ListItemText>
                                          </div>
                                      );
                                  })
                                : ""}
                        </List>
                        <div className="d-flex mt-3 justify-content-end w-100">
                            <div className="pagination">
                                <Stack spacing={2}>
                                    <Pagination
                                        count={Math.ceil(
                                            totalRecord / rowsPerPage
                                        )}
                                        page={page}
                                        onChange={(e, value) => setPage(value)}
                                    />
                                </Stack>
                            </div>
                        </div>
                    </TabPanel>
                </div>
            </div>
        </section>
    );
};

export default Detail;
