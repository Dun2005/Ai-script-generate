import { useState } from "react";
import axios from "axios";

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

            setResult(response.data.script);
        } catch (error) {
            console.error("Lỗi gọi API:", error);
            alert("Có lỗi xảy ra, hãy check console!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "50px auto",
                fontFamily: "sans-serif",
            }}
        >
            <h2>🚀 AI Script Generator</h2>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Nhập chủ đề, VD: Nguồn gốc hố đen..."
                    style={{ flex: 1, padding: "10px" }}
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    style={{ padding: "10px 20px", cursor: "pointer" }}
                >
                    {loading ? "Đang suy nghĩ..." : "Tạo Kịch Bản"}
                </button>
            </div>

            {result && (
                <div
                    style={{
                        background: "#f4f4f4",
                        padding: "15px",
                        borderRadius: "8px",
                        textAlign: "left",
                    }}
                >
                    <h3>Kết quả:</h3>
                    <pre
                        style={{
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                        }}
                    >
                        {result}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default App;
