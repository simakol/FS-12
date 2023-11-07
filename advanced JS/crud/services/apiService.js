const BASE_URL = "https://65411cb8f0b8287df1fdd3be.mockapi.io";
const ENDPOINT = "cars";

function createNewCar(carObj) {
  console.log("POST: \n\tvalue:", carObj);
  //   return fetch(`${BASE_URL}/${ENDPOINT}`, {
  //     method: "POST", // вказуємо HTTP-метод
  //     body: JSON.stringify(carObj), // передаємо дані у форматі JSON,
  //     headers: {
  //       //хедер(заголовки) - це технічна інформація для серверу
  //       "Content-Type": "application/json", // це заголовок який вказує у якому форматі передаються дані на сервер, зараз ми вручну вказали що це буде формат JSON
  //     },
  //   });

  return axios.post(`${BASE_URL}/${ENDPOINT}`, carObj);
}

async function getAllCars() {
  return (await axios.get(`${BASE_URL}/${ENDPOINT}`)).data;
}

export { createNewCar, getAllCars };
