/**
 * Created by ty on 16/3/23.
 */
sap.ui.define([
    "sap/ui/core/util/MockServer"
], function(MockServer) {
    "use strict";

    return {
        /**
         * Initializes the mock server.
         * You can configure the delay with the URL parameter "serverDelay".
         * The local mock data in this folder is returned instead of the real data for testing.
         * @public
         */
        init: function(that) {
            var mManifest = that.getMetadata().getManifestEntry("sap.app");
            var sServiceUrl = mManifest.dataSources.mainService.uri;
            var sMockedDataSource = mManifest.dataSources.mainService.settings.localUri;

            var oMockServer = new MockServer({
                rootUri : sServiceUrl
            });

            oMockServer.simulate(sMockedDataSource, {
                // the replace instruction strips the filename, returning only the path of mockdata
                // eg. localService/metadata.xml --> localService/mokdata
                sMockdataBaseUrl: sMockedDataSource.replace(/[^\/]+$/, "mockdata"),
                bGenerateMissingMockData: true
            });

            var sLastStatusKey;
            var change = function(oEvent) {
                /*get url parmaters*/
                var sUrl = oEvent.getParameters().oXhr.url;
                /*get Guid*/
                var nGetGuidIndex = sUrl.indexOf("Guid%20eq%20");
                var nGuidEnd = sUrl.indexOf("%20and%20");
                var sGuid = sUrl.substring(nGetGuidIndex+12, nGuidEnd);
                sGuid = sGuid.substring(3, sGuid.length-3);
                //get selected key
                var nKeyIndex = sUrl.indexOf("Selectedkey");
                var nKeyEnd = sUrl.length-3;
                var sKey = sUrl.substring(nKeyIndex+22, nKeyEnd);

                if (sGuid === "0050569231FD1EE5B7D953ACA8FA2A96") {
                    if (sKey === "ACTIDX03" || sKey === "ACTIDX05" || sKey === "ACTIDX01") {
                        sLastStatusKey = sKey;
                    }

                    if (sKey === "ACTIDX10") {
                        sKey = sLastStatusKey;
                    } else if (sKey === "ACTIDX08" && sLastStatusKey === "ACTIDX01") {
                        sKey = sLastStatusKey;
                        sLastStatusKey = null;
                    }
                }
                /*test data*/
                var oKeyObject = {
                    ACTIDX07: "Lock",
                    ACTIDX08: "Unlock",
                    ACTIDX01: "Release",
                    ACTIDX09: "FlagforArchiving",
                    ACTIDX03: "Complete",
                    ACTIDX04: "ResetCompleted",
                    ACTIDX05: "Cancel",
                    ACTIDX06: "ResetCanceled",
                    ACTIDX19: "SetforProcessing",
                    ACTIDX10: "ResetArchivingFlag"
                };

                var sSelectedStatus = oKeyObject[sKey];

                var oNewDropData = {
                    Release: [
                        {
                            Key: "ACTIDX05",
                            Value: "Cancel"
                        },
                        {
                            Key: "ACTIDX03",
                            Value: "Complete"
                        },
                        {
                            Key: "ACTIDX19",
                            Value: "Set for Processing"
                        }
                    ],
                    Complete: [
                        {
                            Key: "ACTIDX04",
                            Value: "Reset 'Completed'"
                        }
                    ],
                    Cancel: [
                        {
                            Key: "ACTIDX06",
                            Value: "Reset 'Canceled'"
                        }

                    ],
                    ResetCanceled: [
                        {
                            Key: "ACTIDX05",
                            Value: "Cancel"
                        },
                        {
                            Key: "ACTIDX03",
                            Value: "Complete"
                        },
                        {
                            Key: "ACTIDX19",
                            Value: "Set for Processing"
                        }
                    ],
                    SetforProcessing: [
                        {
                            Key: "ACTIDX03",
                            Value: "Complete"
                        },
                        {
                            Key: "ACTIDX05",
                            Value: "Cancel"
                        }
                    ],
                    ResetCompleted: [
                        {
                            Key: "ACTIDX05",
                            Value: "Cancel"
                        },
                        {
                            Key: "ACTIDX03",
                            Value: "Complete"
                        },
                        {
                            Key: "ACTIDX19",
                            Value: "Set for Processing"
                        }
                    ]
                };
                var oHeaderDropData = {
                    Lock: [
                        {
                            Key: "ACTIDX08",
                            Value: "Unlock"
                        }
                    ],
                    Unlock: [
                        {
                            Key: "ACTIDX07",
                            Value: "Lock"
                        },
                        {
                            Key: "ACTIDX01",
                            Value: "Release"
                        }
                    ],
                    Release: [
                        {
                            Key: "ACTIDX05",
                            Value: "Cancel"
                        },
                        {
                            Key: "ACTIDX03",
                            Value: "Complete"
                        },
                        {
                            Key: "ACTIDX07",
                            Value: "Lock"
                        }
                    ],
                    Complete: [
                        {
                            Key: "ACTIDX09",
                            Value: "Flag for Archiving"
                        },
                        {
                            Key: "ACTIDX04",
                            Value: "Reset 'Completed'"
                        }
                    ],
                    FlagforArchiving: [
                        {
                            Key: "ACTIDX10",
                            Value: "Reset Archiving Flag"
                        }
                    ],
                    ResetCompleted: [
                        {
                            Key: "ACTIDX05",
                            Value: "Cancel"
                        },
                        {
                            Key: "ACTIDX03",
                            Value: "Complete"
                        },
                        {
                            Key: "ACTIDX07",
                            Value: "Lock"
                        }
                    ],
                    Cancel: [
                        {
                            Key: "ACTIDX09",
                            Value: "Flag for Archiving"
                        },
                        {
                            Key: "ACTIDX06",
                            Value: "Reset 'Canceled'"
                        }
                    ],
                    ResetCanceled: [
                        {
                            Key: "ACTIDX05",
                            Value: "Cancel"
                        },
                        {
                            Key: "ACTIDX03",
                            Value: "Complete"
                        },
                        {
                            Key: "ACTIDX07",
                            Value: "Lock"
                        }
                    ]
                };
                var oReturnDropData;

                if (sGuid === "0050569231FD1EE5B7D953ACA8FA2A96") {
                    oReturnDropData = oHeaderDropData[sSelectedStatus];
                } else {
                    oReturnDropData = oNewDropData[sSelectedStatus];
                }

                oEvent.getParameter("oFilteredData").results[0] = oReturnDropData;
            };



            // simulation for edit enable status
            var sEditEnable = 0;
            var checkEditEnable = function(oEvent) {
                if (sEditEnable > 2) {
                    sEditEnable = 0;
                }
                sEditEnable++;

                oEvent.getParameter("oFilteredData").results[0] = 1;
            };

            oMockServer.attachAfter("GET", change, "ChangeStatusSet");
            oMockServer.attachAfter("GET", checkEditEnable, "EditableSet");

            oMockServer.start();

            jQuery.sap.log.info("Running the app with mock data");
        }
    };

});