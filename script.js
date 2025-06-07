let isDrawing = false;

document.addEventListener('mousedown', () => isDrawing = true);
document.addEventListener('mouseup', () => isDrawing = false);

function createGrid(size) {
    const container = document.getElementById('grid-container');
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

	for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

      

        cell.dataset.darken = '0';
        cell.dataset.rgb = '';

        cell.addEventListener('mouseover', (e) => {
            if (!isDrawing) return;
            if (!cell.dataset.rgb) {
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                cell.dataset.rgb = `${r}, ${g}, ${b}`;  
                cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                cell.dataset.darken = 1; 
            } else {
                let [r, g, b] = cell.dataset.rgb.split(',').map(Number);
                let darkenFactor = parseInt(cell.dataset.darken);
                if (darkenFactor < 10) {
                    r = Math.floor(r * 0.9);
                    g = Math.floor(g * 0.9);
                    b = Math.floor(b * 0.9);
                    cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                    cell.dataset.rgb = `%{r}, ${g}, ${b}`;
                    cell.dataset.darken = darkenFactor + 1;
                }
            }
        });

        container.appendChild(cell);
    }
}

document.getElementById('resize-button').addEventListener('click', () => {
  let input = prompt("Enter number of squares per side (max 100):");
  let size = parseInt(input);

  if (!isNaN(size) && size > 0 && size <= 100) {
    createGrid(size);
  } else {
    alert("⚠️ Please enter a valid number between 1 and 100.");
  }
});

createGrid(16);