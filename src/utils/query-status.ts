export const queryStatus = (status: string | undefined) => {
	if (status === 'active') {
		return true
	} else if (status === 'inactive') {
		return false
	}

	return undefined
}
