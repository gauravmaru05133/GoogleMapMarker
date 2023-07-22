import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hook/useAppSelector";
import { getLocationFromApi } from "../../redux/selector";
import { getLocationCall } from "../../redux/slice/GetLocation.slice";
import { screenWidth } from "../../utils";
import { colors } from "../../utils/colors";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from 'react-native-modal'
import { fontPixel } from "../../utils/DynamicScrenSize";
import { strings } from "../../utils/string";
import { images } from "../../assets/Images";

export const Home = () => {
    const mapRef = useRef(null)
    const dispatch = useDispatch()
    const fetchStoreLocationRes = useAppSelector(getLocationFromApi)
    const [locationList, setLocationList] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [selectLocation, setSelectLocation] = useState((''))
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (fetchStoreLocationRes && fetchStoreLocationRes.length > 0) {
            setLocationList(fetchStoreLocationRes)
            setLoading(false)
        } else {
            setTimeout(() => {
                setLoading(false)  
            }, 1000);
            
        }
    }, [fetchStoreLocationRes])

    /**
     * Get store location
     */
    const getStoreLocation = () => {
        let apiReq = {
            "Latitude": "51.5025", "Longitude": "-0.1414", "Limit": 20, "Radius": 20,
            "SearchText": ""
        }
        dispatch(getLocationCall(apiReq))
    }

    useEffect(() => {
        getStoreLocation()
    }, [])

    const setOnMarkerClick = (item) => {
        setValueinMArker(item, true)
        setModalVisible(true)
        setSelectLocation(item)
    }

    const setValueinMArker = (item, isZoom) => {
        mapRef.current.animateToRegion({
            latitude: item?.Latitude,
            longitude: item?.Longitude,
            latitudeDelta: isZoom ? 0.0022 : 0.0922,
            longitudeDelta: isZoom ? 0.0021 : 0.0421,
        })
    }

    const clearZoomUI = () => {
        setValueinMArker(selectLocation, false)
        setSelectLocation('')
        setModalVisible(false)
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            {loading ? <View style={styles.laoding_container}>
                <ActivityIndicator color={colors.green} size='large' />
            </View> :
                <View style={{ flex: 1, backgroundColor: colors.white }}>
                    <MapView
                        ref={mapRef}
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={{ flex: 1 }}
                        zoomEnabled
                        zoomControlEnabled={true}
                        region={{
                            latitude: 51.5025,
                            longitude: -0.1414,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {locationList.map((item, index) => {
                            return (
                                <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: item?.Latitude,
                                        longitude: item?.Longitude
                                    }}
                                    pinColor={colors.green}
                                    onPress={() => {
                                        setOnMarkerClick(item)
                                    }}
                                />
                            )
                        })}

                    </MapView>
                </View>
            }

            <Modal
                isVisible={modalVisible}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
                backdropOpacity={0}
                onBackButtonPress={() => clearZoomUI()}
                onBackdropPress={() => clearZoomUI()}
            >
                <View style={styles.modal_main_container}>
                    <View style={styles.modal_child_container}>
                        <View style={styles.child_container}>
                            <View style={styles.modal_child_flex}>
                                <View>
                                    <Text style={styles.details_heading}>Store Name</Text>
                                    <Text style={styles.details_value}>{selectLocation?.StoreName}</Text>
                                </View>
                                <View style={styles.details_container}>
                                    <Text style={styles.details_heading}>Address</Text>
                                    <Text style={styles.details_value}>{selectLocation?.StoreAddress ? selectLocation?.StoreAddress : "-"}</Text>
                                </View>
                            </View>
                            <View style={styles.store_img_container}>
                                <Image style={styles.store_img}
                                    source={selectLocation?.Picture ? { uri: selectLocation?.Picture } : images.placeHolder}
                                    resizeMode='contain'
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.acton_close_modal}
                            onPress={() => clearZoomUI()}
                        >
                            <Text style={styles.action_txt_name}>{strings.close}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    details_heading: {
        fontSize: fontPixel(14), textTransform: 'uppercase', fontWeight: '600'
    },
    details_container: {
        marginTop: 15
    },
    details_value: {
        fontSize: fontPixel(16), marginTop: 2
    },
    modal_main_container: {
        width: screenWidth, backgroundColor: colors.white, borderTopLeftRadius: 10, borderTopRightRadius: 10
    },
    modal_child_container: {
        paddingHorizontal: 14, paddingVertical: 25
    },
    acton_close_modal: {
        width: '100%', height: 45, backgroundColor: colors.green,
        borderRadius: 5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10
    },
    action_txt_name: {
        color: colors.white, fontSize: fontPixel(18), fontWeight: '800', textTransform: 'uppercase'
    },
    child_container: {
        flexDirection: 'row'
    },
    modal_child_flex: {
        flex: 1
    },
    store_img_container: {
        flex: 0.20, paddingLeft: 15
    },
    store_img: {
        flex: 1, width: undefined, height: undefined, tintColor: colors.green
    },
    laoding_container: {
        flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'
    }
})