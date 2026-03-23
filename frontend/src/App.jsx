import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";
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
            const res = JSON.parse(response.data.script);
            setResult(res.script);
        } catch (error) {
            console.error("Lỗi gọi API:", error);
            alert("Có lỗi xảy ra, hãy check console!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <div className="title-container">
                <h1>🚀 AI Script Generator</h1>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Nhập từ khóa..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button onClick={handleGenerate} disabled={loading}>
                    {loading ? "Đang tạo..." : "Tạo Script"}
                </button>
            </div>
            <div className="output-container">
                <ReactMarkdown>{result}</ReactMarkdown>
            </div>
        </div>
    );
}

export default App;
