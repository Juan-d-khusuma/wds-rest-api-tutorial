const express = require('express')
const router = express.Router();
const Subscriber = require('../models/subsciber');

async function getSub(req, res, next) {
    let sub;
    try {
        sub = await Subscriber.findById(req.params.id);
        if (sub === null ) {
            return res.status(404).json({ message: "Can\'t find item" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.sub = sub;
    next();
}

// [GET] All Subs
router.get('/', async (req, res) => {
    try {
        const subs = await Subscriber.find();
        res.json(subs);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// [GET] One Sub
router.get('/:id', getSub, (req, res) => {
    res.json(res.sub);
});

// [CREATE] Sub
router.post('/', async (req, res) => {
    const sub = new Subscriber({
        name: req.body.name,
        toChannel: req.body.toChannel,
    });
    try {
        const newSub = await sub.save();
        res.status(201).json(newSub);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// [UPDATE] Sub
router.patch('/:id', getSub, async (req, res) => { 
    if (req.body.name !== null) {
        res.sub.name = res.body.name;
    }
    if (req.body.toChannel !== null) {
        res.sub.toChannel = res.body.toChannel;
    }
    try {
        const updatedSub = await res.sub.save();
        res.json(updatedSub);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// [DELETE] Sub
router.delete('/:id', getSub, async (req, res) => {
    try {
        await res.sub.remove();
        res.json({ message: 'Item Deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;