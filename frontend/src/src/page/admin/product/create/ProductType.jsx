// import { ClassicEditor } from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
import { FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const ProductType = (props) => {
    const {
        control,
        setValue,
        getValues,
        setError,
        clearErrors,
        errors,
        groupCategorytList,
        categoryList,
        manufacturerList,
        onChangeGroupCategory,
        groupCategoryId,
        setGroupCategoryId,
    } = props;
    const [t] = useTranslation();
    return (
        <div className="card__admin">
            <Grid container sx={{ margin: 0, padding: 1, width: '100%' }} spacing={10}>
                <Grid item xs={6}>
                    <Controller
                        name="group_category_id"
                        control={control}
                        render={({ field }) =>
                            <FormControl variant="standard">
                                <Select
                                    {...field}
                                    label={<div>{t('product.list.table.group_category_id')}<span className='required'></span></div>}
                                    size="small"
                                    value={groupCategoryId}
                                    onChange={e => {
                                        setGroupCategoryId(e.target.value)
                                        setValue(e.target.name, e.target.value)
                                        onChangeGroupCategory()
                                    }}
                                >
                                    <MenuItem key={""} value={-1}>
                                        {"select group category"}
                                    </MenuItem>

                                    {
                                        groupCategorytList.length > 0 && (
                                            groupCategorytList.map(item => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))
                                        )
                                    }
                                </Select>
                            </FormControl>}
                    />
                    {errors.group_category_id && <p className='text-danger'>{errors.group_category_id.message}</p>}
                </Grid>

                <Grid item xs={6}>
                    <Controller
                        name="category_id"
                        control={control}
                        render={({ field }) =>
                            <FormControl variant="standard">
                                <Select
                                    {...field}
                                    label={<div>{t('product.list.table.category_id')}<span className='required'></span></div>}
                                    size="small"
                                >
                                    <MenuItem key={""} value={-1}>
                                        {"select category"}
                                    </MenuItem>

                                    {
                                        categoryList.length > 0 && (
                                            categoryList.map(item => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))
                                        )
                                    }
                                </Select>
                            </FormControl>}
                    />
                    {errors.category_id && <p className='text-danger'>{errors.category_id.message}</p>}
                </Grid>

                <Grid item xs={6}>
                    <Controller
                        name="manufacturer_id"
                        control={control}
                        render={({ field }) =>
                            <FormControl variant="standard">
                                <Select
                                    {...field}
                                    label={<div>{t('product.list.table.manufacturer_id')}<span className='required'></span></div>}
                                    size="small"
                                >
                                    <MenuItem key={""} value={-1}>
                                        {"select manufacturer"}
                                    </MenuItem>

                                    {
                                        manufacturerList.length > 0 && (
                                            manufacturerList.map(item => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))
                                        )
                                    }
                                </Select>
                            </FormControl>}
                    />
                    {errors.manufacturer_id && <p className='text-danger'>{errors.manufacturer_id.message}</p>}
                </Grid>

                <Grid item xs={6}>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) =>
                            <FormControl variant="standard">
                                <TextField
                                    {...field}
                                    label={t('product.list.table.description')}
                                    multiline
                                    maxRows={4}
                                    variant="standard"
                                />
                            </FormControl>}
                    />

                    {errors.description && <p className='text-danger'>{errors.description.message}</p>}
                </Grid>
            </Grid>
            {/* <div className='ck-content'>
                <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div> */}
        </div>
    );
};

export default ProductType;