function makeAjaxCall(url, cb) {
    console.log(url);
    console.log('sending');
    setTimeout(() => {
        const result = '{"firstName":"John", "value":"Doe"}';
        cb(result);
        console.log('end');
    }, 1000);
}

makeAjaxCall("http://some.url.1", function (result1) {
    var data = JSON.parse(result1);

    makeAjaxCall("http://some.url.2/?id=" + data.id, function (result2) {
        var resp = JSON.parse(result2);
        console.log("The value you asked for: " + resp.value);
    });
});