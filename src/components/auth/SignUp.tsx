"use client"

import React, { useActionState } from "react"
import Form from "next/form"
import { Loader2 } from "lucide-react"

type SignUpProps = {
  action: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prevState: any,
    formData: FormData
  ) => Promise<
    | {
        message: string
      }
    | undefined
  >
}

const initialState = {
  message: "",
}

const SignUp = ({ action }: SignUpProps) => {
  const [state, formAction, isPending] = useActionState(action, initialState)

  return (
    <Form
      action={formAction}
      className="max-w-md mx-auto p-8 my-16 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold text-center mb-2">
        Join the DEAL Revolution!
      </h1>
      <p className="text-sm text-center text-rose-600 font-semibold mb-2">
        🔥 LIMITED TIME OFFER 🔥
      </p>
      <p className="text-sm text-center text-gray-600 mb-6">
        Sign up now and get 90% off your first purchase!
      </p>
      <div className="space-y-6">
        {/* EMAIL */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent focus:outline-none transition-colors"
            placeholder="Enter your email address"
            disabled={isPending}
          />
        </div>
        {/* PASSWORD */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent focus:outline-none transition-colors"
            placeholder="Enter your password"
            disabled={isPending}
          />
        </div>
        {/* COPY */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">
            ⚡ Only 127 welcome bonus packages left!
          </p>
          <p className="text-xs text-gray-500 mb-4">
            🕜 Offer expires in: 13:45
          </p>
        </div>
        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full bg-rose-600 text-white py-3 rounded-md hover:bg-rose-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:hover:bg-rose-600/50`}
        >
          {isPending ? (
            <React.Fragment>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </React.Fragment>
          ) : (
            "Create account"
          )}
        </button>
        {state?.message && state.message.length && (
          <p className="text-sm text-center text-red-500">{state.message}</p>
        )}
      </div>
    </Form>
  )
}

export default SignUp
