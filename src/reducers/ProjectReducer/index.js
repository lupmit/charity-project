import types from "./types";

const initialState = {
	isLoading: false,
	items: [],
	errorMessage: null,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case types.DATA_FETCH_STARTED:
			return {
				...state,
				isLoading: true,
				errorMessage: null,
			};

		case types.DATA_FETCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: action.data,
			};

		case types.DATA_FETCH_FAILED:
			return {
				...state,
				isLoading: false,
				errorMessage: action.error,
			};
		default:
			return state;
	}
}
