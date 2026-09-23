import { motion, useAnimation } from "motion/react"
import type { TargetedEvent } from "preact"
import { useState } from "preact/hooks"


/**Imparatively triggering animation using usAnimation and control.start() */
export const LoginForm = ({ }) => {
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

    // Ref: [ADR-COMP-02] Imperative form validation shake via useAnimationControls.
    return (
        <form className="w-76 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col gap-4 p-6 shadow-2xl">
            <div className="flex flex-col items-start gap-1.5">
                <label htmlFor="username" className="text-xs font-medium text-neutral-400">Username</label>
                <input value={formData.username} onChange={changeUsername}
                    type="text" id="username" placeholder="Enter username"
                    className="w-full px-3 py-2 text-xs rounded-md bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                />
            </div>
            <div className="flex flex-col items-start gap-1.5">
                <label htmlFor="password" className="text-xs font-medium text-neutral-400">Password</label>
                <motion.input animate={controls} value={formData.password} onChange={changePassword}
                    type="password" id="password" placeholder="Enter password"
                    className="w-full px-3 py-2 text-xs rounded-md bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                />
            </div>

            <button
                type="button"
                onClick={handleSubmit}
                className="w-full mt-2 py-2 rounded-md bg-neutral-100 hover:bg-white text-neutral-900 text-xs font-semibold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
                Submit
            </button>
        </form>
    )
}


