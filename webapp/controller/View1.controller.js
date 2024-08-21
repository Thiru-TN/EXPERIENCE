sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
    "sap/m/GenericTile",
    "sap/m/TileContent",
    "sap/m/ImageContent",
    "sap/m/VBox",
    "sap/m/Image"
], function(Controller, MessageToast, JSONModel, UIComponent, GenericTile, TileContent, ImageContent, VBox, Image) {
    "use strict";

    return Controller.extend("app.controller.View1", {
        onInit: function () {
            // Define the array of image paths
            this.imagePaths = [
                "./image1.jpg",
                "./image2.jpg",
                "./image3.jpg",
                "./image4.jpg"
            ];
            // Initialize the current index to 0
            this.currentIndex = 0;

            // Hardcoded product data
            var aProducts = [
                {Category: "Laptops", Name: "Notebook Basic 15", CurrencyCode: "EUR", Price: 956},
                {Category: "Laptops", Name: "Notebook Basic 17", CurrencyCode: "EUR", Price: 1249},
                {Category: "Laptops", Name: "Notebook Basic 18", CurrencyCode: "EUR", Price: 1570},
                {Category: "Laptops", Name: "Notebook Basic 19", CurrencyCode: "EUR", Price: 1650},
                {Category: "Accessories", Name: "ITelO Vault", CurrencyCode: "EUR", Price: 299},
                {Category: "Accessories", Name: "Notebook Professional 15", CurrencyCode: "EUR", Price: 1999},
                {Category: "Laptops", Name: "Notebook Professional 17", CurrencyCode: "EUR", Price: 2299},
                {Category: "Accessories", Name: "ITelO Vault Net", CurrencyCode: "EUR", Price: 459},
                {Category: "Accessories", Name: "ITelO Vault SAT", CurrencyCode: "EUR", Price: 149},
                {Category: "Accessories", Name: "Comfort Easy", CurrencyCode: "EUR", Price: 1679}
            ];

            this.bindProductTiles(aProducts);
        },

        bindProductTiles: function(aProducts) {
            var oContainer1 = this.byId("productTilesContainer1");
            var oContainer2 = this.byId("productTilesContainer2");

            for (var i = 0; i < 5; i++) {
                var oTile = new GenericTile({
                    header: aProducts[i].Name,
                    subheader: aProducts[i].Category,
                    tileContent: [
                        new TileContent({
                            footer: aProducts[i].Price + " " + aProducts[i].CurrencyCode,
                            content: [
                                new ImageContent({
                                    src: "sap-icon://add"
                                })
                            ]
                        })
                    ],
                    press: this.onProductPress.bind(this)
                });
                oContainer1.addItem(new VBox({ items: [oTile] }).addStyleClass("productTile"));
            }

            for (var i = 5; i < 10; i++) {
                var oTile = new GenericTile({
                    header: aProducts[i].Name,
                    subheader: aProducts[i].Category,
                    tileContent: [
                        new TileContent({
                            footer: aProducts[i].Price + " " + aProducts[i].CurrencyCode,
                            content: [
                                new ImageContent({
                                    src: "sap-icon://add"
                                })
                            ]
                        })
                    ],
                    press: this.onProductPress.bind(this)
                });
                oContainer2.addItem(new VBox({ items: [oTile] }).addStyleClass("productTile"));
            }
        },

        updateImage: function () {
            var oImage = this.byId("currentImage");
            oImage.setSrc(this.imagePaths[this.currentIndex]);
        },

        onNextImagePress: function () {
            this.currentIndex = (this.currentIndex + 1) % this.imagePaths.length;
            this.updateImage();
        },

        onPrevImagePress: function () {
            this.currentIndex = (this.currentIndex - 1 + this.imagePaths.length) % this.imagePaths.length;
            this.updateImage();
        },

        onHome: function () {
            var page = this.byId("iconTabBar");
            page.setSelectedKey("home");
            var contentArea = this.byId("mainContainer");
            contentArea.scrollTo(0);
        },

        notifications: function () {
            MessageToast.show("Login to Access");
        },

        onLogo: function () {
            MessageToast.show("Already in Home page");
        },

        onIconTabSelect: function (oEvent) {
            var key = oEvent.getParameter("key");
            var contentArea = this.byId("mainContainer");

            switch (key) {
                case "home":
                    contentArea.scrollTo(0);
                    break;
                case "products":
                    var productTilesContainer = this.byId("productTilesContainer1"); // Example: Adjust to your container
                    if (productTilesContainer) {
                        contentArea.scrollToElement(productTilesContainer); // Scroll to the container element
                    }
                    break;
                case "contact":
                    var contactDetails = this.byId("contactDetails"); // Example: Adjust to your contact details section
                    if (contactDetails) {
                        contentArea.scrollToElement(contactDetails); // Scroll to the contact details section
                    }
                    break;
                default:
                    break;
            }
        },

        onLoginPress: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("View2"); // Navigate to View2 route
        },

        onTheme: function () {
            var currentTheme = sap.ui.getCore().getConfiguration().getTheme();
            var newTheme = currentTheme === "sap_horizon" ? "sap_horizon_dark" : "sap_horizon";
            sap.ui.getCore().applyTheme(newTheme);
        },

        onProductPress: function (oEvent) {
            MessageToast.show("Login to place order");
        }
    });
});
