import { useCurrentUser } from "@/app/context/currentUserContext";
import React from "react";
import Link from "next/link";

export default function DeleteProfile() {
    const { currentUser, setCurrentUser } = useCurrentUser();
    const [openEdit, setOpenEdit] = React.useState(false);

    const handleDeleteUser = async () => {
    if (currentUser) {
        await fetch("/api/delete?email=" + currentUser.email, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        });
        setOpenEdit(false);
        alert("Profile deleted.");
        setCurrentUser(null);
    }
};

    return (
        <>
        <button
            className="bg-red-600 text-white active:bg-red-700 font-bold uppercase text-sm px-3 py-1 rounded shadow transform transition-all duration-200 hover:scale-95 z-10 cursor-pointerfocus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setOpenEdit(true)}
        >
            Delete
        </button>
        {openEdit ? (
            <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <form className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">Confirm delete</h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-5 flex-auto">
                    Are you sure you want to delete?
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setOpenEdit(false)}
                    >
                        Close
                    </button>
                    <Link href="api/auth/logout?federated">
                        <button
                        className="bg-red-600 text-white active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => handleDeleteUser(currentUser)}
                        >
                        Delete
                        </button>
                    </Link>
                    </div>
                </div>
                </form>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}
        </>
    );
    }