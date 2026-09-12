const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(
      `Request to ${url} failed with status ${response.status}: ${response.statusText}`
    );
  }
  return await response.json();
};

const testCreateUser = async () => {
  try {
    const user = {
      name: 'John Doe',
      job: 'Developer',
    };
    const url = 'https://reqres.in/api/users';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1',
      },
      body: JSON.stringify(user),
    };
    const userData = await fetchData(url, options);
    console.log(userData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const testFailingRequest = async () => {
  try {
    const data = await fetchData('https://reqres.in/api/unknown/23', {
      headers: { 'x-api-key': 'reqres-free-v1' },
    });
    console.log(data);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

testCreateUser();
testFailingRequest();