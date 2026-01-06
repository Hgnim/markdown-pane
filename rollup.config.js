import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
    {
        input: 'src/index.js',
        output: {
            file: 'dist/index.js',//使用npm时加载的文件，自动处理依赖包
            format: 'es',
            exports: 'named',
        },
        plugins: [
            nodeResolve(),
        ],
        external: (id) => id.includes('node_modules'),//使用匹配，代替手动维护：['marked'],
    },
    {
        input: 'src/index.js',
        output: {
            file: 'dist/markpane.esm.js',//用于cdn等直接加载的文件，包含所有依赖。现代化ES模块
            format: 'es',
            exports: 'named',
        },
        plugins: [
            nodeResolve(),
        ],
    },
    {
        input: 'src/index.js',
        output: {
            file: 'dist/markpane.esm.min.js',//压缩版
            format: 'es',
            exports: 'named',
        },
        plugins: [
            nodeResolve(),
            terser(),
        ],
    },
    {
        input: 'src/umd-entry.js',
        output: {
            file: 'dist/markpane.umd.js',//用于cdn等直接加载的文件，包含所有依赖。UMD模块，用于浏览器直接加载
            format: 'umd',
            name: 'markpane',
            exports: 'default',
        },
        plugins: [
            nodeResolve({
                browser: true,
                preferBuiltins: false,
            }),
        ],
    },
    {
        input: 'src/umd-entry.js',
        output: {
            file: 'dist/markpane.umd.min.js',//压缩版
            format: 'umd',
            name: 'markpane',
            exports: 'default',
        },
        plugins: [
            nodeResolve({
                browser: true,
                preferBuiltins: false,
            }),
            terser(),
        ],
    },
    /*{
        input: 'src/index.js',
        output: {
            file: 'dist/index.cjs.js',//CommonJS版本，供Node.js等使用，目前暂无使用场景
            format: 'cjs',
            exports: 'named',
        },
        plugins: [
            nodeResolve(),
        ],
    },
    {
        input: 'src/index.js',
        output: {
            file: 'dist/index.cjs.min.js',
            format: 'cjs',
            exports: 'named',
        },
        plugins: [
            nodeResolve(),
            terser(),
        ],
    },*/
];