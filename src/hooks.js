import { useState, useEffect } from 'react';
import axios from 'axios';

const useFlip = (initialState = true) => {
	const [ state, setState ] = useState(initialState);
	const toggleState = () => {
		setState((state) => !state);
	};
	return [ state, toggleState ];
};

const useAxios = (keyInLS, baseUrl) => {
	const [ responses, setResponses ] = useLocalStorage(keyInLS);

	const addResponses = async (formatter = (data) => data, restOfUrl = '') => {
		const response = await axios.get(`${baseUrl}${restOfUrl}`);
		setResponses((data) => [ ...data, formatter(response.data) ]);
	};

	const clearResponses = () => setResponses([]);

	return [ responses, addResponses, clearResponses ];
};

const useLocalStorage = (key, initialValue = []) => {
	if (localStorage.getItem(key)) {
		initialValue = JSON.parse(localStorage.getItem(key));
	}
	const [ value, setValue ] = useState(initialValue);

	useEffect(
		() => {
			localStorage.setItem(key, JSON.stringify(value));
		},
		[ value, key ]
	);

	return [ value, setValue ];
};

export { useFlip, useAxios, useLocalStorage };
