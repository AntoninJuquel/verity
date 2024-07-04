import { DarkLightButton } from "./components/DarkLightButton";
import { StatueComponent } from "./components/StatueComponent";
import { Button } from "./components/ui/button";
import { useVerityStatues } from "./lib/verityStore";

function App() {
  const statues = useVerityStatues();
  return (
    <div className="container mx-auto p-4 text-center">
      <DarkLightButton />
      <div className="grid gap-4 lg:grid-cols-1 xl:grid-cols-3">
        {statues.map((statue, index) => (
          <StatueComponent key={statue.name} statue={statue} index={index} />
        ))}
      </div>
      <Button
        className="absolute bottom-2 left-2"
        size="icon"
        variant="link"
        onClick={() => {
          window.open("https://github.com/AntoninJuquel/verity", "_blank");
        }}
        title="Visit github"
      >
        <img src="/verity/github.svg" alt="github" className="dark:invert" />
      </Button>
    </div>
  );
}

export default App;
