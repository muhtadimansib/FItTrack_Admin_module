'use client';
import Lottie from 'lottie-react';
import errorAnimation from '@/lottie icons/FailedLoginAttemps.json'; // adjust path

type Props = {
  message: string;
  onClose: () => void;
};

export default function FailureModal({ message, onClose }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg text-center max-w-sm w-full relative">
        <Lottie animationData={errorAnimation} className="w-36 h-36 mx-auto" loop={false} />
        <p className="mt-4 text-lg font-semibold text-red-500">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
