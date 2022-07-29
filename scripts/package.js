/* Manage updates of major, minor, and patch releases of the package per https://semver.org/  */
const { exec } = require('child_process');
const fs = require('fs');
const file = require('../package.json');

exec('npm view noob-ethereum version', (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }

  if (file.version === stdout.trim()) {
    switch (process.argv[2]) {
      case 'patch':
      default: {
        const arr = file.version.split('.');
        arr[2] = parseInt(arr[2]) + 1;
        const updated = arr.join('.');
        file.version = updated;
        updateType = 'PATCH';
        break;
      }

      case 'minor': {
        const arr = file.version.split('.');
        arr[1] = parseInt(arr[1]) + 1;
        const updated = arr.join('.');
        file.version = updated;
        updateType = 'MINOR';
        break;
      }

      case 'major': {
        const arr = file.version.split('.');
        arr[0] = parseInt(arr[0]) + 1;
        const updated = arr.join('.');
        file.version = updated;
        updateType = 'MAJOR';
        break;
      }
    }

    const json = JSON.stringify(file);
    const dir = process.cwd();

    fs.writeFile(`${dir}/package.json`, json, (err) => {
      if (err) {
        console.log(`Error updating package.json`, err);
      } else {
        console.log(`Package version updated to ${file.version} in package.json (${updateType} version update)`);
      }
    });
  } else {
    console.log('No version change required');
  }
});
