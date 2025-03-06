import { showAlert } from "./showAlert.js";

const BASE_URL ='https:/dog.ceo/api/breeds';
const fetchData = async(path)=>{
    try {
        
        const res = await fetch(`${BASE_URL}/${path}`)
        if(!res.ok){
            showAlert('Error fetching data')
        }
        const data = await res.json();

        return data

    } catch (error) {
     showAlert(error.message)   
    }
}

export default fetchData