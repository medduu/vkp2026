const options = {
  headers: {
    'x-api-key': 'reqres-free-v1',
  },
};

const getUser = async () => {
  try {
    const response = await fetch('https://reqres.in/api/users/1', options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

getUser();