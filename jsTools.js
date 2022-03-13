
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
            const inputElement = document.forms[formId].elements[key];
            if(inputElement.type === 'checkbox')
                inputElement.checked = !!Number(data[key]);
            else
                inputElement.value = data[key];
        } catch (error) {
            // console.log(error);
        }
    }
}

const checkNationalCode = function(code) {
    if (code === null || code === "" || code.length !== 10)
        return false;
    
    if (
        code == '0000000000' ||
        code == '1111111111' ||
        code == '2222222222' ||
        code == '3333333333' ||
        code == '4444444444' ||
        code == '5555555555' ||
        code == '6666666666' ||
        code == '7777777777' ||
        code == '8888888888' ||
        code == '9999999999')
        return false;
    
    let sum = 0;
    for (let i = 0; i < 9; i++)
        sum += parseInt(code[i]) * (10 - i);
    
    sum = (sum % 11);
    if (sum >= 2)
        sum = 11 - sum;
    if (sum == code.substr(9, 1))
        return true;

    return false;          
}
