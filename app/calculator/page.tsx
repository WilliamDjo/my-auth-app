"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CalculatorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [operation, setOperation] = useState<
    "add" | "subtract" | "multiply" | "divide"
  >("add");

  // Protect the route - redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const calculate = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      alert("Please enter valid numbers");
      return;
    }

    let res: number;
    switch (operation) {
      case "add":
        res = n1 + n2;
        break;
      case "subtract":
        res = n1 - n2;
        break;
      case "multiply":
        res = n1 * n2;
        break;
      case "divide":
        if (n2 === 0) {
          alert("Cannot divide by zero!");
          return;
        }
        res = n1 / n2;
        break;
    }
    setResult(res);
  };

  const clear = () => {
    setNum1("");
    setNum2("");
    setResult(null);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-100">
      {/* Header with user info and sign out */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <p className="font-medium text-gray-800">{session.user?.name}</p>
              <p className="text-sm text-gray-500">{session.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Calculator */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Simple Calculator
          </h1>

          {/* Number inputs */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Number
              </label>
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="Enter first number"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Second Number
              </label>
              <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                placeholder="Enter second number"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
              />
            </div>
          </div>

          {/* Operation selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operation
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setOperation("add")}
                className={`py-3 rounded-lg font-medium transition-colors ${
                  operation === "add"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                +
              </button>
              <button
                onClick={() => setOperation("subtract")}
                className={`py-3 rounded-lg font-medium transition-colors ${
                  operation === "subtract"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                −
              </button>
              <button
                onClick={() => setOperation("multiply")}
                className={`py-3 rounded-lg font-medium transition-colors ${
                  operation === "multiply"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ×
              </button>
              <button
                onClick={() => setOperation("divide")}
                className={`py-3 rounded-lg font-medium transition-colors ${
                  operation === "divide"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ÷
              </button>
            </div>
          </div>

          {/* Calculate and Clear buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={calculate}
              className="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Calculate
            </button>
            <button
              onClick={clear}
              className="px-6 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              Clear
            </button>
          </div>

          {/* Result display */}
          {result !== null && (
            <div className="bg-linear-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Result:</p>
              <p className="text-3xl font-bold text-blue-600">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
