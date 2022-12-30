import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import GetFlow from './get_flow.components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const host = 'http://' + window.location.hostname + ':8000/api';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [flowname, setFlowName] = useState("");
    const [isLoad, setLoad] = useState(true);
    const [showModal, setShowModal] = useState(false);



    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         localStorage.removeItem('token');
    //         window.location.href = '/';
    //     }else {
    //         get_all_flow();
    //     }
    // },[isLoad])

    // async function get_all_flow() {
    //     const res = await fetch(host+'/get_all_flow', {
    //         headers: {
    //             Accept: "application/json",
    //             'Content-type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //         }
    //     })
    //     const r = await res;
    //     if(r.status === 401){
    //         localStorage.removeItem('token');
    //         window.location.href = '/';
    //     }else if(r.status === 200){
    //         const data = await res.json()
    //         setData(data)
    //     }      
    // };


    async function flowForm(e) {
        e.preventDefault();
        const res = await fetch(host + "/new_flow", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                flow_name: flowname,
            }),
        });
        const data = await res.json();
        setFlowName("")
        if (isLoad === true) {
            setLoad(false)
        } else {
            setLoad(true)
        }
        if (data.status === 200) {
            return toast.success(data.message)
        } else if (data.status === 403) {
            return toast.error(data.message)
        }

    }



    async function delFlow(e) {
        e.preventDefault();
        const res = await fetch(host + '/flow_del', {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                id: e.target.value,
            }),
        });
        const data = await res.json();
        if (isLoad === true) {
            setLoad(false)
        } else {
            setLoad(true)
        }

        return toast.success(data.message)
    }



    return (
        <>
            <>
                <button
                    className="bg-pink-500 text-white"
                    type="button"
                    onClick={() => setShowModal(true)}
                >Add</button>
                {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">Database</h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                        </button>
                                    </div>
                                    <div className="relative p-6 flex-auto">
                                        <p className="my-4 text-slate-500 text-lg leading-relaxed"> I always felt</p>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </>
            <ToastContainer />
        </>
    );
}

