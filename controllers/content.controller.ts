import { Router, Request, Response } from 'express';

const router: Router = Router();
const { google } = require('googleapis');

const scopes = [
  'https://www.googleapis.com/auth/drive'
];
const auth = new google.auth.JWT(
    "casapetrirosiamontana-1072@appspot.gserviceaccount.com", null,
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCo68VPF2gHQCdw\nDhrOqIGrCjR5EV843zhsxJ8f6048P0Ox1JE5Hu7E+c4hwrOOyZMb2RU1v8sjfK8k\nCYAuX9LQ44Wp4ML1xz/3RBrFCpl/q3x1GkmlE04eSKB4lXgo3643N0pKpmd8OMoV\nWbKskVOVoZTCFJfqZVeQq0GdUtg9w/vzs7OnHneHAimngWq7irmi2pQdTqrAFDZu\nYGK39TqYk7bGpCbFR2WfzqYAqu3UqBpIJBUr7fic4MpRaGZaYyeeePPeL26n1wPW\nyoVm6VIdXL4knAtJHb5Xjgu/a/bEFoltSBgcpxvyp7qWn7xc5EF646IeFy7l1eiI\nmN4ZveAVAgMBAAECggEABzDyV2mhrh1XEHgpP/8Adi2bCkRpD1zBZDACrjMwQ3RW\nB24LOKlOdOhFlD5bsop2TssxEfa2SS53rksRP+goa2gkOpUs95Wh7X7ivNy0qDC+\nvaV+2R43RybEXh3O3b6YBhW+fesToMAyKjKFXr9ZFZepY5HI3duunKQNyQrL1eU+\nUKRKFluEGjipZsV3yCaj+bxX0hrhjPGqqG3NrUS/rjBf11nil3tSyhQinmKQTcou\nkFuFeUZUtyQTBExbY7EfqJmoY0mPqxi6gK/YIQ41R8p/tZI+W7SgYvoj47Z/561R\ncYhvpNEbcICsL6LwhRbFhi56zZAY64mCcQaWAkw3SQKBgQDVAbcZ2USPdCNVj7tJ\nrzg5O6s1W4hiO9EQOaMDpYKlqyNWuGTxby+5Kp5snD5gDdwS+HaDANigSE3QIego\nI//3YzHlrMVzUUOKRjPaR1FkIDceMexkq/bI69tGhvYPnwFfd9rcNkeJhFawD/yy\n5pWe1mCEx5WYPXHZGzaQbPFwdwKBgQDLBBlYag6ITeQvWcI5fYLA9weWr+jQsvJB\nuWCBG2aQ/NlXdKwJWfQ7GhTRHAL4jGU6pS/hX2cCT7r38v/QGbZhEjvFQHd5WdfH\nPobPvk0GlGGt43V73DCtJzMmT+oZ9iy79OMf5BouRNUbYXbLzJ+CEs2HxXLc+gO3\n17ocaZzC0wKBgQDM65aEdqJfxCJOKTXMAJb9cKsYbRO7NcK+ckSiuHMFAKzBvCnY\nn9fwstCwumvDqvHDCmexRnohUQ4TItue6mtRS4vwYpOeilqIx1sRLrVdtyRvlyXO\nACYuS8GriyFkC9udRcg3PLz7zmY7gVXhorXklmdKtlvzl4FUlbqbnUN1pwKBgBpH\nLoyuNbFY+7dRU/2jDGCz2QydOnKBJzBwsVgk1tLfl7ZlSLtxJFbeGmGy0YOgkJ3V\nsevnMGsxLM9Zadli6qOH+6qdnJldkruckVCknk3CuR4L+jINH1PaZhmIcJHptoKh\nwSBooyboC/meVQUuOFta2bXATgziY8bRKqrw1LS3AoGAM26R4tPAVY2JEbi49vJk\nGDRTcqImWhqRgI/BbetRZtmq2q5sm6Sn4xk0zTaAfL63zKUzdnzFpp54+RyEVtJH\nid0SWHbzQNd6IrjC8OomLlbIe5Yj+Y5By6nOUnuB/Chl4qagv1fYVyt4Mvys0t35\nwwtGkz166s9Actar2WUASwA=\n-----END PRIVATE KEY-----\n",
    scopes
);
const drive = google.drive({ version: 'v3', auth });

router.post('/load', function (req, response) {
  console.log("/load");
  drive.files.list({}, (err, res) => {
    if (err) throw err;
    const files = res.data.files;
    if (files.length) {
      files.map((file) => {
        console.log(file);
        response.status(200).json(file);
      });
    } else {
      console.log('No files found');
      response.status(400).json({"reason": 'No files found'});
    }
    response.status(400).json({"reason": 'No files found'});
  });
});

export const ContentController: Router = router;
