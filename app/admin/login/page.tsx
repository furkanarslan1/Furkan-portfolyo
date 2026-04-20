import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm px-6">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Admin Girişi</h1>
          <p className="text-muted-foreground text-sm mt-1">furkanarslan.dev</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}