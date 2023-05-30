export function getArrayFirstIndex(value: any) {
	if (Array.isArray(value)) {
		value = value[0];
	}

	return value;
}

export function getCatchError(error: any): any {
	if (error.response && error.response.data) {
		error = error.response.data;
	}

	if (error.message == 'Network Error') {
		error.message = 'Bad Gateway. Check koneksi internet';
	}

	return error; 
}

export function getResponseError(error: any): any {
	if (error.message == 'Network Error') {
		error.message = 'Bad Gateway. Check koneksi internet';
	}

	return error; 
}

export function isEven(value: number): boolean {
	return value % 2 === 0;
}

export function isValidHttpUrl(value: any): boolean {
	try {
		new URL(value);
	}
	catch (error) {
		return false;
	}

	return true;
}

export function setCapitalize(value: string): string {
	var splitStr = value.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(' ');
}

export function setGender(value: string): string {
	if (value.toLowerCase() == 'laki laki') {
		value = 'male';
	}
	else if (value.toLowerCase() == 'perempuan') {
		value = 'female';
	}
	else {
		value = '';
	}

	return value;
}

export function setJenisKelamin(value: string): string {
	if (value.toLowerCase() == 'male') {
		value = 'Laki Laki';
	}
	else if (value.toLowerCase() == 'female') {
		value = 'Perempuan';
	}
	else {
		value = '';
	}

	return value;
}