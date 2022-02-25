import React, { useEffect, useState } from "react";
import { fingerPrintFunc } from "./utils/fingerPrintFunction/function";

var deviceTechn = {
    0: "Unknown",
    1: "Optical",
    2: "Capacitive",
    3: "Thermal",
    4: "Pressure",
};

var deviceModality = {
    0: "Unknown",
    1: "Swipe",
    2: "Area",
    3: "AreaMultifinger",
};

var deviceUidType = {
    0: "Persistent",
    1: "Volatile",
};

const FingerPrintReader = () => {
    const [sdk, setSdk] = useState<any>(null);
    const [startCap, setStartCap] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<any>(null);
    const getFingerPrint = async () => {
        const sdkData = await fingerPrintFunc();
        setSdk(sdkData);
    };

    useEffect(() => {
        getFingerPrint();
    }, []);

    const testDevice = async () => {
        console.log("inside testdevice");
        sdk.onDeviceConnected = await function (e: any) {
            // Detects if the deveice is connected for which acquisition started
            console.log(e, "on device connected");
        };
        sdk.onDeviceDisconnected = await function (e: any) {
            // Detects if device gets disconnected - provides deviceUid of disconnected device
            console.log(e, "on device disconnected");
        };

        sdk.onCommunicationFailed = function (e: any) {
            // Detects if there is a failure in communicating with U.R.U web SDK
            // console.log(e, "Communinication Failed");
        };

        sdk.onQualityReported = function (e: any) {
            // Quality of sample aquired - Function triggered on every sample acquired
            console.log(window.Fingerprint.QualityCode[e.quality], "quality");
        };

        // show list of finger print devices connected
        let devices = await sdk.enumerateDevices();
        console.log(devices, "devices");

        // show the detail of device
        let deviceInfo = await sdk.getDeviceInfo(devices[0]);
        console.log(deviceInfo, "devices info");
        // var deviceId = deviceInfo.DeviceID;
        //     var uidTyp = deviceUidType[deviceInfo.eUidType];
        //     var modality = deviceModality[deviceInfo.eDeviceModality];
        //     var deviceTech = deviceTechn[deviceInfo.eDeviceTech];
    };

    useEffect(() => {
        if (sdk) {
            testDevice();
        }
    }, [sdk]);

    if (startCap) {
        sdk.onSamplesAcquired = function (s: any) {
            if (s?.samples) {
                console.log(s.samples, "sample");
                var samples = JSON.parse(s.samples);
                let imageData =
                    "data:image/png;base64," +
                    window.Fingerprint.b64UrlTo64(samples[0]);
                setImageSrc(imageData);
            }
        };
    }

    const startCapture = async () => {
        setStartCap(true);
        await sdk
            .startAcquisition(window.Fingerprint.SampleFormat.PngImage)
            .then(
                function () {
                    console.log("You can start capturing !!!");
                },
                function (error: Error) {
                    console.log(error.message);
                }
            );
    };

    const stopCapture = async () => {
        await sdk.stopAcquisition().then(
            function () {
                console.log("capture stopped");
                setStartCap(false);
            },
            function (error: Error) {
                console.log(error.message);
            }
        );
    };

    const imageDownload = (uri: any, name: any, dataURIType: any) => {
        if (IeVersionInfo() > 0) {
            //alert("This is IE " + IeVersionInfo());
            var blob = dataURItoBlob(uri, dataURIType);
            (window.navigator as any).msSaveOrOpenBlob(blob, name);
        } else {
            //alert("This is not IE.");
            var save = document.createElement("a");
            save.href = uri;
            save.download = name;
            var event = document.createEvent("MouseEvents");
            event.initMouseEvent(
                "click",
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            );
            save.dispatchEvent(event);
        }
    };

    const dataURItoBlob = (dataURI: any, dataURIType: any) => {
        var binary = atob(dataURI.split(",")[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: dataURIType });
    };

    function IeVersionInfo() {
        var sAgent = window.navigator.userAgent;
        var IEVersion = sAgent.indexOf("MSIE");

        // If IE, return version number.
        if (IEVersion > 0)
            return parseInt(
                sAgent.substring(IEVersion + 5, sAgent.indexOf(".", IEVersion))
            );
        // If IE 11 then look for Updated user agent string.
        else if (!!navigator.userAgent.match(/Trident\/7\./)) return 11;
        // Quick and dirty test for Microsoft Edge
        else if (
            (document as any).documentMode ||
            /Edge/.test(navigator.userAgent)
        )
            return 12;
        else return 0; //If not IE return 0
    }

    const handleButtonClick = (
        event: React.SyntheticEvent<HTMLButtonElement>
    ) => {
        if (event.currentTarget.name === "start") {
            startCapture();
        } else if (event.currentTarget.name === "stop") {
            stopCapture();
        } else if (event.currentTarget.name === "save") {
            imageDownload(imageSrc, "sampleImage.png", "image/png");
        }
    };

    return (
        <div>
            {imageSrc && (
                <div
                    style={{
                        height: "200px",
                        width: "200px",
                        borderWidth: "1px",
                        borderStyle: "solid",
                    }}
                    className="border"
                >
                    <img
                        src={imageSrc}
                        style={{
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />
                </div>
            )}
            <div>
                <button
                    onClick={(event) => handleButtonClick(event)}
                    name="start"
                    id="start"
                    disabled={!sdk || startCap ? true : false}
                >
                    Start
                </button>
                <button
                    onClick={(event) => handleButtonClick(event)}
                    name="stop"
                    id="stop"
                    disabled={!startCap ? true : false}
                >
                    Stop
                </button>
                <button
                    onClick={(event) => handleButtonClick(event)}
                    name="save"
                    id="save"
                    disabled={!imageSrc ? true : false}
                >
                    Save
                </button>
            </div>
            {/* <div id="Scores">
                <h5>
                    Scan Quality :{" "}
                    <input
                        type="text"
                        id="qualityInputBox"
                        style={{
                            backgroundColor: "#DCDCDC",
                            textAlign: "center",
                        }}
                    ></input>
                </h5>
            </div>

            <div id="content-capture">
                <div id="status"></div>
                <div id="imagediv"></div>
                <div id="contentButtons">
                    <table style={{ width: "70%", justifyContent: "center" }}>
                        <tr>
                            <td>
                                <input
                                    type="button"
                                    id="clearButton"
                                    value="Clear"
                                    onClick={window["onClear"]}
                                ></input>
                            </td>
                            <td
                                data-toggle="tooltip"
                                title="Will work with the .png format."
                            >
                                <input
                                    type="button"
                                    id="save"
                                    value="Clear"
                                    onClick={window["onClear"]}
                                ></input>
                            </td>
                            <td>
                                <input
                                    type="button"
                                    id="start"
                                    value="Start"
                                    onClick={window["onStart"]}
                                />
                            </td>
                            <td>
                                <input
                                    type="button"
                                    id="stop"
                                    value="Stop"
                                    onClick={window["onStop"]}
                                />
                            </td>
                            <td>
                                <input
                                    type="button"
                                    id="info"
                                    value="Info"
                                    onClick={window["onGetInfo"]}
                                />
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="imageGallery"></div>
                <div id="deviceInfo"></div>

                <div id="saveAndFormats">
                    <form
                        name="myForm"
                        style={{
                            border: "solid",
                            borderColor: "#000000",
                            padding: "5px",
                        }}
                    >
                        <b>Acquire Formats :</b>
                        <br />
                        <table>
                            <tr
                                data-toggle="tooltip"
                                title="Will save data to a .raw file."
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        name="Raw"
                                        value="1"
                                        onClick={() => window.checkOnly(this)}
                                    />{" "}
                                    RAW <br />
                                </td>
                            </tr>
                            <tr
                                data-toggle="tooltip"
                                title="Will save data to a Intermediate file"
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        name="Intermediate"
                                        value="2"
                                        onClick={() => window.checkOnly(this)}
                                    />{" "}
                                    Feature Set
                                    <br />
                                </td>
                            </tr>
                            <tr
                                data-toggle="tooltip"
                                title="Will save data to a .wsq file."
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        name="Compressed"
                                        value="3"
                                        onClick={() => window.checkOnly(this)}
                                    />{" "}
                                    WSQ
                                    <br />
                                </td>
                            </tr>
                            <tr
                                data-toggle="tooltip"
                                title="Will save data to a .png file."
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        name="PngImage"
                                        checked={true}
                                        value="4"
                                        onClick={() => window.checkOnly(this)}
                                    />{" "}
                                    PNG
                                </td>
                            </tr>
                        </table>
                    </form>
                    <br />
                    <input
                        type="button"
                        id="saveImagePng"
                        value="Export"
                        onClick={window["onImageDownload"]}
                    />
                </div>
            </div> */}
        </div>
    );
};

export default FingerPrintReader;
