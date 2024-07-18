import { useNavigate } from "react-router-dom";
import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"
import { useEffect } from "react";
import { BACKEND_URL } from "../config"; 
import axios from "axios";

export const Signup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                if(response.status === 200)
                    navigate("/blogs");
            })
    }, [])
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signup" />
            </div>
            <div className="lg:block">
                <Quote />
            </div>
        </div>
    </div>
}