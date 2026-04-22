import { useState } from "react";
import { useAuctionStore } from "../store/auctionStore";
import { toast } from "react-toastify";

const CreateAuction = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [endTime, setEndTime] = useState("");
  const [images, setImages] = useState([]);

  const { createAuction, loading, error } = useAuctionStore();

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !startingPrice || !endTime) {
      return toast.error("All fields are required!");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("startingPrice", Number(startingPrice));
    formData.append("endTime", endTime);

    images.forEach((img) => {
      formData.append("images", img);
    });

    const res = await createAuction(formData);

    if (!res) return; // error already handled in store

    toast.success("Auction created successfully!");

    // reset
    setTitle("");
    setDescription("");
    setStartingPrice("");
    setEndTime("");
    setImages([]);
  };

  return (
    <div className="max-w-2xl mx-auto bg-[var(--color-card)] p-8 rounded-2xl shadow-md py-18 my-30">
      <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
        Create Auction
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Auction Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border border-[var(--color-border)] rounded-lg"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 border border-[var(--color-border)] rounded-lg"
        />

        <input
          type="number"
          placeholder="Starting Price"
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
          className="p-3 border border-[var(--color-border)] rounded-lg"
        /> 

        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          clas sName="p-3 border border-[var(--color-border)] rounded-lg"
        />

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="p-3 border border-[var(--color-border)] rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold transition mt-2"
        >
          {loading ? "Creating..." : "Create Auction"}
        </button>

        {error && (
          <p className="text-red-400 text-sm text-center">
            {error}
          </p>
        )}

      </form>
    </div>
  );
};

export default CreateAuction;