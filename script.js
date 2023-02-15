// Unplash Api

const count = 30;
const apiKey = "NpICOgrphwY_dqZx6EbQVhC3iB8GOUGCJgdwDfUeaGQ";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

async function getPhotosFromApi() {
  const response = await fetch(apiUrl);

  const data = await response.json();

  console.log(data);
}

getPhotosFromApi();
