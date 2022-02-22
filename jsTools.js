
const fetchApi = function (url, data, method="POST"){
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open(method, url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(data));
        xhttp.onload = function() {
            const result = JSON.parse(xhttp.responseText);
            resolve(result);
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
