const fetch = require("node-fetch");
const fs = require("fs");
const { spawn } = require("child_process");

exports.getBase64 = getBase64 = async (url) => {
  const response = await fetch(url, {
    headers: { "User-Agent": "okhttp/4.5.0" },
  });
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);
  const buffer = await response.buffer();
  const videoBase64 =
    `data:${response.headers.get("content-type")};base64,` +
    buffer.toString("base64");
  if (buffer) return videoBase64;
};
exports.getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};
exports.getBuffer = getBuffer = async (url) => {
  const res = await fetch(url, {
    headers: { "User-Agent": "okhttp/4.5.0" },
    method: "GET",
  });
  if (!res.ok) throw "Error while fetching data";
  const buff = await res.buffer();
  if (buff) return buff;
  //if (buff)
  //    return { type: res.headers.get('content-type'), result: buff }
};

exports.fetchJson = fetchJson = (url, options) =>
  new Promise(async (resolve, reject) => {
    fetch(url, options)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json)
        resolve(json);
      })
      .catch((err) => {
        reject(err);
      });
  });

exports.fetchText = fetchText = (url, options) =>
  new Promise(async (resolve, reject) => {
    fetch(url, options)
      .then((response) => response.text())
      .then((text) => {
        // console.log(text)
        resolve(text);
      })
      .catch((err) => {
        reject(err);
      });
  });
exports.kyun = (seconds) => {
  function pad(s) {
    return (s < 10 ? "0" : "") + s;
  }
  var hours = Math.floor(seconds / (60 * 60));
  var minutes = Math.floor((seconds % (60 * 60)) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)}Jam - ${pad(minutes)}Menit -  ${pad(
    seconds
  )}Detik\n\n 「 𝗕𝗔𝗜𝗟𝗘𝗬𝗦 𝗦𝗘𝗟𝗙𝗕𝗢𝗧 」`;
};

//exports.getBase64 = getBase64;
