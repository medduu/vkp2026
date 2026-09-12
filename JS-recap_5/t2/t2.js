const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'reqres-free-v1',
  },
  body: JSON.stringify({
    name: 'John Doe',
    job: 'Developer',
  }),
};

const postUser = async () => {
  try {
    const response = await fetch('https://reqres.in/api/users', options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

postUser();