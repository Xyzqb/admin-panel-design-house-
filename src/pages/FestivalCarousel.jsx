const FestivalCarousel = ({ navigate }) => {
  const [festivalName, setFestivalName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [titles, setTitles] = useState(["", "", ""]);
  const [images, setImages] = useState(Array(4).fill(null));

  const handleSave = () => {
    if (!festivalName || !startDate || !endDate) {
      toast.error("Festival name & dates required");
      return;
    }

    const uploaded = images.filter(Boolean);
    if (uploaded.length < 4) {
      toast.error("Minimum 4 images required");
      return;
    }

    const festivalCarousel = {
      id: Date.now(),
      festivalName,
      startDate,
      endDate,
      titles: titles.filter(t => t.trim()),
      images: uploaded,
      status: "active",
      createdAt: new Date().toISOString()
    };

    const existing =
      JSON.parse(localStorage.getItem("festivalCarousels")) || [];

    localStorage.setItem(
      "festivalCarousels",
      JSON.stringify([festivalCarousel, ...existing])
    );

    toast.success("Festival carousel added 🎉");
    navigate("/carousel");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Add Festival Carousel</h1>

      <input
        placeholder="Festival Name (Diwali)"
        className="input"
        onChange={e => setFestivalName(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <input type="date" onChange={e => setStartDate(e.target.value)} />
        <input type="date" onChange={e => setEndDate(e.target.value)} />
      </div>

      {/* reuse your image upload UI here */}

      <button
        onClick={handleSave}
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl"
      >
        Save Festival Carousel
      </button>
    </div>
  );
};
export default FestivalCarousel;