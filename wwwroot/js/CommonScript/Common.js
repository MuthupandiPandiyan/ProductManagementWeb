function _Ajax(httpMethod, url, data, datatype, content_type, successCallBack, errorCallBack, async, cache) {

    if (typeof async === "undefined") {
        async = true;
    }

    if (typeof content_type === "undefined") {
        content_type = "application/json";
    }

    if (typeof datatype === "undefined") {
        datatype = "json";
    }


    if (typeof cache === "undefined") {
        cache = false;
    }

    if (httpMethod.toUpperCase() === "POST") {
        if (data !== null && data !== undefined) {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }
        }
    }

    var ajaxObj = $.ajax({
        type: httpMethod.toUpperCase(),
        url: url,
        data: data,
        dataType: datatype,
        headers: {
            'Content-Type': content_type
        },
        async: async,
        cache: cache,
        success: function (data) {
            successCallBack(data);
        },
        error: function (err, type, httpStatus) {
            console.log(err);
        }
    });

    return ajaxObj;
};