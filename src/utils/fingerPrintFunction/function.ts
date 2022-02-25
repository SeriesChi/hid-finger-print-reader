export{}

export const fingerPrintFunc = async () => {
    const sdk = new window.Fingerprint.WebApi;
    return sdk;
}
// import { useState } from "react";
// import "../fingerPrintUtils/fingerprint.sdk.min.js";

// const [test, setTest] = useState<any>(null);
// const [myVal, setMyVal] = useState<any>("");
// const [disable, setDisable] = useState<boolean>(true);
// const [startEnroll, setStartEnroll] = useState<boolean>(false);

// var currentFormat = window.Fingerprint.SampleFormat.PngImage;

// const deviceTechn = {
//                         0: "Unknown",
//                         1: "Optical",
//                         2: "Capacitive",
//                         3: "Thermal",
//                         4: "Pressure"
//                     };

// const deviceModality = {
//     0: "Unknown",
//     1: "Swipe",
//     2: "Area",
//     3: "AreaMultifinger"
// }

// const deviceUidType = {
//     0: "Persistent",
//     1: "Volatile"
//  }

//  const fingerPrintSdk = () => {
     
// }
// const sdk = new window.Fingerprint.WebApi;
// const [fingerPrintSdkData, setFingerPrintSdkdata] = useState<any>({
//    operationToRestart: null,
//    acquisitionStarted: null,
//    onDeviceConnected: function (e: any) {
//        // Detects if the deveice is connected for which acquisition started
//        // showMessage("Scan your finger");
//        console.log("scan your finger");
//    },
//    onDeviceDisconnected: function (e: any) {
//        // Detects if the deveice is connected for which acquisition started
//        // showMessage("Scan your finger");
//        console.log("Device disconnected");
//    },
//    onCommunicationFailed: function (e: any) {
//        // Detects if the deveice is connected for which acquisition started
//        // showMessage("Scan your finger");
//        console.log("Communinication Failed");
//    },
//    onSamplesAcquired: function (e: any) {
//        // Detects if the deveice is connected for which acquisition started
//        // showMessage("Scan your finger");
//        console.log("sample acquired");
//        // sampleAcquired(s);
//    },
//    onQualityReported: function (e: any) {
//        // Detects if the deveice is connected for which acquisition started
//        // showMessage("Scan your finger");
//        console.log("qualityInputBox");
//        // document.getElementById("qualityInputBox").value = window.Fingerprint.QualityCode[(e.quality)];
//    },
// })

























//  window.onload = function () {
//      localStorage.clear();
//     //  readersDropDownPopulate(true); //To populate readers for drop down selection
//     // disableEnable(); // Disabling enabling buttons - if reader not selected
//     // enableDisableScanQualityDiv("content-reader"); // To enable disable scan quality div
//     // disableEnableExport(true);
//  }

//  const startCapture = () => {
//     if (fingerPrintSdkData.acquisitionStarted) // Monitoring if already started capturing
//         return;
//     // var _instance = this;
//     // showMessage("");
//     this.operationToRestart = this.startCapture;
//     this.sdk.startAcquisition(currentFormat, myVal).then(function () {
//         _instance.acquisitionStarted = true;

//         //Disabling start once started
//         disableEnableStartStop();

//     }, function (error) {
//         showMessage(error.message);
//     });
//  }

//  export const onStart () => {
//     //  assignFormat();
//      if(currentFormat == ""){
//         alert("Please select a format.")
//     }else{        
//         test.startCapture();
//     }
//  }