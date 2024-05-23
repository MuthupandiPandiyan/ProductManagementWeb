$(document).ready(function () {
    getProductDetails();
});

function getProductDetails() {
    _Ajax("get", "/products/productdetails", "", "json", "application/json", getProductDetailsSuccess, null, true, false);
}

function getProductDetailsSuccess(result) {
    console.log(result);
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
            <td><a edit-prod-id=${x.id}>Edit</a> </td>
            <td><a del-product-id=${x.id}>Delete</a></td>
        </tr>`);
        });
    }
    else {
        $("#ProductTable").html(` <div style="text-align:center;padding:10px;" > <h3>No Data Found</h3> </div>`);
    }
}


$(document).on("click", "[del-product-id]", function () {
    var productID = $(this).attr("del-product-id");
    _Ajax("post", "/products/deleteconfirmed", { id: productID }, "", "application/json", deleteProdSuccess, null, true, false);
});

function deleteProdSuccess() {
    getProductDetails();
}

$(document).on("keypress", "[inp-prod-id]", function (e) {
    var charCode = (e.which) ? e.which : event.keyCode
    if (String.fromCharCode(charCode).match(/[^0-9]/g))
        return false;
});





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
    //var PriceList_Add = [];

    //var fd = $('#FromDateID').val();
    //var td = $('#ToDateID').val();
    //var CurrencyID = $("#CurrencyId").val();
    //var BPCategoryID = $("#BpCategoryI").val();
}

function saveProdDetails() {
    var id=$('#productId').val();
    var name= $('#nameId').val();
    var desc = $('#descriptionTd').val();
    var price = $('#priceId').val();
    var qty = $('#quantityId').val();
   
    _Ajax("post", "/products/createdata", { Name: name, Description: desc, Price: price, Quantity: qty}, "", "application/json", addProdSuccess, null, true, false);

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
