// routes/blog.ts
import { Router, Request, Response } from 'express';
import { createBlogInput, updateBlogInput } from '@100xdevs/medium-common';
import prisma from '../prisma/prismaClient';
import verifyToken from '../middleware/auth';

interface CustomRequest extends Request {
  userId?: string;
}

const blogRouter = Router();

// Use the JWT verification middleware
blogRouter.use(verifyToken);

// POST: Create a new blog post
blogRouter.post('/', async (req: CustomRequest, res: Response) => {
  const body = req.body;
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    return res.status(411).json({ message: 'Inputs not correct' });
  }

  const authorId = req.userId;

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId),
    },
  });

  res.json({ id: blog.id });
});

// PUT: Update an existing blog post
blogRouter.put('/', async (req: CustomRequest, res: Response) => {
  const body = req.body;
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    return res.status(411).json({ message: 'Inputs not correct' });
  }

  const blog = await prisma.blog.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  res.json({ id: blog.id });
});

// GET: Fetch multiple blog posts
blogRouter.get('/bulk', async (_req: Request, res: Response) => {
  const blogs = await prisma.blog.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  res.json({ blogs });
});

// GET: Fetch a single blog post by ID
blogRouter.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const blog = await prisma.blog.findFirst({
      where: { id: Number(id) },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    res.json({ blog });
  } catch (e) {
    res.status(411).json({ message: 'Error while fetching blog post' });
  }
});

export default blogRouter;
