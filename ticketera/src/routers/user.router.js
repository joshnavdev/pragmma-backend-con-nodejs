import express from 'express';

const userRouter = express.Router();

userRouter.get('/users', (req, res) => {
  res.json({
    status: 'success',
    data: {
      users: [],
    },
  });
});

export default userRouter;
