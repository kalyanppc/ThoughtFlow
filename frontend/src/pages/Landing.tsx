import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from "../config"; 
import axios from 'axios';

export default function Page() {
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

  return (
      <>
      <div className='p-4 flex justify-between border-b-2 items-center'>
            <h1 className="text-xl font-bold text-black">MEDIUM</h1>
            <button onClick={() => {
                  navigate("/signup")
            }} className='p-2 min-w-24 bg-black text-white rounded-lg'>Sign up</button>
      </div>
      <hr />
    <div className="flex flex-col md:max-w-[90%] md:m-auto">
      <main className="flex-1">
        <section className="w-full p-4 mt-10">
          <div className="container -4 md:-6">
            <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover <br />Human Stories
                  </h1>
                  <p className="max-w-[600] text-gray-500 md:text-xl dark:text-gray-400">
                    Explore a platform where people share unique perspectives, ideas, and stories that inspire and inform.
                  </p>
                </div>
              </div>
              <img
                src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
                alt="Medium"
                className="mx-auto overflow-hidden rounded-xl object-cover sm:w-[500px] sm:h-[500px] w-full"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
