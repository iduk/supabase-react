import React, { useState } from "react"

interface RegisterFormProps {
    onSubmit?: (data: { email: string; password: string; name: string }) => void
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !password || !name) {
            setError("모든 필드를 입력해주세요.")
            return
        }
        setError("")
        if (onSubmit) {
            onSubmit({ email, password, name })
        }
    }

    return (
        <form onSubmit={handleSubmit} className='max-w-md mx-auto bg-white shadow-md rounded-lg p-8 space-y-6'>
            <h2 className='text-2xl font-bold text-center mb-4'>회원가입</h2>
            <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                    이름
                </label>
                <input
                    id='name'
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            </div>
            <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                    이메일
                </label>
                <input
                    id='email'
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            </div>
            <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                    비밀번호
                </label>
                <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            </div>
            {error && <div className='text-red-500 text-sm mt-2'>{error}</div>}
            <button
                type='submit'
                className='w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors'
            >
                회원가입
            </button>
        </form>
    )
}
