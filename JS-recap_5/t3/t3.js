const apiKeyHeader = {
  'x-api-key': 'reqres-free-v1',
};

const getUnknown = async () => {
  try {
    const response = await fetch('https://reqres.in/api/unknown/23', {
      headers: apiKeyHeader,
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('GET success:', data);
  } catch (error) {
    console.error('GET failed:', error.message);
  }
};

const postUnknown = async () => {
  try {
    const response = await fetch('https://reqres.in/api/unknown/23', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...apiKeyHeader },
      body: JSON.stringify({ name: 'Test' }),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('POST success:', data);
  } catch (error) {
    console.error('POST failed:', error.message);
  }
};

const putUnknown = async () => {
  try {
    const response = await fetch('https://reqres.in/api/unknown/23', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...apiKeyHeader },
      body: JSON.stringify({ name: 'Test' }),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('PUT success:', data);
  } catch (error) {
    console.error('PUT failed:', error.message);
  }
};

const deleteUnknown = async () => {
  try {
    const response = await fetch('https://reqres.in/api/unknown/23', {
      method: 'DELETE',
      headers: apiKeyHeader,
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    console.log('DELETE success, status:', response.status);
  } catch (error) {
    console.error('DELETE failed:', error.message);
  }
};

getUnknown();
postUnknown();
putUnknown();
deleteUnknown();