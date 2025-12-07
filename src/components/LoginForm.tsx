import { motion, useAnimation } from "motion/react"
import type { TargetedEvent } from "preact"
import { useState } from "preact/hooks"


const LoginForm = ({ }) => {
    const [formData, setFormData] = useState({ username: "", password: "" })
    const controls = useAnimation()

    const changeUsername = (e: TargetedEvent) => {
        setFormData(s => ({ ...s, username: (e.target as HTMLInputElement).value }))
    }
    const changePassword = (e: TargetedEvent) => {
        setFormData(s => ({ ...s, password: (e.target as HTMLInputElement).value }))
    }

    const handleSubmit = () => {
        if (formData.password !== "sumi") controls.start({
            x: [0, -10, 10, -10, 10, 0],
            transition: { duration: 0.4 },
            outlineColor: "red"
        });
        else { alert("Success") }
    }

    return (
        <form className="w-80 h-100 outline-1 bg-slate-800 flex flex-col justify-center gap-10 p-10">
            <div className="flex flex-col items-start gap-1">
                <label htmlFor="username" className="text-neutral-400 font-semibold">Username:</label>
                <input value={formData.username} onChange={changeUsername}
                    type="text" id="username" placeholder="Enter username"
                    className="outline-1 w-full"
                />
            </div>
            <div className="flex flex-col items-start gap-1">
                <label htmlFor="password" className="text-neutral-400 font-semibold">Password:</label>
                <motion.input animate={controls} value={formData.password} onChange={changePassword}
                    type="password" id="password" placeholder="Enter password"
                    className="outline-1 w-full"
                />
            </div>

            <button type={"button"} onClick={handleSubmit}>Check</button>
        </form>
    )
}

export default LoginForm
