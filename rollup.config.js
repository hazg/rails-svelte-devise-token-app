import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import svelte from "rollup-plugin-svelte"
import livereload from "rollup-plugin-livereload"
import { terser } from "rollup-plugin-terser"
import css from "rollup-plugin-css-only"
import del from 'rollup-plugin-delete'
import sveltePreprocess from 'svelte-preprocess'
import uglify from "rollup-plugin-uglify-es"
import visualizer from 'rollup-plugin-visualizer'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'


const production = !process.env.ROLLUP_WATCH

export default {

	input: "app/javascript/bundle.js",
	perf: true,
	cache: !production,
	treeshake: production,
	output: {
		sourcemap: !production,
		format: "esm",
		name: "app",
		dir: "public/packs",
	},
	preserveEntrySignatures: 'struct',
	plugins: [
		del({ targets: 'public/packs/*.(js|map)' }),
		json(),
		svelte({
			onwarn: (warning, handler) => {
				const { code, frame, filename } = warning
				// Skip app.svelte because bootstrap
				if (code === "css-unused-selector" && filename == 'app/javascript/app.svelte') {
					return;
				}
				handler(warning)
			},
			compilerOptions: {
				dev: !production,
			},
			emitCss: true,
			preprocess: sveltePreprocess({ /* options */ }),
		}),
    resolve({
      extensions: ['.svelte', '.js'],
			preferBuiltins: false,
			browser: true,
			dedupe: importee =>
				importee === "svelte" || importee.startsWith("svelte/"),
		}),
		replace({
			preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(
				production ? 'production' : 'development'
       )
    }),
		commonjs(/*{ sourceMap: false }*/),
		css({ output: 'bundle.css' }),
		production && uglify(),
		production && terser(),
		!production && livereload({ watch: './public/packs' }),
		production && visualizer({
			filename: 'public/stats.html',
			template: 'treemap',
			open: true,
		}),
	],
	watch: {
		clearScreen: true,
	},
}