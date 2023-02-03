import { Alert, Box, List, ListItem, ListItemButton, ListItemText, Snackbar, Stack, Tab, Tabs } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { API_BASE_URL } from '../../constants/api';
import { axiosClient } from '../../hooks/useHttp';
import ShowSnackbars from './ShowSnackbars';
import TabPanel from './tabs/TabPanel';

const Direction = (props) => {
    const {
        setValue,
        field,
        control,
        ToggleDirection,
        getValues
    } = props;
    const [value, setValueTab] = useState(0);
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [commune, setCommune] = useState([]);
    const [provinceSelected, setProvinceSelected] = useState({});
    const [districtSelected, setDistrictSelected] = useState({});
    const [communeSelected, setCommuneSelected] = useState({});
    const [error, setError] = useState(false);
    const [message, setMassage] = useState('');
    const [clickedOutside, setClickedOutside] = useState(false);
    const myRef = useRef();

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

    const getProvince = useCallback(() => {
        axiosClient.get(API_BASE_URL + "api/get-province")
            .then(res => setProvince(res.data.provinces))
            .catch(err => {
                setError(true)
                //setMassage(err.data.message)
            })
    })

    const getDistrict = useCallback(() => {
        axiosClient.get(API_BASE_URL + "api/get-district/" + provinceSelected.id)
            .then(res => setDistrict(res.data.districts))
            .catch(err => {
                setError(true)
                //setMassage(err.data.message)
            })
    })

    const getCommune = useCallback(() => {
        axiosClient.get(API_BASE_URL + "api/get-commune/" + districtSelected.id)
            .then(res => setCommune(res.data.communes))
            .catch(err => {
                setError(true)
                //setMassage(err.data.message)
            })
    })

    const handleClickOutside = e => {
        if (!myRef.current.contains(e.target)) {
            setClickedOutside(true);
        }
    };

    const handleClickInside = () => setClickedOutside(false);

    useEffect(() => {
        getProvince();
    }, []);

    useEffect(() => {
        const sessionDirection = JSON.parse(sessionStorage.getItem('sessionDirectionAccount'));
        if (sessionDirection && Object.keys(sessionDirection).length !== 0) {
            if (sessionDirection.province) {
                setProvinceSelected({ id: sessionDirection.province.id, name: sessionDirection.province.name })
            }

            if (sessionDirection.district) {
                setDistrictSelected({ id: sessionDirection.district.id, name: sessionDirection.district.name })
            }

            if (sessionDirection.commune) {
                setCommuneSelected({ id: sessionDirection.commune.id, name: sessionDirection.commune.name })
            }
        }
    }, []);

    useEffect(() => {
        if (Object.keys(provinceSelected).length !== 0) {
            getDistrict();
        }
    }, [provinceSelected]);

    useEffect(() => {
        if (Object.keys(districtSelected).length !== 0) {
            getCommune();
        }
    }, [provinceSelected, districtSelected]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (clickedOutside) {
            ToggleDirection(false);
        }
    }, [clickedOutside]);

    useEffect(() => {
        let address = '';
        if (Object.keys(provinceSelected).length !== 0) {
            address += provinceSelected.name;
            setValue('province_id', provinceSelected.id || '');
        }
        if (Object.keys(districtSelected).length !== 0) {
            address += ', ' + districtSelected.name;
            setValue('district_id', districtSelected?.id || '');
        }
        if (Object.keys(communeSelected).length !== 0) {
            address += ', ' + communeSelected.name;
            setValue('commune_id', communeSelected?.id || '');
        }
        setValue(field, address);

    }, [provinceSelected, districtSelected, communeSelected]);

    return (
        <div className='direction' ref={myRef} onClick={handleClickInside}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab className='tab__header tab__header__address' label={"Province"} index={0} />
                    <Tab className='tab__header tab__header__address' disabled={Object.keys(provinceSelected).length === 0} label={"District"} index={1} />
                    <Tab className='tab__header tab__header__address' disabled={Object.keys(districtSelected).length === 0} label={"Commune"} index={2} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <List style={{ height: '200px', overflowY: 'scroll' }}>
                    {province && province.map(item => (
                        <ListItem disablePadding key={item.id}
                            onClick={() => {
                                setProvinceSelected({ id: item.id, name: item.name });
                                setDistrictSelected({});
                                setCommuneSelected({});
                                setValueTab(1);
                                sessionStorage.setItem('sessionDirectionAccount',
                                    JSON.stringify({ province: { id: item.id, name: item.name } }))
                            }}>
                            <ListItemButton>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <List style={{ height: '200px', overflowY: 'scroll' }}>
                    {district && district.map(item => (
                        <ListItem disablePadding key={item.id}
                            onClick={() => {
                                setDistrictSelected({ id: item.id, name: item.name });
                                setValueTab(2);
                                sessionStorage.setItem('sessionDirectionAccount',
                                    JSON.stringify({
                                        ...JSON.parse(sessionStorage.getItem('sessionDirectionAccount')),
                                        district: { id: item.id, name: item.name }
                                    }))
                            }}>
                            <ListItemButton>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>

                    ))}
                </List>
            </TabPanel>

            <TabPanel value={value} index={2}>
                <List style={{ height: '200px', overflowY: 'scroll' }}>
                    {commune && commune.map(item => (
                        <ListItem disablePadding key={item.id}
                            onClick={() => {
                                setCommuneSelected({ id: item.id, name: item.name });
                                sessionStorage.setItem('sessionDirectionAccount',
                                    JSON.stringify({
                                        ...JSON.parse(sessionStorage.getItem('sessionDirectionAccount')),
                                        commune: { id: item.id, name: item.name }
                                    }))
                            }}>
                            <ListItemButton>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </TabPanel>
            {error && <ShowSnackbars message={message} type="error" />}
        </div>

    );
};

export default Direction;