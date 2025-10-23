
import { LoginForm } from "../components/login-form"
import login_img from "../assets/img/login.png"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">       
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>     
      <div className="bg-muted relative hidden lg:block">
        <img
          src={login_img}
          alt="Image"
          className="absolute inset-0 h-full w-auto object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
    
  )
}
