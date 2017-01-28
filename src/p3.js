/**
 * ajax
 * @param url
 * @param cb
 */
function makeAjaxCall(url, cb) {
    console.log(url);
    console.log('sending');
    setTimeout(() => {
        console.log('returned');
        const result = '{"firstName":"John", "value":"Doe", "id":5}';
        cb(null,result);
        console.log('end');
    }, 100);
}

/**
 * 요청
 * @param url
 * @returns {Promise}
 */
const request = (url) => {
    console.log('step request');
    return new Promise((resolve, reject) => {
        console.log('promise in');
        makeAjaxCall(url, (err, text) => {
            console.log('ajax!');
            if (err) reject(err);
            else resolve(text);
        });
    });
};

/**
 * 제너레이터 돌리기
 * @param g
 */
function runGenerator(g) {
    console.log('start');
    var it = g(), ret;

    // asynchronously iterate over generator
    (function iterate(val) {
        ret = it.next(val);

        if (!ret.done) {
            // poor man's "is it a promise?" test
            if ("then" in ret.value) {
                // wait on the promise
                console.log(iterate);
                ret.value.then(iterate);
            }
            // immediate value: just send right back in
            else {
                // avoid synchronous recursion
                setTimeout(function () {
                    iterate(ret.value);
                }, 0);
            }
        }
    })();
}

/**
 * 프로세스 정의
 */
runGenerator(function *main() {
    try {
        console.log('step1');
        var result1 = yield request("http://some.url.1");
    } catch (err) {
        console.log("error : " + err);
        return;
    }
    console.log('step2');
    var data = JSON.parse(result1);
    console.log('step3');
    try {
        var result2 = yield request("http://some.url.2/?id=" + data.id);
        console.log('step4');
    } catch (err) {
        console.log("error : " + err);
        return;
    }
    console.log('step5');
    var resp = JSON.parse(result2);
    console.log("The value you asked for: " + resp.value);
});
