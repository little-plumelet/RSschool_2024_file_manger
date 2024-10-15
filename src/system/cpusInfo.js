import { cpus as nodeCpus } from "node:os";

function cpusInfo() {
  const cpus = nodeCpus();
  const numCPUs = cpus.length;

  console.log(`Total number of CPUs: ${numCPUs}`);

  const cpuData = cpus.map((cpu, index) => ({
    CPU: `CPU ${index + 1}`,
    Model: cpu.model,
    "Clock Rate (GHz)": (cpu.speed / 1000).toFixed(2),
  }));

  console.table(cpuData);
}

export default cpusInfo;
