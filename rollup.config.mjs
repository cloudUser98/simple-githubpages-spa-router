// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';

export default {
	input: 'index.js',
	output: {
		file: 'bundle.js',
		format: 'es'
	},
    plugins: [resolve()]
};
