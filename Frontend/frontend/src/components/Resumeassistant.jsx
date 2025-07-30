import { useState } from "react";

function ResumeAssistant() {
  const [fileName, setFileName] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setFeedback("Reviewing your resume... Please wait.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/cv-review", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      setFeedback(data.response);
    } catch (error) {
      setFeedback("Error reviewing the resume. Please try again.");
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 mt-28 w-[600px]">
      <div className="bg-white shadow-md p-6 rounded-lg border flex flex-col gap-5 items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Upload your resume
        </h2>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
          className="w-full border px-4 py-2 rounded-md"
        />
        {fileName && (
          <p className="text-sm text-gray-600">Uploaded: {fileName}</p>
        )}
      </div>

      <div className="bg-gray-50 shadow-inner p-6 rounded-lg border min-h-[100px]">
        <p className="text-gray-700 whitespace-pre-wrap">{feedback}</p>
      </div>
    </div>
  );
}

export default ResumeAssistant;
