import  { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const host = window.location.hostname;

export default function Login() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");


    async function handleSubmit(event) {
        event.preventDefault();
        const res = await fetch("http://" + host +":8000/api/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                username: username,
            }),
        });
        const data = await res.json();


        if(data.status === 200){
            localStorage.setItem('token', data.token.original.access_token)
            window.location.href = '/dashboard'
        }else {
            alert('Please check your username and password');
            window.location.href = '/'
        }
    };
    return (
        <>
            <div className="w-full bg-grey-500">
                <div className="container mx-auto py-8">
                    <div className="w-96 mx-auto bg-white rounded shadow">
                        <form onSubmit={handleSubmit}>
                            <div className="py-4 px-8">
                                <div className="mb-4">
                                    <label className="block text-grey-darker text-sm font-bold mb-2">User Name</label>
                                    <input
                                        className="border rounded w-full py-2 px-3 text-grey-darker"
                                        name="username"
                                        type="text"
                                        value={username}
                                        placeholder="User Name"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>


                                <div className="mb-4">
                                    <label className="block text-grey-darker text-sm font-bold mb-2">Password</label>
                                    <input
                                        className=" border rounded w-full py-2 px-3 text-grey-darker"
                                        name="password"
                                        type="password"
                                        value={password}
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <button
                                        type="submit"
                                        className="mb-2 mx-16 rounded-full py-1 px-24 bg-gradient-to-r from-green-400 to-blue-500 "
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
