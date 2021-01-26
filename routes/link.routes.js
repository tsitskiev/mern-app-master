const { Router } = require('express');
const router = Router();
const Link = require('../models/Link');
const auth = require('../middlewares/auth.middleware');
const config = require('config');
const shortid = require('shortid');

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    const { from } = req.body;
    const code = shortid.generate();
    const existLink = await Link.findOne({ from });
    if (existLink) {
      return res.json({ link: existLink });
    }
    const to = baseUrl + '/t/' + code;
    const link = new Link({
      from,
      to,
      code,
      owner: req.user.userId,
    });
    await link.save();
    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: 'Failed to generate new link' });
  }
});
router.post('/remove', auth, async (req, res) => {
  try {
    const { indToRemove } = req.body;
    const existLink = await Link.findOne({ indToRemove });
    await existLink.remove();
    res.status(201).json({ message: 'Link successfully removed' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to remove link' });
  }
});
router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json({ links });
  } catch (e) {
    res.status(500).json({ message: 'Failed to get links' });
  }
});
router.get('/:id', auth, async (req, res) => {
  const link = await Link.findById(req.params.id);
  res.json(link);
  try {
  } catch (e) {
    res.status(500).json({ message: 'Failed to get id' });
  }
});

module.exports = router;
