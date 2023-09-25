module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:vue/vue3-essential'
	],
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'vue'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'vue/script-setup-uses-vars': 'error',
		'vue/order-in-components': [
			'error',
			{
				order: [
					'name',
					'extends',
					'mixins',
					'components',
					'directives',
					'filters',
					'props',
					'propsData',
					'data',
					'computed',
					'methods',
					'LIFECYCLE_HOOKS',
					'watch',
					'setup',
				],
			},
		],
	}
};
