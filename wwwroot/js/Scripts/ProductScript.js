var ProductData = [];
$(document).ready(function () {
    getProductList();
});


function getProductList() {
    _Ajax("get", "/products/productdetails", "", "json", "application/json", getProductListSuccess, null, true, false);
}

$(document).on("keyup", "#search", function () {
    var currentSearchQuery = $(this).val();
    var matchedData = ProductData.filter(x => {
        if (x.name.toLocaleLowerCase().indexOf(currentSearchQuery.toLocaleLowerCase()) != -1) {
            return x;
        }
    });

    if (matchedData) {
        renderProductData(matchedData);
    }

});


function getProductListSuccess(result) {


    ProductData = result;

    if (result.length > 0) {
        renderProductData(result);

    }
    else {
        $("#ProductList").html(`<div style="text-align:center;padding:10px;" > <h3>No Data Found</h3> </div>`);
    }
}

function renderProductData(result) {
    var prodListDiv = $("#ProductList");
    $(prodListDiv).empty();
    result.forEach((x, y) => {
        $(prodListDiv).append(`<div class="col-sm-3" style="padding:10px;text-align: center;">
        <div class="box-shadow"  style="display: grid; ">
            <div style="text-align:center;">
                <h4>${x.name}</h4>
            </div>           
            <div style="padding: 10px;">
                <p>${x.description}</p>
            </div>
             <div style="text-align:center;">
                <h4>$${x.price.toFixed(2)}</h4>
            </div>
            <div style="padding: 10px;justify-content: center; display: flex;">
                <button price=${x.price} product-id=${x.id}  prd-name=${x.name} class="btn btn-warning">Add To Cart</button>
            </div>
        </div>
    </div>`);
    });
}

$(document).on("click", "[product-id]", function () {
    var productID = $(this).attr("product-id");
    $("[addcart-product-id]").attr("addcart-product-id", productID);

    var price = $(this).attr("price");

    var name = $(this).attr("prd-name");
    $("[addcart-product-id]").attr("addcart-product-name", name);
    var cartCookie = getMyCartData();

    var cartData = (cartCookie) ? JSON.parse(cartCookie) : [];

    var existingData = cartData.filter(x => {
        if (parseInt(x.productID) === parseInt(productID)) {
            return x;
        }
    });

    $("#CartQty").val(existingData.length === 0 ? "" : existingData[0].qty);

    $("[addcart-product-id]").attr("add-cart-price", price);
    $("#quantityModal").modal("show");
});

$(document).on("click", "[addcart-product-id]", function () {
    var productID = $(this).attr("addcart-product-id");
    var price = $(this).attr("add-cart-price");
    var name = $(this).attr("addcart-product-name");
    var qty = $("#CartQty").val();
    if (qty > 0) {

        var cartCookie = getMyCartData();
        var cartData = (cartCookie) ? JSON.parse(cartCookie) : [];
        var existingData = cartData.filter(x => {
            if (parseInt(x.productID) === parseInt(productID)) {
                return x;
            }
        });

        if (existingData.length > 0) {
            cartData.forEach((element, idx) => {
                if (parseInt(element.productID) === parseInt(productID)) {
                    element.qty = qty;
                }
            });
        }
        else {
            cartData.push({
                productID: productID,
                price: price,
                qty: qty,
                name: name
            });
        }
     
        document.cookie = "cart" + "=" + JSON.stringify(cartData) + "" + "; path=/";

        $('#quantityModal').modal('toggle');

    }
    else {
        alert("Add Some Quantity");
    }
});


function getMyCartData() {
    var nameEQ = "cart" + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
}