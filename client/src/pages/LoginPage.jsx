import LoginCard from "../components/LoginCard"

const LoginPage = () => {
    return (
        <div className="flex">
            <aside className="h-screen w-3/10 border-r bg-accent"></aside>
            <div className="h-screen w-7/10 flex justify-center items-center">
                <LoginCard/>
            </div>
        </div>
    )
}

export default LoginPage