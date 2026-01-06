#!/usr/bin/env node

import fs from 'fs';
import markpane from '../index.js';
import path from 'path';

const [, , command, filePath] = process.argv;

function showHelp() {
    console.log(`
Markpane CLI - Multi-panel Markdown document parser

Usage:
  mdp parse [file.mdp]     parse and return string
  mdp parseJson [file.mdp] parse and return JSON
  mdp --help               show help
  `);
}

function doParse(filePath,isJson) {
    if (!fs.existsSync(filePath)) {
        console.error(`error: file not found ${filePath}`);
        process.exit(1);
    }

    const content = fs.readFileSync(path.resolve(filePath), 'utf8');

    if (isJson) console.log(JSON.stringify(markpane.parseJson(content), null, 2));
    else console.log(markpane.parse(content));
}

switch (command) {
    case 'parse':
    case 'parseJson':
        if (!filePath) {
            console.error('error: not have file path');
            process.exit(1);
        }
        doParse(filePath,command==='parseJson');
        break;
    case '--help':
    case '-h':
    case 'help':
    case undefined:
        showHelp();
        break;
    default:
        console.error(`command not found: ${command}`);
        showHelp();
        process.exit(1);
}