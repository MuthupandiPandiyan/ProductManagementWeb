$(document).ready(function () {
    getProductDetails();
});

function getProductDetails() {
    _Ajax("get", "/products/productdetails", "", "json", "application/json", getProductDetailsSuccess, null, true, false);
}

function getProductDetailsSuccess(result) {

    if (result.length > 0) {

        var productTable = $("#ProductTblBody");
        $(productTable).empty();
        result.forEach((x, y) => {
            $(productTable).append(`<tr >
            <td>${x.id}</td>
            <td>${x.name}</td>
            <td>${x.description}</td>
            <td>${x.price.toFixed(2)}</td>
            <td>${x.quantity} </td>               
            <td><button type="button" class="btn btn-primary" edit-prod-id=${x.id}>Edit</button> </td>
            <td><button type="button" class="btn btn-warning" del-product-id=${x.id}>Delete</button></td>
        </tr>`);
        });
    }
    else {
        $("#ProductTable").html(` <div style="text-align:center;padding:10px;" > <h3>No Data Found</h3> </div>`);
    }
}



$(document).on("click", "[del-product-id]", function () {
    var productID = $(this).attr("del-product-id");
    _Ajax("post", "/products/deleteconfirmed?id=" + productID, "", "", "application/json", function () {
        var cartCookie = getMyCartData();
        var newCart;
        var cartData = (cartCookie) ? JSON.parse(cartCookie) : [];
        if (cartData.length > 0) {          
             newCart = cartData.filter(x => {
                if (parseInt(x.productID) !== parseInt(productID)) {
                    return x;
                }
            });
        }
        if (newCart) {
            
            document.cookie = "cart" + "=" + JSON.stringify(newCart) + "" + "; path=/";
        }
        getProductDetails();
    }, null, true, false);
});
$(document).on("click", "[edit-prod-id]", function () {
    var productID = $(this).attr("edit-prod-id");
    _Ajax("get", "/products/geteditdetails", { id: productID }, "", "application/json", editProdSuccess, null, true, false);

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
function editProdSuccess(result) {
    $('#productIdEdit').val(result.id);
    $('#nameIdEdit').val(result.name);
    $('#descriptionTdEdit').val(result.description);
    $('#priceIdEdit').val(result.price);
    $('#quantityIdEdit').val(result.quantity);
    $('#ProductUpdateModal').show();
}

function ProductModalFunc() {
    $("#ProductModal input").val("");
    $('#ProductModal').show();
}

function saveProdDetails() {
    var name = $('#nameId').val();
    var desc = $('#descriptionTd').val();
    var price = $('#priceId').val();
    var qty = $('#quantityId').val();

    _Ajax("post", "/products/createdata", { Name: name, Description: desc, Price: price, Quantity: qty }, "", "application/json", addProdSuccess, null, true, false);

}
function addProdSuccess() {
    alert("Saved Successfully");
    getProductDetails();
    $("#ProductModal input").val("");
    $("#ProductModal textarea").val("");
    $("#ProductModal").hide();
}
function updateProdDetails() {
    var id = $('#productIdEdit').val();
    var name = $('#nameIdEdit').val();
    var desc = $('#descriptionTdEdit').val();
    var price = $('#priceIdEdit').val();
    var qty = $('#quantityIdEdit').val();
    var updateProduct = {
        ID: id,
        Name: name,
        Description: desc,
        Price: price,
        Quantity: qty
    }
    _Ajax("post", "/products/updatedata", JSON.stringify(updateProduct), "", "application/json", updateProdSuccess, null, true, false);


}
function updateProdSuccess() {
    alert("Updated Successfully");
    getProductDetails();
    $("#ProductUpdateModal input").val("");
    $("#ProductUpdateModal textarea").val("");
    $("#ProductUpdateModal").hide();
}
