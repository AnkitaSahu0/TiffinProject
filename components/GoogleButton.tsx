import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
  return (
    <button
      type="button"
      className="text-gray-700 w-full flex items-center justify-center gap-3 border py-2 rounded-xl hover:bg-orange-50 transition bg-gray-100"
      onClick={() => alert("Google Login requires backend (Firebase / NextAuth)")}
    >
      <FcGoogle size={30}/>
      Continue with Google
    </button>
  );
}
