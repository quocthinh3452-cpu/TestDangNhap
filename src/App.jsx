import { useState, useEffect } from "react";
import { auth, googleProvider, githubProvider } from "./firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  // Lắng nghe trạng thái đăng nhập
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  // Nếu CHƯA đăng nhập -> Hiện trang Login
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Đăng Nhập</h2>
          <button 
            onClick={() => handleLogin(googleProvider)}
            className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded mb-4 hover:bg-red-600 transition"
          >
            Đăng nhập bằng Gmail
          </button>
          <button 
            onClick={() => handleLogin(githubProvider)}
            className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded hover:bg-gray-900 transition"
          >
            Đăng nhập bằng GitHub
          </button>
        </div>
      </div>
    );
  }

  // Nếu ĐÃ đăng nhập -> Hiện trang chủ thông tin nhóm
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="flex items-center gap-4">
            <img src={user.photoURL} alt="Avatar" className="w-12 h-12 rounded-full border border-gray-300" />
            <div>
              <p className="text-gray-600 text-sm">Xin chào,</p>
              <p className="font-bold text-gray-800">{user.displayName || user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Đăng xuất
          </button>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-600">ĐỒ ÁN / BÀI TẬP MÔN HỌC</h1>
          <p className="text-gray-500 mt-2">Đề tài: Tích hợp xác thực mạng xã hội</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">Thông tin nhóm</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sinh viên 1 */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
            <div className="w-20 h-20 bg-blue-200 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold text-blue-600">SV1</div>
            <h3 className="font-bold text-lg text-gray-800">Nguyễn Văn A</h3>
            <p className="text-sm text-gray-600">MSSV: 12345678</p>
            <p className="text-sm text-gray-500 mt-1">Vai trò: Trưởng nhóm</p>
          </div>

          {/* Sinh viên 2 */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
            <div className="w-20 h-20 bg-blue-200 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold text-blue-600">SV2</div>
            <h3 className="font-bold text-lg text-gray-800">Trần Thị B</h3>
            <p className="text-sm text-gray-600">MSSV: 87654321</p>
            <p className="text-sm text-gray-500 mt-1">Vai trò: Frontend</p>
          </div>

          {/* Sinh viên 3 */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
            <div className="w-20 h-20 bg-blue-200 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold text-blue-600">SV3</div>
            <h3 className="font-bold text-lg text-gray-800">Lê Văn C</h3>
            <p className="text-sm text-gray-600">MSSV: 11223344</p>
            <p className="text-sm text-gray-500 mt-1">Vai trò: Tích hợp API</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;