import React from "react";
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { id } = useParams<{ id: string }>(); 
    const { loading, blog } = useBlog({ id: id || "" });

    if (loading && !blog) {
        return (
            <div>
                <Appbar />
                <div className="h-screen flex flex-col justify-center">
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div>
                <Appbar />
                <div className="h-screen flex flex-col justify-center items-center">
                    <p className="text-xl font-bold text-gray-800">
                        No blog with ID {id} available.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar />
            <FullBlog blog={blog} />
        </div>
    );
};
