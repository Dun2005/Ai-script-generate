import { useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { Bot, Sparkles, Loader2, PlayCircle } from "lucide-react"; // Import icon Lucide

function App() {
    const [keyword, setKeyword] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!keyword) return alert("Vui lòng nhập từ khóa!");

        setLoading(true);
        setResult(null);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/generate",
                {
                    keyword: keyword,
                },
            );
            // Ép kiểu JSON từ AI
            const aiData = JSON.parse(response.data.script);
            setResult(aiData.script);
        } catch (error) {
            console.error("Lỗi gọi API:", error);
            alert("Có lỗi xảy ra, hãy check console!");
        } finally {
            setLoading(false);
        }
    };

    return (
        // Bố cục căn giữa, nền xám siêu nhạt
        <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-4 font-sans">
            <div className="w-full max-w-4xl space-y-12">
                {/* Phần Header - Thiết kế lại thanh lịch hơn */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-3 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm mb-2">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-sm font-medium">
                            Powered by Gemini AI
                        </span>
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tighter text-gray-950 flex items-center justify-center gap-3">
                        <Bot className="w-12 h-12 text-indigo-600" />
                        AI Script Generator
                    </h1>
                    <p className="text-gray-600 text-lg max-w-xl mx-auto">
                        Biến ý tưởng thành kịch bản video hoàn thiện chỉ trong
                        vài giây.
                    </p>
                </div>

                {/* Khung Nhập Liệu - Thanh Toolbar tích hợp */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Nhập chủ đề, ví dụ: Nguồn gốc hố đen vũ trụ..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        disabled={loading}
                        // Class Tailwind cho input
                        className="flex-1 text-base p-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-indigo-400 focus:ring-indigo-200 focus:ring-2 focus:bg-white outline-none transition-all"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        // Class Tailwind cho nút bấm, có hiệu ứng hover
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-4 px-8 rounded-xl flex items-center gap-2.5 transition-colors min-w-[180px] justify-center"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Đang tạo...
                            </>
                        ) : (
                            <>
                                <PlayCircle className="w-5 h-5" />
                                Tạo Kịch Bản
                            </>
                        )}
                    </button>
                </div>

                {/* Phần Hiển thị Kết quả - White Card sạch sẽ */}
                {result && (
                    <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 space-y-8">
                        <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
                            <Sparkles className="w-7 h-7 text-indigo-600" />
                            <h2 className="text-2xl font-bold text-gray-950">
                                Kịch bản hoàn thiện
                            </h2>
                            <span className="text-sm text-gray-500 ml-auto">
                                Đã sẵn sàng để sản xuất
                            </span>
                        </div>
                        {/* Class 'markdown-content' để nhận CSS định dạng khoảng cách ở index.css */}
                        <div className="markdown-content text-base font-sans text-gray-700 whitespace-pre-wrap leading-relaxed">
                            <ReactMarkdown>{result}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>

            <footer className="py-10 text-center text-gray-400 text-sm mt-auto">
                &copy; 2026 AI Script Generator. Built by Dũng.
            </footer>
        </div>
    );
}

export default App;
