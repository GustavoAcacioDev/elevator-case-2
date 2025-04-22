document.addEventListener("DOMContentLoaded", () => {
  const elevator = document.getElementById("elevator");
  const doorLeft = document.getElementById("door-left");
  const doorRight = document.getElementById("door-right");
  const doors = document.querySelector(".doors");
  const logList = document.getElementById("logList");
  const floorLabels = document.querySelectorAll(".floor-label");
  const panelIndicator = document.querySelector(".panel-indicator");
  const currentFloorDisplay = document.getElementById("current-floor-display");
  let currentFloor = 0;
  let isMoving = false;
  let isDoorsOpen = true;

  // Sons do elevador (opcionais)
  const doorSound = new Audio();
  doorSound.src = "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3";
  doorSound.volume = 0.3;

  const elevatorSound = new Audio();
  elevatorSound.src = "https://assets.mixkit.co/active_storage/sfx/213/213-preview.mp3";
  elevatorSound.volume = 0.2;

  let logs = [];

  function updatePanelIndicator() {
    // Muda a cor do indicador dependendo do estado do elevador
    if (isMoving) {
      panelIndicator.style.background = "#FFC107"; // Amarelo quando em movimento
      panelIndicator.style.boxShadow = "0 0 5px #FFC107";
    } else if (isDoorsOpen) {
      panelIndicator.style.background = "#4CAF50"; // Verde quando as portas estão abertas
      panelIndicator.style.boxShadow = "0 0 5px #4CAF50";
    } else {
      panelIndicator.style.background = "#F44336"; // Vermelho quando as portas estão fechadas
      panelIndicator.style.boxShadow = "0 0 5px #F44336";
    }
  }

  function updateElevatorInterior() {
    const interior = document.querySelector('.elevator-interior');
    if (isDoorsOpen) {
      interior.style.opacity = "1";
    } else {
      interior.style.opacity = "0";
    }
  }

  function openDoors() {
    doorLeft.classList.add("open-left");
    doorRight.classList.add("open-right");
    doorSound.currentTime = 0;
    doorSound.play();
    isDoorsOpen = true;
    updatePanelIndicator();
    
    // Tornar o interior visível após o tempo de abertura da porta
    setTimeout(updateElevatorInterior, 500);
  }

  function closeDoors() {
    // Esconder o interior antes das portas começarem a fechar
    isDoorsOpen = false;
    updateElevatorInterior();
    
    doorLeft.classList.remove("open-left");
    doorRight.classList.remove("open-right");
    doorSound.currentTime = 0;
    doorSound.play();
    updatePanelIndicator();
  }

  function updateFloorLabel(floor) {
    // Atualiza o visor de andar
    currentFloorDisplay.textContent = floor === 0 ? "T" : floor;
    
    // Atualiza as labels ao lado do elevador
    floorLabels.forEach((label, index) => {
      let reversedIndex = 3 - index; // Invertendo o índice para corresponder aos andares
      if (reversedIndex === floor) {
        label.style.color = "#4b7bec"; // Cor para destacar o andar atual
        label.style.fontSize = "22px"; // Aumenta o tamanho da fonte
      } else {
        label.style.color = "#444"; // Cor normal para os outros andares
        label.style.fontSize = "18px"; // Tamanho normal da fonte
      }
    });
  }

  function addLog(targetFloor) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const floorName = targetFloor === 0 ? "Térreo" : `Andar ${targetFloor}`;
    
    // Determina a direção
    let direction;
    if (targetFloor > currentFloor) direction = "subiu";
    else if (targetFloor < currentFloor) direction = "desceu";
    else direction = "permaneceu";
    
    const logItem = document.createElement("li");
    logItem.textContent = `[${timestamp}] Elevador ${direction} para o ${floorName}`;
    
    logs.push(logItem);
    logList.insertBefore(logItem, logList.firstChild); // Adiciona o log mais recente no topo
    
    // Limita o número de logs visíveis (opcional)
    if (logs.length > 50) {
      logList.removeChild(logList.lastChild);
      logs.pop();
    }
  }
  
  function goToFloor(floor) {
    // Evita repetição ou movimento durante uma viagem atual
    if (floor === currentFloor || isMoving) return;
    
    isMoving = true;
    updatePanelIndicator();
    
    // Desabilita os botões durante o movimento
    const buttons = document.querySelectorAll(".panel button");
    buttons.forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = "0.6";
    });
    
    closeDoors();
    
    setTimeout(() => {
      // Inicia o som do elevador
      elevatorSound.currentTime = 0;
      elevatorSound.play();
      
      // Move o elevador
      elevator.style.bottom = `${floor * 100}px`;
      addLog(floor);
      currentFloor = floor;
      updateFloorLabel(floor);
      
      // Espera o movimento terminar
      setTimeout(() => {
        isMoving = false;
        updatePanelIndicator();
        openDoors();
        
        // Reativa os botões
        buttons.forEach(btn => {
          btn.disabled = false;
          btn.style.opacity = "1";
        });
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

  // Atalhos de teclado
  document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "3") {
      goToFloor(parseInt(e.key));
    }
  });

  // Abre portas no térreo ao carregar
  openDoors();
  updateFloorLabel(currentFloor);
  
  // Garantir que o interior esteja visível na inicialização
  setTimeout(() => {
    const interior = document.querySelector('.elevator-interior');
    interior.style.opacity = "1";
  }, 1000);
});