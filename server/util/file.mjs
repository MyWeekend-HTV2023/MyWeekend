import fs from 'fs';
import axios from 'axios';

export default async function downloadImage(url, filename) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFile(filename, response.data, (err) => {
    if (err) {
      console.log(err);
    }
    // console.log('Image downloaded successfully!');
  });
}