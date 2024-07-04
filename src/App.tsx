import StatueComponent from "./components/StatueComponent";
import { Button } from "./components/ui/button";
import { useVerityStatues } from "./lib/verityStore";

function App() {
  const statues = useVerityStatues();
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        {statues.map((statue, index) => (
          <StatueComponent key={statue.name} statue={statue} index={index} />
        ))}
      </div>
      <Button
        // href="https://github.com/AntoninJuquel/verity"
        className="absolute bottom-2 left-2"
        size="icon"
        variant="link"
        onClick={() => {
          window.open("https://github.com/AntoninJuquel/verity", "_blank");
        }}
        title="Visit github"
      >
        <img src="/verity/github.svg" alt="github" />
      </Button>
    </div>
  );
}

export default App;
