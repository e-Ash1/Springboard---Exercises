const express = require('express');
const router = express.Router();

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get('/:id', async (req, res) => {
    const messageId = req.params.id;
    const currentUser = req.user.username; // Make sure your auth middleware sets req.user
  
    try {
      const message = await getMessageDetail(messageId, currentUser);
      if (!message) {
        return res.status(404).send({error: 'Message not found or access denied.'});
      }
      res.json({message});
    } catch (error) {
      res.status(500).send({error: 'Internal server error.'});
    }
  });


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post('/', async (req, res) => {
    const {to_username, body} = req.body;
    const from_username = req.user.username;
  
    try {
      const message = await createMessage(from_username, to_username, body);
      res.json({message});
    } catch (error) {
      res.status(500).send({error: 'Internal server error.'});
    }
  });

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

router.post('/:id/read', async (req, res) => {
    const messageId = req.params.id;
    const currentUser = req.user.username;
  
    try {
      const message = await markMessageAsRead(messageId, currentUser);
      if (!message) {
        return res.status(404).send({error: 'Message not found or you are not the recipient.'});
      }
      res.json({message});
    } catch (error) {
      res.status(500).send({error: 'Internal server error.'});
    }
  });
  
  module.exports = router;

