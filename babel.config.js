module.exports = api => {
	api.cache.forever();

	return {
		presets: [
			["@babel/preset-env", {
				targets: {
					node: "current"
				}
			}]
		]
	};
};
