const error = document.querySelector("#error");
const modalContent = document.querySelector("p");

const showAlert = (text)=>{
    modalContent.innerText = text;
    error.style.display = "flex";
}

const removeAlert = ()=>{
        error.style.display = "none";
}

export {showAlert, removeAlert}