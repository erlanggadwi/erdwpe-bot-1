const {
  WAConnection: _WAConnection,
  MessageType,
  Presence,
  Mimetype,
  GroupSettingChange,
} = require("@adiwajshing/baileys");
const simple = require("./simple.js");
const WAConnection = simple.WAConnection(_WAConnection);
const chalk = require("chalk");
const cp = require("child_process");
const fs = require("fs");
const moment = require("moment-timezone");

const erdwpe = new WAConnection();
erdwpe.version = [2, 2140, 12];
exports.erdwpe = erdwpe;

exports.connect = async () => {
  console.log(chalk.whiteBright("╭─── [ LOG ]"));
  let auth = "./erdwpe.json";
  erdwpe.logger.level = "warn";
  erdwpe.on("qr", () => {
    console.log(`Qr ready, scan`);
  });
  fs.existsSync(auth) && erdwpe.loadAuthInfo(auth);
  erdwpe.on("connecting", () => {
    console.log(
      chalk.whiteBright("├"),
      chalk.keyword("aqua")("[  STATS  ]"),
      chalk.whiteBright("Connecting...")
    );
  });
  erdwpe.on("open", () => {
    console.log(
      chalk.whiteBright("├"),
      chalk.keyword("aqua")("[  STATS  ]"),
      chalk.whiteBright("WA Version : " + erdwpe.user.phone.wa_version)
    );
    console.log(
      chalk.whiteBright("├"),
      chalk.keyword("aqua")("[  STATS  ]"),
      chalk.whiteBright("OS Version : " + erdwpe.user.phone.os_version)
    );
    console.log(
      chalk.whiteBright("├"),
      chalk.keyword("aqua")("[  STATS  ]"),
      chalk.whiteBright("Device : " + erdwpe.user.phone.device_manufacturer)
    );
    console.log(
      chalk.whiteBright("├"),
      chalk.keyword("aqua")("[  STATS  ]"),
      chalk.whiteBright("Model : " + erdwpe.user.phone.device_model)
    );
    console.log(
      chalk.whiteBright("├"),
      chalk.keyword("aqua")("[  STATS  ]"),
      chalk.whiteBright(
        "OS Build Number : " + erdwpe.user.phone.os_build_number
      )
    );
    console.log(
      chalk.whiteBright("├"),
      chalk.keyword("aqua")("[  STATS  ]"),
      chalk.whiteBright("Welcome My Senpai")
    );
    const authInfo = erdwpe.base64EncodedAuthInfo();
    fs.writeFileSync(auth, JSON.stringify(authInfo, null, "\t"));
    erdwpe.sendMessage(
      `6281392641570@s.whatsapp.net`,
      "Bot Started.....",
      MessageType.text
    );
  });
  await erdwpe.connect({ timeoutMs: 30 * 1000 });
  return erdwpe;
};

antidel = true;
erdwpe.on("message-delete", async (lin) => {
  if (lin.key.remoteJid == "status@broadcast") return;
  if (!lin.key.fromMe && lin.key.fromMe) return;
  if (antidel === false) return;
  lin.message =
    Object.keys(lin.message)[0] === "ephemeralMessage"
      ? lin.message.ephemeralMessage.message
      : lin.message;
  const jam = moment.tz("Asia/Jakarta").format("HH:mm:ss");
  let d = new Date();
  let locale = "id";
  let gmt = new Date(0).getTime() - new Date("1 Januari 2021").getTime();
  const weton = ["Kliwon", "Legi", "Pahing", "Pon", "Wage"][
    Math.floor((d * 1 + gmt) / 84600000) % 5
  ];
  let week = d.toLocaleDateString(locale, { weekday: "long" });
  let calender = d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const type = Object.keys(lin.message)[0];
  erdwpe.sendMessage(
    lin.key.remoteJid,
    `━━━━⬣  𝘼𝙉𝙏𝙄 𝘿𝙀𝙇𝙀𝙏𝙀  ⬣━━━━
    *Nama  : @${lin.participant.split("@")[0]}*
    *Jam  : ${jam}*
    *Hari/Tanggal: ${week}, ${calender}*
━━━━⬣  𝘼𝙉𝙏𝙄 𝘿𝙀𝙇𝙀𝙏𝙀  ⬣━━━━`,
    MessageType.text,
    { quoted: lin.message, contextInfo: { mentionedJid: [lin.participant] } }
  );
  erdwpe.copyNForward(lin.key.remoteJid, lin.message, false).catch(e => console.log(e, lin));
});
async function _quickTest() {
  let test = await Promise.all(
    [
      cp.spawn("ffmpeg"),
      cp.spawn("ffprobe"),
      cp.spawn("ffmpeg", [
        "-hide_banner",
        "-loglevel",
        "error",
        "-filter_complex",
        "color",
        "-frames:v",
        "1",
        "-f",
        "webp",
        "-",
      ]),
      cp.spawn("convert"),
      cp.spawn("magick"),
      cp.spawn("gm"),
    ].map((p) => {
      return Promise.race([
        new Promise((resolve) => {
          p.on("close", (code) => {
            resolve(code !== 127);
          });
        }),
        new Promise((resolve) => {
          p.on("error", (_) => resolve(false));
        }),
      ]);
    })
  );

  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm] = test;
  console.log(test);
  let s = (global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
  });
  require("./sticker").support = s;
  Object.freeze(global.support);
}
_quickTest();
