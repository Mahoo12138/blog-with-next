// import { Action } from "@reduxjs/toolkit"
import { SET_HEADER_TITLE } from "./actions"

type GeneralState = {
	headerTitle: string
}

const GeneralInitialState: GeneralState = {
	headerTitle: "Mahoo Blog",
}

type SetHeaderTitleAction = {
	type: typeof SET_HEADER_TITLE
	payload: {
		title: string
	}
}

type GeneralActions = SetHeaderTitleAction

const generalReducer = (
	state = GeneralInitialState,
	action: GeneralActions
): typeof GeneralInitialState => {
	switch (action.type) {
		case SET_HEADER_TITLE:
			return {
				...state,
				headerTitle: action.payload.title,
			}
		default:
			return state
	}
}

export default generalReducer
