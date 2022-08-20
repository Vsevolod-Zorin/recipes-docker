import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from './config';
import { connectDb } from './helpers/db';
import mongoose from 'mongoose';
console.log({
  dirname: __dirname,
});

const PostSchema = new mongoose.Schema({
  name: String,
});
const Post = mongoose.model('post', PostSchema);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/', (req: Request, res: Response) => {
  res.send('from api');
});

app.use('/category', (req: Request, res: Response) => {
  res.send('category from api');
});

const startServer = () => {
  app.listen(config.app.httpPort, () => {
    console.log(`Started api service on port ${config.app.httpPort}`);
    // console.log(`Our host is ${host}`);
    console.log(`Database url ${config.db.mongoUrl}`);
    //  console.log(`Auth api url ${authApiUrl}`);
    // sd
    // Post.find((err, posts) => {
    //   if (err) {
    //     return console.log(err);
    //   } else {
    //     console.log(posts, { posts });
    //   }
    // });

    // Post.find((err, posts) => {
    //   if (err) {
    //     return console.log(err);
    //   } else {
    //     console.log(posts, { posts });
    //   }
    // });

    console.log('================= ');
    // const post = new Post({ name: 'testPostName2' });
    // post
    //   .save()
    //   .then(console.log)
    //   .then(() => {
    //     console.log('==================');
    //     Post.find().then(posts => {
    //       console.log('posts: ', posts);
    //       console.log('count: ', posts.length);
    //     });
    //   });

    // console.log(savedPost);
  });
};

// startServer();
connectDb().on('error', console.log).on('disconnected', connectDb).once('open', startServer);
