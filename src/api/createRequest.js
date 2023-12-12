export const createRequest = async (options) => {
    const {url, sendMethod, id, post, callback} = options;

    if (sendMethod === 'GET') {
        try {
            const response = await fetch(url);
            console.log(response);
            const data = await response.json();
            console.log(data);
            if (response.ok === true) {
                callback(data);
            }
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }
    }
    else if (sendMethod === 'PUT') {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
            if (response.ok === true) {
                callback(response);
            }
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }
    }
    else if (sendMethod === 'POST') {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
            if (response.ok === true) {
                callback(response);
            }
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }
    }
    else if (sendMethod === 'DELETE') {
        try {
            const response = await fetch(url, {method: 'DELETE'});
            console.log(response);
            if (response.ok === true) {
                callback(response);
            }
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }
    }
}