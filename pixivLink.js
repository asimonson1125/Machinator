const cheerio = require('cheerio');
const fetch = require('node-fetch');

let response = [[],[],[]];
exports.daily = async function (channel) {
    const data = await fetch('http://www.pixiv.net/ranking.php?mode=daily');
    const $ = cheerio.load(await data.text());
    for(let i = 31; i < 34; i++){
        response[0].push($(`#\\${i}  > h2 > a`).text());
    }

    $('.user-name').each(function(i, elem){
        response[1].push($(this).text());
        return i < 2;
    })

    for(let i = 31; i < 34; i++){
        response[2].push("https://www.pixiv.net/en" + $(`#\\${i}  > h2 > a`).attr('href'));
    }
    channel.send(`Today's top post is "${response[0][0]}" by ${response[1][0]}.\n${response[2][0]}`);
}