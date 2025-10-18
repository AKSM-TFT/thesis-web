import Hero from "./components/Hero";

function App() {
  return (
    <div 
      className="min-h-screen w-screen overflow-x-hidden"
      style={{
        background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(13, 43, 34, 0.8) 30%, rgba(22, 56, 40, 1) 100%)`,
        backgroundColor: "#091a0f"
      }}
    >
      <Hero />
    </div>
  );
}

export default App;