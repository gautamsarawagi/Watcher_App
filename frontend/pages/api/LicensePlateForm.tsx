import axios from "axios"

export const getALLlicense_data = () => {
    return fetch("http://127.0.0.1:8000/license'")
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
}