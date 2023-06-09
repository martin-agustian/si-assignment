export function clearIDR(value) {
	if (value) {
		value = value.replaceAll('Rp ', '');
		value = value.replaceAll('.', '');		
		value = value.replaceAll(',', '.');
		// value = Math.round(value);
	}

	return value;
}

export function getArrayFirstIndex(value) {
	if (Array.isArray(value)) {
		value = value[0];
	}

	return value;
}

export function getCatchError(error) {
	if (error.response && error.response.data) {
		error = error.response.data;
	}

	if (error.message == 'Network Error') {
		error.message = 'Bad Gateway. Check koneksi internet';
	}

	return error; 
}

export function getResponseError(error) {
	if (error.message == 'Network Error') {
		error.message = 'Bad Gateway. Check koneksi internet';
	}

	return error; 
}

export function isEven(value) {
	return value % 2 === 0;
}

export function isValidHttpUrl(value) {
	try {
		new URL(value);
	}
	catch (error) {
		return false;
	}

	return true;
}

export function setCapitalize(value) {
	var splitStr = value.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(' ');
}

export function setCapitalizeFirstLetter(value) {
	return value[0].toUpperCase() + value.slice(1);
}

export function setIDR(number) {
	if (number || number == 0) {
		number = number.toString().replaceAll('.', ',');
		return 'Rp ' + number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	}
	else return number;
}

export function setGender(value) {
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

export function setJenisKelamin(value) {
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