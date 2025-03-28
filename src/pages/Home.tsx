import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-gray-900">Mock Interview</h1>
        
        <p className="mt-4 text-lg text-gray-700">
          Prepare for your next job interview with our mock interview platform.
        </p>

        <div className="mt-6">
          <button
            onClick={() => navigate("/webcam")}
            className="bg-zinc-700 text-white px-6 py-3 rounded-lg hover:bg-zinc-600 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
