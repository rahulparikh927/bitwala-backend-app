import { Router } from 'express'
import querystring from 'querystring'
import axios from 'axios'
import { json } from 'body-parser'

let router = Router()


const getBlocks = () => {
    const timestamp = new Date().getTime()
    return axios.get('https://blockchain.info/blocks/' + timestamp + '?format=json')
        .then((resp) => {
            return resp.data
        }
        ).catch(e => {
            return false;
        })
}

const getBlockData = (blockId) => {
    return axios.get('https://blockchain.info/rawblock/' + blockId)
        .then((resp) => {
            return resp.data
        }
        ).catch(e => {
            return false;
        })
}


router.get('/blocks', async (req, res) => {
    const resp = await getBlocks(res)
    if (resp) {
        res.status(200).send({ ...resp });
    }
    else {
        res.status(500).send("try again");
    }
})

router.get('/rawblock/:blockId', async (req, res) => {
    const { blockId } = req.params
    const resp = await getBlockData(blockId)
    if (resp) {
        res.status(200).send({ ...resp });
    }
    else {
        res.status(500).send("try again");
    }
})

export default router