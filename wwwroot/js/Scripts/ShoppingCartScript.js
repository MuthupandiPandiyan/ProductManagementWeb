$(document).ready(function () {
    renderCartData();
});

function renderCartData() {
    var myCartData = getMyCartData();
    if (!myCartData) {
        //no data
    }
    else {

        var mycartTable = $("#MyCartTblBody");
        $(mycartTable).empty();
        JSON.parse(myCartData).forEach((x, y) => {
            $(mycartTable).append(`<tr >
            <td>${y + 1}</td>
            <td>${x.name}</td>
            <td> <input inp-prod-id="${x.productID}" class="form-control" type="text" value=${x.qty} readonly/>  </td>
            <td>${parseFloat(x.price).toFixed(2)}</td >
            <td>${(parseFloat(x.price) * parseFloat(x.qty)).toFixed(2)}</td>
         
        </tr>`);
        });

    }
}

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