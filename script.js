document.addEventListener("DOMContentLoaded", () => {
    const elevator = document.getElementById("elevator");
    const doorLeft = document.getElementById("door-left");
    const doorRight = document.getElementById("door-right");
    const logList = document.getElementById("logList");
    const floorLabels = document.querySelectorAll(".floor-label");
    let currentFloor = 0;
  
    let logs = [];
  
    function openDoors() {
      doorLeft.classList.add("open-left");
      doorRight.classList.add("open-right");
    }
  
    function closeDoors() {
      doorLeft.classList.remove("open-left");
      doorRight.classList.remove("open-right");
    }
  
    function updateFloorLabel(floor) {
      floorLabels.forEach((label, index) => {
        if (index === floor) {
          label.style.color = "#4b7bec"; // Cor para destacar o andar atual
        } else {
          label.style.color = "#000"; // Cor normal para os outros andares
        }
      });
    }
    function addLog(targetFloor) {
        const direction = targetFloor > currentFloor ? "subiu" : targetFloor < currentFloor ? "desceu" : "permaneceu";
        const logItem = document.createElement("li");
        logItem.textContent = `Elevador ${direction} para o andar ${targetFloor}`;
        logs.push(logItem);
        logList.appendChild(logItem);
      }
      
      function goToFloor(floor) {
        if (floor === currentFloor) return; // evita repetição desnecessária
      
        closeDoors();
        setTimeout(() => {
          elevator.style.bottom = `${floor * 100}px`;
          addLog(floor);
          currentFloor = floor;
          updateFloorLabel(floor);
          setTimeout(() => {
            openDoors();
          }, 2000);
        }, 1000);
      }
      
    // Botões conectados via addEventListener
    document.getElementById("btn0").addEventListener("click", () => goToFloor(0));
    document.getElementById("btn1").addEventListener("click", () => goToFloor(1));
    document.getElementById("btn2").addEventListener("click", () => goToFloor(2));
    document.getElementById("btn3").addEventListener("click", () => goToFloor(3));
  
    // Função para limpar os logs
    document.getElementById("clearLogs").addEventListener("click", () => {
      logs = [];
      logList.innerHTML = "";
    });
  
    // Abre portas no térreo ao carregar
    openDoors();
    updateFloorLabel(currentFloor);
  });
  