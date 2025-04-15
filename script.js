let towers = { A: [], B: [], C: [] };
let diskElements = {};
let numDisks = 3;
let moveCount = 0;
let moveQueue = [];

function createDisks() {
  towers = { A: [], B: [], C: [] };
  ["A", "B", "C"].forEach(id => {
    document.getElementById(id).innerHTML = "";
  });

  diskElements = {};
  moveCount = 0;
  document.getElementById("moveCount").textContent = moveCount;
  document.getElementById("message").textContent = "";

  for (let i = numDisks; i >= 1; i--) {
    const disk = document.createElement("div");
    disk.className = "disk";
    disk.style.width = `${i * 30}px`;
    disk.style.left = `-${(i * 30) / 2 - 5}px`;
    disk.textContent = i;
    towers.A.push(i);
    diskElements[i] = disk;
    document.getElementById("A").appendChild(disk);
    updateDiskPosition("A");
  }
}

function startHanoi() {
  numDisks = parseInt(document.getElementById("diskInput").value);
  createDisks();
  moveQueue = [];
  generateMoves(numDisks, "A", "C", "B");
  animateMoves();
}

function updateDiskPosition(poleId) {
  const pole = document.getElementById(poleId);
  const disks = towers[poleId];

  disks.forEach((diskSize, index) => {
    const disk = diskElements[diskSize];
    disk.style.bottom = `${index * 22}px`;
    if (!pole.contains(disk)) pole.appendChild(disk);
  });
}

function moveDisk(from, to) {
  const disk = towers[from].pop();
  towers[to].push(disk);
  updateDiskPosition(from);
  updateDiskPosition(to);
  moveCount++;
  document.getElementById("moveCount").textContent = moveCount;
}

function generateMoves(n, from, to, aux) {
  if (n === 0) return;
  generateMoves(n - 1, from, aux, to);
  moveQueue.push([from, to]);
  generateMoves(n - 1, aux, to, from);
}

function animateMoves() {
  if (moveQueue.length === 0) {
    setTimeout(() => {
      celebrate();
    }, 300);
    return;
  }

  const [from, to] = moveQueue.shift();
  moveDisk(from, to);
  setTimeout(animateMoves, 500);
}

function celebrate() {
  document.getElementById("message").textContent = "✅ Task Completed!";
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}
