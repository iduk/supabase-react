import React, { useEffect, useState } from "react"

export default function LoginForm() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<{ email?: string; password?: string }>({})

    // API fetch
    const fetchLogin = async () => {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
        return response.json()
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("이메일:", email, "비밀번호:", password)

        // 유효성 검증 체크
        if (!email || !password) {
            console.error("모든 필드를 입력해주세요.")
            return
        }
        if (password.length < 6) {
            console.error("비밀번호는 최소 6자 이상이어야 합니다.")
            return
        }
        // 이메일 영문 4자리이상
        if (!/\S+@\S+\.\S+/.test(email)) {
            console.error("유효한 이메일 주소를 입력하세요.")
            return
        }

        handleSubmit(e)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // API 호출
        fetchLogin()
            .then(data => {
                if (data.success) {
                    console.log("로그인 성공:", data)
                } else {
                    console.error("로그인 실패:", data.message)
                }
            })
            .catch(error => {
                console.error("네트워크 연결 오류:", error)
            })
    }

    // 실시간 유효성 검사
    useEffect(() => {
        if (password && password.length < 6) {
            setError(prev => ({ ...prev, password: "비밀번호는 최소 6자 이상이어야 합니다." }))
        }
        if (email && !/\S+@\S+\.\S+/.test(email)) {
            setError(prev => ({ ...prev, email: "유효한 이메일 주소를 입력하세요." }))
        }
        // cleanup
        return () => {
            setError({})
        }
    }, [email, password])

    return (
        <form onSubmit={onSubmit} className='max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow-md'>
            <h2 className='text-2xl font-bold mb-6 text-center'>이메일 로그인</h2>
            <div className='mb-4'>
                <label htmlFor='email' className='block text-gray-700 mb-2'>
                    이메일
                </label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                {error.email && <div className='text-red-500 text-sm mt-2'>{error.email}</div>}
            </div>
            <div className='mb-6'>
                <label htmlFor='password' className='block text-gray-700 mb-2'>
                    비밀번호
                </label>
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                {error.password && <div className='text-red-500 text-sm mt-2'>{error.password}</div>}
            </div>
            {/* 로그인,회원가입 */}
            <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'>
                로그인
            </button>
            <p className='mt-4 text-center text-gray-600'>
                계정이 없으신가요?{" "}
                <a href='/register' className='text-blue-600 hover:underline'>
                    회원가입
                </a>
            </p>
        </form>
    )
}
