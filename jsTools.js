
const fetchApi = function (url, data, method="POST"){
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open(method, url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(data));
        xhttp.onload = function (){
            if (xhttp.status >= 200 && xhttp.status < 300) {
                try {
                    resolve(JSON.parse(xhttp.responseText));
                } catch (error) {
                    resolve(xhttp.responseText);
                }
            } else {
                reject({
                    status: xhttp.status,
                    statusText: xhttp.statusText
                });
            }
        };
        xhttp.onerror = function () {
            reject({
                status: xhttp.status,
                statusText: xhttp.statusText
            });
        };
    })
};

const formToJson = function (formId){
    const data = new FormData(document.getElementById(formId)); 
    return Object.fromEntries(data.entries());
}

const jsonToForm = function (formId, data){
    for ( let key in data ) {
        try {
            document.forms[formId].elements[key].value = data[key];
        } catch (error) {
            // console.log(error);
        }
    }
}
