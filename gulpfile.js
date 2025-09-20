const { src, dest } = require('gulp');

function buildIcons() {
	return src('.n8n/custom/*/*.svg')
		.pipe(dest('dist/.n8n/custom/'));
}

exports['build:icons'] = buildIcons;
