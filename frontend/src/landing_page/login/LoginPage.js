
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
        useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));

            if (payload.exp * 1000 > Date.now()) {
                const user = localStorage.getItem("user") || "{}";
                window.location.href =
                    `http://localhost:3000/?token=${encodeURIComponent(token)}` +
                    `&user=${encodeURIComponent(user)}`;
            } else {
                localStorage.clear();
            }
        } catch {
            localStorage.clear();
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        

        try {
            const response = await axios.post(
                "http://localhost:3002/login",
                formData
            );

            localStorage.setItem("token", response.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

const { token, user } = response.data;
window.location.href =
    `http://localhost:3000/?token=${encodeURIComponent(token)}` +
    `&user=${encodeURIComponent(JSON.stringify(user))}`;

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        }
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h3 className="text-center mb-4">
                                Login to Your Account
                            </h3>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
