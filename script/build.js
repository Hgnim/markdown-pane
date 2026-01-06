import fs from 'fs';
import { rollup } from 'rollup';
import rollupConfig from '../rollup.config.js';

//const args = process.argv.slice(2);

try {
    console.log('开始构建：');

    while (true) {
        if (!fs.existsSync('dist')) {
            fs.mkdirSync('dist', { recursive: true });
            break;
        } else {
            fs.rmSync('dist', { recursive: true, force: true });
        }
    }

    console.log('复制文件中……');

    fs.copyFileSync('src/types.d.ts', 'dist/types.d.ts');

    if (!fs.existsSync('dist/bin')) {
        fs.mkdirSync('dist/bin', { recursive: true });
    }
    fs.copyFileSync('src/cli/cli.js', 'dist/bin/cli.js');

    console.log('完成。');

    console.log('构建文件中……');

    for(const config of rollupConfig){
        const bundle = await rollup(config);
        await bundle.write(config.output);
        await bundle.close();
    }

    console.log('完成。');

    console.log('构建完成。');
} catch (err) {
    console.error('构建失败，错误：', err);
    process.exit(1);
}