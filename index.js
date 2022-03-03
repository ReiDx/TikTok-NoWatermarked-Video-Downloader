const fetch = require("node-fetch");
const express = require('express');
const app = express();
const port = 8520;

app.get('/', async (req, res) => {
    if (req.query.video_id) {
        try {
            let video_id = req.query.video_id;
            res.send({kod: 0, yanit: await videoGetir(video_id) });
        } catch (error) {
            res.send({kod: 1, yanit: error, ornek_kullanim: `localhost:8520/?video_id=7067426455176678657`})
        }
    } else {
        res.send({kod: 1, yanit: `TikTok Video ID boş bırakılamaz!`, ornek_kullanim: `localhost:8520/?video_id=7067426455176678657`})
    }
})

app.listen(port, () => {
  console.log(`Sunucu ${port} portundan hizmet veriyor.`)
})

async function videoGetir(video_id) {
    let sonuc = await fetch(`https://api.tiktokv.com/aweme/v1/multi/aweme/detail/?aweme_ids=%5B${video_id}%5D`, {method: 'GET'});
    let veri = await sonuc.json();
    return { video_url: veri["aweme_details"][0]["video"]["play_addr"]["url_list"][0], kullanici_adi: veri["aweme_details"][0]["author"]["unique_id"] };
}