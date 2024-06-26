
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


export default function VerifyEmail() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        let toastId = toast.loading('loading...')
        try {
            const res = await axios.post('http://localhost:3000/api/verifymail', { token: token })
            setVerified(true);
            if (res.status == 200 && res.data.message == "Email verified successfully") {
                toast.success(res.data.message, { id: toastId })

            }
            console.log(res);
        } catch (error) {
            setError(true);
            console.log(error);
            if (error.response.status === 400 && error.response.data.error === "Invalid token") {
                return toast.error(error.response.data.error, { id: toastId })
            }
            toast.error(error.message)


        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>

                    <Link to="/login">
                        <LoadingButton
                            type='submit'
                            fullWidth sx={{ mt: 3, mb: 2 }}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            Login
                        </LoadingButton>
                    </Link>
                </div>
            )}
            {error ? (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">error</h2>

                </div>
            ) : ''}
        </div>
    )

}
