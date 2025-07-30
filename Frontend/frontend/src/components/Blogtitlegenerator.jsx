import { useState } from "react";
import axios from "axios";

function BlogTitleGenerator() {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");

  //  const [response, setResponse] = useState("");

  const onhandle = async () => {
    try {
      const res = await axios.post("http://localhost:8000/assistant", {
        query: topic,
      });
      setTitle(res.data.response);
      setTopic("");
      // console.log("Full API Response:", res);
      // console.log("API Response:", res.data);
    } catch (error) {
      console.error("Error:", error);
      setTitle("Something went wrong. Try again!");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 mt-28 w-[600px]">
      <div className="bg-white shadow-md p-6 rounded-lg border flex flex-col gap-5 items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Enter your blog topic
        </h2>
        <input
          type="text"
          value={topic}
          placeholder="e.g., React performance optimization"
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p
          className="bg-blue-500 text-white cursor-pointer w-[120px] pt-[15px] pb-[15px] text-center rounded-[50px] font-bold"
          onClick={onhandle}
        >
          Generate
        </p>
      </div>

      <div className="bg-gray-50 shadow-inner p-6 rounded-lg border min-h-[80px]">
        <p className="text-gray-700">{title}</p>
      </div>
    </div>
  );
}

export default BlogTitleGenerator;
