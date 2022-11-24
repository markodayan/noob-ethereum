import fs from 'fs';
import path from 'path';

/**
 * Create JSON file from provided data and save to a directory of your choice
 * @param {any} obj - Any data that can be stringified
 * @param {string} filename - my_file
 * @param {string} pathFromRoot - /src/destination_folder
 */
function exportToJSONFile(obj: any, filename: string, pathFromRoot: string) {
  const json = JSON.stringify(obj);
  const filePath = path.join(process.cwd(), pathFromRoot.slice(0));

  fs.writeFile(`${filePath}/${filename}.json`, json, (err) => {
    if (err) {
      console.log(`Error writing file: ${filename}.json`, err);
    } else {
      console.log(`Successfully created ${filename}.json in ${filePath}`);
    }
  });
}

/**
 * Create Text file from provided data and save to a directory of your choice
 * @param {any} obj - data (could be a buffer)
 * @param {string} filename - my_file
 * @param {string} pathFromRoot - /src/destination_folder
 */
function exportToTextFile(obj: any, filename: string, pathFromRoot: string) {
  const filePath = path.join(process.cwd(), pathFromRoot.slice(0));

  fs.writeFile(`${filePath}/${filename}.txt`, obj, (err) => {
    if (err) {
      console.log(`Error writing file: ${filename}.txt`, err);
    } else {
      console.log(`Successfully created ${filename}.txt in ${filePath}`);
    }
  });
}

export { exportToJSONFile, exportToTextFile };
