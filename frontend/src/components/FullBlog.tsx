import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
          {/* Left Column (Content) */}
          <div className="col-span-8">
            <div className="text-5xl font-extrabold mb-4">{blog.title}</div>
            <div className="text-slate-500 mb-4">Post on 2nd December 2023</div>
            <div className="text-lg text-gray-800 leading-relaxed">{blog.content}</div>
          </div>

          {/* Right Column (Author Details) */}
          <div className="col-span-4">
            <div className="text-lg text-slate-600 mb-4">Author</div>
            <div className="flex items-center mb-4">
              <div className="pr-4">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">{blog.author.name || "Anonymous"}</div>
                <div className="text-slate-500">Random catch phrase about the author's ability to grab the user's attention</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
