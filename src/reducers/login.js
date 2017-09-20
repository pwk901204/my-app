
let defaultState = {
	loading: false,
}

const login = (state = defaultState, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				loading: true,
			}
		default:
			return state
	}
}

export default login;
