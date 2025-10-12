import { ChainDistribution } from "../chain-distribution";

export default function ChainDistributionExample() {
  const mockData = [
    { name: "Ethereum", value: 45 },
    { name: "Optimism", value: 25 },
    { name: "Arbitrum", value: 18 },
    { name: "Base", value: 12 },
  ];

  return (
    <div className="p-6 bg-background">
      <ChainDistribution data={mockData} />
    </div>
  );
}
