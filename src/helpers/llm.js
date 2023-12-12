
const url = 'http://127.0.0.1:3001/query';

const predict = async function(prompt) {

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
    return Promise.resolve({error:1, payload:error})
  }
}

export {
    predict
}
