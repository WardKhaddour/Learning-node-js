const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('could not find the file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write the file');
      resolve('Successfully wrote the file');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    const url = `https://dog.ceo/api/breed/${data}/images/random`;
    const res1Pro = await superagent.get(url);
    const res2Pro = await superagent.get(url);
    const res3Pro = await superagent.get(url);
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);
    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to dog-img.txt');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2:Ready';
};

(async () => {
  try {
    console.log('1:will get dog pics');
    const x = await getDogPic();
    console.log(x);
    console.log('3:done!');
  } catch (err) {
    console.log('ERROR');
  }
})();

// console.log('1:will get dog pics');
// getDogPic()
//   .then((x) => {
//     console.log(x);

//     console.log('3:done!');
//   })
//   .catch((err) => console.log('ERROR'));
/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to dog-img.txt');
  })
  .catch((err) => {
    console.log(err);
  });
*/
