import { Add, RemoveCircleOutline } from "@mui/icons-material";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone"
import { API_BASE_URL, API_UPPLOAD } from "../../constants/api";
import { axiosClient } from "../../hooks/useHttp";

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    margin: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '35px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    backgroundColor: 'unset',
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const Dropzone = ({
    name,
    multiple,
    accept,
    setValue,
    // setError,
    // clearErrors,
    getValues,
    initValue,
}, ref) => {
    const [files, setFiles] = useState([]);
    const onDrop = useCallback(
        (acceptedFiles, rejectedFiles) => {
            if (rejectedFiles && rejectedFiles.length > 0) {
                setFiles([]);
                // setError(name, {
                //     type: 'manual',
                //     message: rejectedFiles && rejectedFiles[0].errors[0].message,
                // });
            } else {
                // clearErrors(name);
                acceptedFiles.forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = async function (e) {
                        let data = new FormData();
                        data.append("file", file);
                        data.append("uploadType", "product")
                        await axiosClient
                            .post(API_UPPLOAD, data, {
                                headers: {
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Content-Type": "application/x-www-form-urlencoded"
                                }
                            })
                            .then(response => {
                                return setFiles((prevState) => {
                                    if (multiple) {
                                        return [
                                            ...prevState,
                                            { file: response.data.path, preview: e.target.result },
                                        ]
                                    } else {
                                        return [{ file: response.data.path, preview: e.target.result }]
                                    }

                                });
                            })
                            .catch(err => {
                            });
                    };
                    reader.readAsDataURL(file);
                    return file;
                });
            }
        },
        [files, multiple])

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept,
        multiple,
        onDrop
    })

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const removeImgSelected = useCallback((index) => {
        let newFiles = [...files];
        newFiles.splice(index, 1);
        if (newFiles.length <= 0) {
            newFiles = [];
        }
        setFiles(newFiles);
    }, [files]);

    const removeAll = useCallback(() => {
        setFiles([]);
    }, []);

    useImperativeHandle(ref, () => ({
        removeAll: () => {
            removeAll();
        }
    }), [ref])

    useEffect(() => {
        if (initValue) {
            setFiles(initValue);
        }
    }, [initValue])

    useEffect(() => {
        setValue(name, files);
    }, [name, files])

    const thumbs = useMemo(() =>
        files && files.length > 0 && files.map((file, index) => (
            <div style={thumb} key={index}>
                <div className='image__list'>
                    <img
                        src={file?.preview || (API_BASE_URL + file?.file)}
                        style={img}
                        // Revoke data uri after image is loaded
                        onLoad={() => { URL.revokeObjectURL(file?.preview) }}
                    />
                    <div className='remove__image'>
                        <RemoveCircleOutline
                            onClick={() => removeImgSelected(index)}
                        />
                    </div>
                </div>
            </div>
        ))
        , [files, initValue]);

    return (
        <section style={{ ...thumbsContainer }}>
            {thumbs}
            <div style={{ ...style, display: 'inline-block', margin: 8, }}>
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <Add />
                </div>
            </div>
        </section>
    )
}

export default forwardRef(Dropzone);