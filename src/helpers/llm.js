
const url = 'http://127.0.0.1:3001/query';

const predict = async function(params) {

    const body = {
        instruction:'predict',
        payload: {prompt:prompt},
    }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
}

export {
    predict
}
