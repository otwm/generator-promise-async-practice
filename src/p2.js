function makeAjaxCall(url, cb) {
    console.log(url);
    console.log('sending');
    setTimeout(() => {
        const result = '{"firstName":"John", "value":"Doe"}';
        cb(result);
        console.log('end');
    }, 1000);
}

const request = (url) => {
    makeAjaxCall(url, (response) => {
        it.next(response);
    });
};

function *main() {
    let result1 = yield request("http://some.url.1");
    let data = JSON.parse( result1);

    let result2 = yield request("http://some.url.2/?id=" + data.id)
    let resp = JSON.parse( result2);

    console.log("The value you asked for: " + resp.value);
}

let it = main();
it.next();