const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '5d6a5d7b264f40f1b4e5158571741604'
  });

  const handleAPICall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with clarifai'))
}
  

const handleImage = db => (req, res) => {
    const {
        id
    } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get entries'));


}


module.exports = {
    handleImage,
    handleAPICall
}