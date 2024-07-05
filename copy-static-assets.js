const fs = require('fs');
const path = require('path');
const copyFolderRecursiveSync = (source, target) => {
    const targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }
    if (fs.lstatSync(source).isDirectory()) {
        fs.readdirSync(source).forEach((file) => {
            const curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            }
            else {
                fs.copyFileSync(curSource, path.join(targetFolder, file));
            }
        });
    }
};
const sourceDir = path.resolve(__dirname, 'src/templates');
const targetDir = path.resolve(__dirname, 'dist');
copyFolderRecursiveSync(sourceDir, targetDir);
const sourceDirB = path.resolve(__dirname, 'src/public');
const targetDirB = path.resolve(__dirname, 'dist');
copyFolderRecursiveSync(sourceDirB, targetDirB);