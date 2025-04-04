export const hideRandomKey = (rkey) => {
  const dkey = 100000000 - rkey;

  let skey = dkey.toString();
  let sobs = rkey.toString();

  while (skey.length < 8) {
    skey = "0" + skey;
  }

  while (sobs.length < 8) {
    sobs = "0" + sobs;
  }

  // Create an array to hold the final hkey values
  let hkey = Array(16).fill("0");

  // Assign values to hkey based on the rules
  hkey[0] = skey[4]; // 4 7 2 5 0 6 3 1
  hkey[1] = skey[7];
  hkey[2] = sobs[1]; // 1 4 7 5 0 2 3 6
  hkey[3] = sobs[4];
  hkey[4] = sobs[7];
  hkey[5] = skey[2];
  hkey[6] = sobs[5];
  hkey[7] = sobs[0];
  hkey[8] = skey[5];
  hkey[9] = skey[0];
  hkey[10] = sobs[2];
  hkey[11] = sobs[3];
  hkey[12] = skey[6];
  hkey[13] = skey[3];
  hkey[14] = sobs[6];
  hkey[15] = skey[1];

  // Join the array into a string and return it
  return hkey.join("");
};

export const buildLinkForID = (practiceRandomKey, randomKey) => {
  const obfus = hideRandomKey(practiceRandomKey);

  let link = `${obfus}-${randomKey}`;

  // Encode the & symbol to prevent breaking the URL
  link = link.replace(/&/g, "%26");

  return link;
};

export const exposeRandomKey = (obfs) => {
  let hkey = "00000000".split("");
  // 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
  // 0 0 0 0 0 0 0 0 0 1  0  0  0  0  0  0

  hkey[0] = obfs[7];
  hkey[1] = obfs[2];
  hkey[2] = obfs[10];
  hkey[3] = obfs[11];
  hkey[4] = obfs[3];
  hkey[5] = obfs[6];
  hkey[6] = obfs[14];
  hkey[7] = obfs[4];

  return hkey.join("");
};
