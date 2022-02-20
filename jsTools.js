
const fetchApi = function(url, data, method="POST"){
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open(method, url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(data));
        xhttp.onload = function() {
            let res = JSON.parse(xhttp.responseText);
            resolve(res);
        };
    })
};

const formToJson = function (formId){
    const data = new FormData(document.getElementById(formId)); 
    return Object.fromEntries(data.entries());
}
