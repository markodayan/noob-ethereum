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
  const filePath = path.join(process.cwd(), pathFromRoot);

  fs.writeFile(`${filePath}/${filename}.json`, json, (err) => {
    if (err) {
      console.log(`Error writing file: ${filename}.json`, err);
    } else {
      console.log(`Successfully created ${filename}.json in ${filePath}`);
    }
  });
}

export { exportToJSONFile };
