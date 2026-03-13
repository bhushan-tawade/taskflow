import React, { useState, useEffect } from "react"
import { RiArrowRightSLine } from "react-icons/ri"
import { TbHome } from "react-icons/tb"
import { FiChevronRight, FiEdit2, FiEye, FiEyeOff, FiX, FiLock, FiLogOut, FiTrash2, FiMoon, FiCalendar } from "react-icons/fi"

import useUser from "../hooks/useUser"
import useTheme from "../hooks/useTheme"

// ─── Edit Profile Modal ────────────────────────────────────────
const EditProfileModal = ({ onClose, user, updateProfile }) => {
    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email) return setError("Name and Email are required");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) return setError("Please enter a valid email address");

        setLoading(true);
        await updateProfile(form);
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={onClose}>
            <div className="w-full max-w-md bg-white dark:bg-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>

                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-lg text-[#10162F] dark:text-white">Edit Profile</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black dark:text-white/40">
                        <FiX size={20} />
                    </button>
                </div>

                <hr className="dark:border-white/10" />

                <div className="flex flex-col gap-4">

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-600 dark:text-white/40">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full bg-gray-100 dark:bg-[#1e1e1e] text-[#10162F] dark:text-white rounded-lg px-4 py-3 border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-600 dark:text-white/40">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full bg-gray-100 dark:bg-[#1e1e1e] text-[#10162F] dark:text-white rounded-lg px-4 py-3 border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                </div>

                {error && <p className="text-red-500 text-sm bg-red-100 dark:bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}

                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-2 rounded-lg bg-gray-200 dark:bg-[#3a3a3a] text-[#10162F] dark:text-white">
                        Cancel
                    </button>

                    <button onClick={handleSubmit} disabled={loading} className="flex-1 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-semibold">
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>

            </div>
        </div>
    );
};


// ─── Change Password Modal ─────────────────────────────────────
const ChangePasswordModal = ({ onClose, changePassword }) => {

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const [show, setShow] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    })

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError("")
    }

    const toggleShow = (field) => {
        setShow((prev) => ({ ...prev, [field]: !prev[field] }))
    }

    const handleSubmit = async () => {

        if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
            return setError("All fields are required.")
        }

        if (form.newPassword.length < 6) {
            return setError("New password must be at least 6 characters.")
        }

        if (form.newPassword !== form.confirmPassword) {
            return setError("New passwords do not match.")
        }

        setLoading(true)

        const success = await changePassword({
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
        })

        setLoading(false)

        if (success) onClose()
    }

    const fields = [
        { name: "currentPassword", label: "Current Password" },
        { name: "newPassword", label: "New Password" },
        { name: "confirmPassword", label: "Confirm New Password" },
    ]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={onClose}>
            <div className="w-full max-w-md bg-white dark:bg-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FiLock size={18} />
                        <h2 className="font-semibold text-lg text-[#10162F] dark:text-white">
                            Change Password
                        </h2>
                    </div>

                    <button onClick={onClose} className="text-gray-500 hover:text-black dark:text-white/40 dark:hover:text-white">
                        <FiX size={20} />
                    </button>
                </div>

                <hr className="dark:border-white/10" />

                <div className="flex flex-col gap-4">
                    {fields.map(({ name, label }) => (
                        <div key={name} className="flex flex-col gap-1">
                            <label className="text-xs text-gray-600 dark:text-white/40">
                                {label}
                            </label>

                            <div className="relative">
                                <input
                                    type={show[name] ? "text" : "password"}
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-gray-100 dark:bg-[#1e1e1e] text-[#10162F] dark:text-white rounded-lg px-4 py-3 pr-10 border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />

                                <button
                                    type="button"
                                    onClick={() => toggleShow(name)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white/40"
                                >
                                    {show[name] ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {error && (
                    <p className="text-red-500 text-sm bg-red-100 dark:bg-red-500/10 rounded-lg px-3 py-2">
                        {error}
                    </p>
                )}

                <div className="flex gap-3">

                    <button
                        onClick={onClose}
                        className="flex-1 py-2 rounded-lg bg-gray-200 dark:bg-[#3a3a3a] text-[#10162F] dark:text-white"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-semibold"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>

                </div>
            </div>
        </div>
    )
}

// ─── Delete Account Modal ─────────────────────────────────────
const DeleteAccountModal = ({ onClose, deleteUser }) => {

    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {

        setLoading(true)

        const success = await deleteUser()

        setLoading(false)

        if (success) {
            localStorage.removeItem("token")
            window.location.href = "/"
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md bg-white dark:bg-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-5 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-lg text-red-500">
                        Delete Account
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black dark:text-white/40"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                <hr className="dark:border-white/10" />

                <p className="text-sm text-[#10162F]/70 dark:text-white/60">
                    Are you sure you want to delete your account?
                    <br />
                    <span className="text-red-500 font-medium">
                        This action cannot be undone.
                    </span>
                </p>

                <div className="flex gap-3">

                    <button
                        onClick={onClose}
                        className="flex-1 py-2 rounded-lg bg-gray-200 dark:bg-[#3a3a3a] text-[#10162F] dark:text-white"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white font-semibold"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>
        </div>
    )
}


// ─── Profile Page ─────────────────────────────────────────────
const ProfilePage = () => {

    const { user, updateProfile, changePassword, deleteUser } = useUser();
    const { isDark, toggleTheme } = useTheme()

    const [showChangePassword, setShowChangePassword] = useState(false)
    const [showEditProfile, setShowEditProfile] = useState(false)
    const [showDeleteAccount, setShowDeleteAccount] = useState(false)

    const [defaultDueDate, setDefaultDueDate] = useState(
        localStorage.getItem("defaultDueDate") || "tomorrow"
    )

    const changeDefaultDueDate = () => {
        const newValue = defaultDueDate === "tomorrow" ? "none" : "tomorrow"
        setDefaultDueDate(newValue)
        localStorage.setItem("defaultDueDate", newValue)
    }

    const getInitials = (name) => {
        if (!name) return "?"
        const words = name.trim().split(" ")
        if (words.length === 1) return words[0][0].toUpperCase()
        return (words[0][0] + words[1][0]).toUpperCase()
    }

    const initials = getInitials(user?.name)

    const logout = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    }

    if (!user) {
        return <div className="text-center mt-10">Loading profile...</div>
    }

    return (
        <div className="p-3 min-h-screen bg-[#FFF0E5] dark:bg-[#1E1E1E]">

            {showChangePassword && (
                <ChangePasswordModal
                    onClose={() => setShowChangePassword(false)}
                    changePassword={changePassword}
                />
            )}

            {showEditProfile && (
                <EditProfileModal
                    onClose={() => setShowEditProfile(false)}
                    user={user}
                    updateProfile={updateProfile}
                />
            )}

            {showDeleteAccount && (
                <DeleteAccountModal
                    onClose={() => setShowDeleteAccount(false)}
                    deleteUser={deleteUser}
                />
            )}

            <div className="w-full flex items-center justify-between px-4 text-[#10162F] dark:text-white/70 gap-2 h-15">
                <div className="flex items-center gap-2">
                    <TbHome size={26} />
                    <RiArrowRightSLine size={26} />
                    <p className="text-lg">Profile</p>
                </div>

                <span className="text-2xl hidden sm:block bricolage-grotesque dark:text-[#FFFF90]">
                    Taskflow
                </span>
            </div>

            <hr className="dark:border-white/20 mb-4" />

            <div className="max-w-2xl mx-auto flex flex-col gap-4">

                <div className="bg-white dark:bg-[#2E2E2E] border dark:border-0 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-purple-400 flex items-center justify-center text-white font-bold text-xl">
                        {initials}
                    </div>

                    <div className="flex-1">
                        <p className="font-semibold text-lg text-[#10162F] dark:text-white">
                            {user?.name}
                        </p>

                        <p className="text-[#10162F]/60 dark:text-white/50">
                            {user?.email}
                        </p>
                    </div>

                    <button
                        onClick={() => setShowEditProfile(true)}
                        className="flex items-center border dark:border-white/20 gap-2 bg-gray-200 dark:bg-[#3a3a3a] hover:bg-gray-300 dark:hover:bg-[#444] text-[#10162F] dark:text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <FiEdit2 size={14} />
                        Edit
                    </button>
                </div>

                <div className="bg-white dark:bg-[#2E2E2E] border dark:border-0 rounded-2xl overflow-hidden">
                    <p className="text-[#10162F]/60 dark:text-white/40 text-xs font-semibold px-5 pt-4 pb-2 uppercase">
                        Preferences
                    </p>

                    <hr className="dark:border-white/10" />

                    {/* Dark Mode */}
                    <div className="flex items-center justify-between px-5 py-4 border-b dark:border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full dark:text-white/50 bg-gray-200 dark:bg-[#3a3a3a] flex items-center justify-center">
                                <FiMoon size={16} />
                            </div>

                            <div>
                                <p className="text-[#10162F] dark:text-white font-medium">
                                    Dark Mode
                                </p>
                                <p className="text-[#10162F]/60 dark:text-white/40 text-xs">
                                    Switch appearance
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={toggleTheme}
                            className={`relative w-12 h-6 rounded-full transition ${isDark ? "bg-yellow-400" : "bg-gray-400"
                                }`}
                        >
                            <span
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition ${isDark ? "translate-x-6" : ""
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Default Due Date */}
                    <div
                        onClick={changeDefaultDueDate}
                        className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full dark:text-white/50 bg-gray-200 dark:bg-[#3a3a3a] flex items-center justify-center">
                                <FiCalendar size={16} />
                            </div>
                            <div>
                                <p className="text-[#10162F] dark:text-white font-medium">
                                    Default Due Date
                                </p>
                                <p className="text-[#10162F]/60 dark:text-white/40 text-xs">
                                    when creating tasks
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-[#10162F]/60 dark:text-white/50">
                            <span className="capitalize">{defaultDueDate}</span>
                            <FiChevronRight />
                        </div>
                    </div>
                </div>

                {/* Account */}
                <div className="bg-white dark:bg-[#2E2E2E] border dark:border-0 rounded-2xl overflow-hidden">
                    <p className="text-[#10162F]/60 dark:text-white/40 text-xs font-semibold px-5 pt-4 pb-2 uppercase">
                        Account
                    </p>

                    <hr className="dark:border-white/10" />

                    {/* Change Password */}
                    <button
                        onClick={() => setShowChangePassword(true)}
                        className="w-full flex items-center justify-between px-5 py-4 border-b dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 group transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full dark:text-white/50 bg-gray-200 dark:bg-[#3a3a3a] flex items-center justify-center">
                                <FiLock size={16} />
                            </div>
                            <span className="text-[#10162F] dark:text-white font-medium">
                                Change Password
                            </span>
                        </div>

                        <FiChevronRight className="text-gray-500 dark:text-white/40 group-hover:text-gray-700 group-hover:dark:text-white/70 transition-colors" />
                    </button>

                    {/* Log Out */}
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-between px-5 py-4 hover:bg-black/5 dark:hover:bg-white/5 group transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full dark:text-white/50 bg-gray-200 dark:bg-[#3a3a3a] flex items-center justify-center">
                                <FiLogOut size={16} />
                            </div>
                            <span className="text-[#10162F] dark:text-white font-medium">
                                Log Out
                            </span>
                        </div>

                        <FiChevronRight className="text-gray-500 dark:text-white/40 group-hover:text-gray-700 group-hover:dark:text-white/70 transition-colors" />
                    </button>
                    <hr className="dark:border-white/10" />

                    {/* Delete Account */}
                    <button
                        onClick={() => setShowDeleteAccount(true)}
                        className="w-full flex items-center justify-between px-5 py-4 hover:bg-black/5 dark:hover:bg-white/5 group transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full dark:text-white/50 bg-gray-200 dark:bg-[#3a3a3a] flex items-center justify-center">
                                <FiTrash2 size={16} />
                            </div>
                            <span className="text-[#10162F] dark:text-white font-medium">
                                Delete Account
                            </span>
                        </div>

                        <FiChevronRight className="text-gray-500 dark:text-white/40 group-hover:text-gray-700 group-hover:dark:text-white/70 transition-colors" />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ProfilePage