sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
    "sap/m/Label",
    "sap/m/Text",
    "sap/ui/layout/form/SimpleForm",
    "sap/ui/layout/form/ResponsiveGridLayout",
    "sap/m/ScrollContainer",
    "sap/m/VBox"
], function(Controller, JSONModel, UIComponent, Label, Text, SimpleForm, ResponsiveGridLayout, ScrollContainer, VBox) {
    "use strict";

    return Controller.extend("app.controller.View3", {

        onInit: function() {
            var oView = this.getView();
            var oModel = new JSONModel();
            oModel.loadData("model/data.json"); // Adjust path as per your project structure
            oModel.attachRequestCompleted(function() {
                oView.setModel(oModel);
            });

            this._billItems = []; // Array to store items added to the bill
        },

        onHome: function() {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("View1"); // Navigate to View1 route
        },

        onBack: function() {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("View2"); // Navigate to View2 route
        },

        onLogout: function() {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("View1"); // Navigate to View1 route
        },

        onFinish: function() {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("View4"); // Navigate to View4 route
        },

        onNotifications: function() {
            sap.m.MessageToast.show("Order delivered; Special offer; Suggestion; Next offer");
        },
        

        onSelectTab: function(oEvent) {
            var sKey = oEvent.getParameter("key");

            // Hide all panels first
            this.getView().byId("defaultPanel").setVisible(false);
            this.getView().byId("tablePanel").setVisible(false);
            this.getView().byId("simpleFormPanel").setVisible(false);

            // Show the selected panel
            if (sKey === "Default") {
                this.getView().byId("defaultPanel").setVisible(true);
            } else if (sKey === "SimpleForm") {
                this.getView().byId("simpleFormPanel").setVisible(true);
                this.bindSimpleForm();
            } else if (sKey === "Table") {
                this.getView().byId("tablePanel").setVisible(true);
            }
        },

        onLeftItemSelect: function(oEvent) {
            var oSelectedItem = oEvent.getParameter("listItem").getBindingContext().getObject();
            this.addItemToBill(oSelectedItem);
        },

        onListItemPress: function(oEvent) {
            var oSelectedItem = oEvent.getSource().getBindingContext().getObject();
            this.addItemToBill(oSelectedItem);
        },

        addItemToBill: function(oItem) {
            var oModel = this.getView().getModel();
            var bItemFound = false;

            // Check if item already exists in _billItems array
            for (var i = 0; i < this._billItems.length; i++) {
                if (this._billItems[i].ProductId === oItem.ProductId) {
                    this._billItems[i].Quantity++;
                    bItemFound = true;
                    break;
                }
            }

            // If item is not found, add it to the _billItems array
            if (!bItemFound) {
                oItem.Quantity = 1;
                this._billItems.push(oItem);
            }

            // Update the model with the new bill items
            oModel.setProperty("/SelectedItems", this._billItems);
            this.getView().byId("iconTabBar").setSelectedKey("Default");
        },

        bindSimpleForm: function() {
            var oSimpleForm = this.getView().byId("simpleForm");
            var oModel = this.getView().getModel();
            var aProducts = oModel.getProperty("/ProductCollection");
        
            // Clear previous bindings
            oSimpleForm.destroyContent();
        
            // Bind all items from ProductCollection to the SimpleForm
            if (aProducts && aProducts.length > 0) {
                for (var i = 0; i < aProducts.length; i++) {
                    var oProduct = aProducts[i];
        
                    // Adding labels and texts to SimpleForm
                    oSimpleForm.addContent(new Label({ text: "Name" }));
                    oSimpleForm.addContent(new Text({ text: oProduct.Name }));
        
                    oSimpleForm.addContent(new Label({ text: "ProductId" }));
                    oSimpleForm.addContent(new Text({ text: oProduct.ProductId }));
        
                    oSimpleForm.addContent(new Label({ text: "Category" }));
                    oSimpleForm.addContent(new Text({ text: oProduct.Category }));
        
                    oSimpleForm.addContent(new Label({ text: "SupplierName" }));
                    oSimpleForm.addContent(new Text({ text: oProduct.SupplierName }));
        
                    oSimpleForm.addContent(new Label({ text: "Price" }));
                    oSimpleForm.addContent(new Text({ text: oProduct.Price }));
        
                    oSimpleForm.addContent(new Label({ text: "CurrencyCode" }));
                    oSimpleForm.addContent(new Text({ text: oProduct.CurrencyCode }));
        
                    oSimpleForm.addContent(new Label({ text: "Description" }));
                    oSimpleForm.addContent(new Text({ text: oProduct.Description }));
        
                    oSimpleForm.addContent(new Label({ text: "WeightMeasure" }));
                    oSimpleForm.addContent(new Text({ text: oProduct.WeightMeasure }));
        
                    oSimpleForm.addContent(new Label({ text: "WeightUnit" }));
                    oSimpleForm.addContent(new Text({ text: oProduct.WeightUnit }));
        
                    oSimpleForm.addContent(new Label({ text: "Width" }));
                    oSimpleForm.addContent(new Text({ text: oProduct.Width }));
        
                    oSimpleForm.addContent(new Label({ text: "Depth" }));
                    oSimpleForm.addContent(new Text({ text: oProduct.Depth }));
        
                    oSimpleForm.addContent(new Label({ text: "Height" }));
                    oSimpleForm.addContent(new Text({ text: oProduct.Height }));
        
                    oSimpleForm.addContent(new Label({ text: "DimUnit" }));
                    oSimpleForm.addContent(new Text({ text: oProduct.DimUnit }));

                    if (i < aProducts.length - 1) {
                        oSimpleForm.addContent(new sap.ui.core.HTML({ content: "<hr>" }));
                    }
                }
            }
        },
    });    
});