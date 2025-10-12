import { VolumeChart } from "../volume-chart";

export default function VolumeChartExample() {
  const mockData = [
    { date: "Jan 1", ethereum: 4000, optimism: 2400, arbitrum: 1800, base: 1200 },
    { date: "Jan 5", ethereum: 3000, optimism: 1398, arbitrum: 2100, base: 980 },
    { date: "Jan 10", ethereum: 5000, optimism: 3800, arbitrum: 2500, base: 1500 },
    { date: "Jan 15", ethereum: 2780, optimism: 3908, arbitrum: 1900, base: 1200 },
    { date: "Jan 20", ethereum: 4890, optimism: 4800, arbitrum: 3100, base: 2100 },
    { date: "Jan 25", ethereum: 6390, optimism: 3800, arbitrum: 2900, base: 1800 },
    { date: "Jan 30", ethereum: 7490, optimism: 4300, arbitrum: 3500, base: 2300 },
  ];

  return (
    <div className="p-6 bg-background">
      <VolumeChart data={mockData} />
    </div>
  );
}
