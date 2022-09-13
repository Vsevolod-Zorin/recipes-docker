/**
@params data = {
     company: ['porsche-design', 'rodenstock'],
     category: ['sun_glasses'],
}

@return  qery = {
    company: {$in: ['porsche-design', 'rodenstock']},
    category: {$in: ['sun_glasses']},
}
*/
export const convertSearchConfigToQueryConfig = data => {
	const res = {};

	let keys = Object.keys(data);
	for (let i = 0; i < keys.length; i++) {
		if (data[keys[i]].length !== 0) {
			res[keys[i]] = { $in: data[keys[i]] };
		}
	}
	return res;
};
