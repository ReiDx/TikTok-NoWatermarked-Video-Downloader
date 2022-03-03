const fetch = require("node-fetch");
const express = require('express');
const app = express();
const port = 8520;

app.get('/', async (req, res) => {
    if (req.query.video_id) {
        try {
            let video_id = req.query.video_id;
            res.send({code: 0, response: await getVideo(video_id) });
        } catch (error) {
            res.send({code: 1, response: error, example: `localhost:8520/?video_id=7067426455176678657`})
        }
    } else {
        res.send({code: 1, yanit: `TikTok Video ID is not null!`, example: `localhost:8520/?video_id=7067426455176678657`})
    }
})

app.listen(port, () => {
  console.log(`Server ::${port} is started.`)
})

async function getVideo(video_id) {
    let response = await fetch(`https://api.tiktokv.com/aweme/v1/multi/aweme/detail/?aweme_ids=%5B${video_id}%5D`, {method: 'GET'});
    let data = await response.json();
    return { video_url: veri["aweme_details"][0]["video"]["play_addr"]["url_list"][0], user_name: data["aweme_details"][0]["author"]["unique_id"] };
}