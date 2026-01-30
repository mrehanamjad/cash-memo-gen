'use client';

import { useActionState } from 'react';
import { login } from './action';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-red-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Verifying...' : 'Access Dashboard'}
    </button>
  );
}

export default function LoginPage() {
  // useActionState handles the form submission result (error messages)
  const [state, formAction] = useActionState(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-red-900 p-8 text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-wide uppercase">ScrubX</h1>
          <p className="text-red-200 text-sm mt-1">Internal Billing System</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Admin Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-900 focus:border-red-900 outline-none transition-all text-gray-800"
              />
            </div>

            {state?.error && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded border border-red-100 text-center">
                {state.error}
              </div>
            )}

            <SubmitButton />
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Authorized personnel only. <br />
              IP address is being logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}