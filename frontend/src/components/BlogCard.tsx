import { Link } from "react-router-dom";
interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <Avatar name={authorName} />
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
                <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}
type AvatarProps = {
    name: string;
    size?: "small" | "big";
  };
  
export const Avatar: React.FC<AvatarProps> = ({ name, size = "small" }) => {
    const avatarSizeClass = size === "small" ? "w-6 h-6" : "w-10 h-10";
    const textClass = size === "small" ? "text-xs" : "text-md";
  
    return (
      <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${avatarSizeClass}`}>
        <span className={`${textClass} font-extralight text-gray-600 dark:text-gray-300`} aria-label={`Avatar for ${name}`}>
          {name[0]}
        </span>
      </div>
    );
  };