sap.ui.define([], function () {
    "use strict";

    return {
        formatDate: function () {
            var oDate = new Date();
            return oDate.toLocaleDateString();
        },
        formatTime: function () {
            var oDate = new Date();
            return oDate.toLocaleTimeString();
        }
    };
});
