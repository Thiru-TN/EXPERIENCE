sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent"
], function (Controller, Fragment, MessageToast, UIComponent) {
    "use strict";

    return Controller.extend("app.controller.View2", {
        onInit: function () {
            this.updateDateTime();
            this.startDateTimeUpdater();
        },

        updateDateTime: function () {
            var oModel = this.getView().getModel();
            if (!oModel) {
                oModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oModel);
            }

            var oDate = new Date();
            var sDate = oDate.toLocaleDateString();
            var sTime = oDate.toLocaleTimeString();

            oModel.setProperty("/currentDate", sDate);
            oModel.setProperty("/currentTime", sTime);
        },

        startDateTimeUpdater: function () {
            setInterval(function () {
                this.updateDateTime();
            }.bind(this), 1000);
        },

        onHome: function() {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("View1"); // Navigate to View1 route
        },

        secret: function() {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("View3"); // Navigate to View3 route
        },

        onRegister: function () {
            if (!this._oRegisterFragment) {
                Fragment.load({
                    id: "registerFragment",
                    name: "app.Fragments.Register",
                    controller: this
                }).then(function (oFragment) {
                    this._oRegisterFragment = oFragment;
                    this.getView().addDependent(this._oRegisterFragment);
                    this._oRegisterFragment.open();
                }.bind(this));
            } else {
                this._oRegisterFragment.open();
            }
        },

        onRegisterConfirm: function () {
            var sUsername = sap.ui.getCore().byId("registerUsername").getValue();
            var sEmail = sap.ui.getCore().byId("registerEmail").getValue();
            var sPassword = sap.ui.getCore().byId("registerPassword").getValue();

            if (!sUsername || !sEmail || !sPassword) {
                MessageToast.show("All fields must be filled");
                return;
            }

            if (sPassword.length < 8 || !/[A-Z]/.test(sPassword) || !/[a-z]/.test(sPassword) || !/[0-9]/.test(sPassword) || !/[^A-Za-z0-9]/.test(sPassword)) {
                MessageToast.show("Password must contain minimum 8 characters, including uppercase, lowercase, numbers, and special characters");
                return;
            }

            // Set the same values in the main view's input fields
            this.byId("username").setValue(sUsername);
            this.byId("email").setValue(sEmail);
            this.byId("password").setValue(sPassword);

            MessageToast.show("Registration successful");
            this._oRegisterFragment.close();
        },

        onRegisterCancel: function () {
            this._oRegisterFragment.close();
        },

        onBack: function() {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("View1"); // Navigate to View1 route
        },

        notifications: function () {
            MessageToast.show("Login to Access");
        },

        onLogin: function () {
            var sUsername = this.byId("username").getValue();
            var sEmail = this.byId("email").getValue();
            var sPassword = this.byId("password").getValue();
            if (!sUsername || !sEmail || !sPassword) {
                MessageToast.show("All fields must be filled");
                return;
            }
            if (sPassword.length < 8 || !/[A-Z]/.test(sPassword) || !/[a-z]/.test(sPassword) || !/[0-9]/.test(sPassword) || !/[^A-Za-z0-9]/.test(sPassword)) {
                MessageToast.show("Password must contain minimum 8 characters, including uppercase, lowercase, numbers, and special characters");
                return;
            }
            MessageToast.show("Login successful");
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("View3"); // Navigate to View3 route
        }
    });
});
