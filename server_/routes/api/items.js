const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
// const auth = require('../../middleware/auth');

const Item = require('../../models/Item');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/items
// @desc     Create a post
// @access   Public
router.post(
  '/',
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

        const {itemId, name, longDescription, shortDescription, picurePath, price, category} = req.body;
        const newItem = new Item({
            itemId,
            name,
            shortDescription,
            longDescription,
            picurePath,
            price,
            category,
        })

      const item = await newItem.save();

      res.status(201).json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/items
// @desc     Get all items
// @access   Public
router.get('/', async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/items/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', checkObjectId('id'), async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(item);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/items/:id
// @desc     Delete a post
// @access   Public
router.delete('/:id', [checkObjectId('id')], async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // // Check user
    // if (post.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'User not authorized' });
    // }

    await item.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message: err.message});
  }
});

module.exports = router;
