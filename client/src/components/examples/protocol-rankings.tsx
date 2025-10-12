import { ProtocolRankings } from "../protocol-rankings";

export default function ProtocolRankingsExample() {
  const mockProtocols = [
    { name: "UniswapX", intents: 458230, percentage: 42 },
    { name: "1inch Fusion", intents: 324156, percentage: 30 },
    { name: "CowSwap", intents: 216104, percentage: 20 },
    { name: "0x Protocol", intents: 86442, percentage: 8 },
  ];

  return (
    <div className="p-6 bg-background">
      <ProtocolRankings protocols={mockProtocols} />
    </div>
  );
}
