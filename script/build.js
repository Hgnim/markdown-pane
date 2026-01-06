import fs from 'fs';
import { minify } from 'terser';

//const args = process.argv.slice(2);

try {
    console.log('开始构建……');

    while (true) {
        if (!fs.existsSync('dist')) {
            fs.mkdirSync('dist', { recursive: true });
            break;
        } else {
            fs.rmSync('dist', { recursive: true, force: true });
        }
    }
    fs.copyFileSync('src/index.js', 'dist/index.js');

    if (!fs.existsSync('dist/bin')) {
        fs.mkdirSync('dist/bin', { recursive: true });
    }
    fs.copyFileSync('src/cli.js', 'dist/bin/cli.js');


    console.log('压缩文件中……');

    {
        const minified = await minify(fs.readFileSync('src/index.js', 'utf8'), {
            compress: {
                drop_console: false,
                drop_debugger: true
            },
            mangle: {
                toplevel: true
            }
        });
        fs.writeFileSync('dist/index.min.js', minified.code);
    }

    console.log('构建完成。');
} catch (err) {
    console.error('构建失败，错误：', err);
    process.exit(1);
}