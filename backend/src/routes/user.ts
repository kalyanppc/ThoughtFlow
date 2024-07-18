// routes/user.ts
import { Router, Request, Response } from 'express';
import { signupInput, signinInput } from '@100xdevs/medium-common';
import prisma from '../prisma/prismaClient';
import { signToken } from '../utils/jwt';
import verifyToken from '../middleware/auth';

const userRouter = Router();

// POST: Sign up
userRouter.post('/signup', async (req: Request, res: Response) => {
  
  const body = req.body;
  const { success } = signupInput.safeParse(body);
  if (!success) {
    return res.status(411).json({ message: 'Inputs not correct' });
  }

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });

    const jwt = await signToken({ id: user.id }, process.env.JWT_SECRET as string);

    return res.json({
      token: jwt
    })
  } catch (e) {
    console.log(e);
    res.status(411).send('Invalid');
  }
});

// POST: Sign in
userRouter.post('/signin', async (req: Request, res: Response) => {
  const body = req.body;
  const { success } = signinInput.safeParse(body);
  if (!success) {
    return res.status(411).json({ message: 'Inputs not correct' });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) {
      return res.status(403).json({ message: 'Incorrect creds' });
    }

    const jwt = await signToken({ id: user.id }, process.env.JWT_SECRET as string);

    res.send(jwt);
  } catch (e) {
    console.log(e);
    res.status(411).send('Invalid');
  }
});

userRouter.get("/auth",verifyToken, async(req, res) => {
  res.status(200).json({});
})

export default userRouter;
