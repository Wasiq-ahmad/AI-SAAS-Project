import { useState } from "react";
import axios from "axios";

function AIassistant() {
  const [query, setQuery] = useState("");

  const [response, setResponse] = useState("");

  const onhandle = async () => {
    try {
      const res = await axios.post("http://localhost:8000/assistant", {
        query: query,
      });
      setResponse(res.data.response);
      setQuery("");
      // console.log("Full API Response:", res);
      // console.log("API Response:", res.data);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Something went wrong. Try again!");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 mt-28 w-[600px]">
      <div className="bg-white shadow-md p-6 rounded-lg border flex flex-col gap-5 items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          How can I help you?
        </h2>
        <input
          type="text"
          value={query}
          placeholder="Type your query..."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="mt-3 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p
          className="bg-gray-300 w-[120px] pt-[15px] pb-[15px] text-center rounded-[50px] font-bold cursor-pointer"
          onClick={onhandle}
        >
          Generate
        </p>
      </div>

      <div className="bg-gray-50 shadow-inner p-6 rounded-lg border">
        <p className="text-gray-700">
          {response
            ? response
            : "AI Response will appear here based on your query."}
        </p>
      </div>
    </div>
  );
}

export default AIassistant;
