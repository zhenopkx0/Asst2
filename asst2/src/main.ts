import './style.css'

const form = document.getElementById("form") as HTMLFormElement;

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const a: number = Number(formData.get("a"));
  const b: number = Number(formData.get("b"));
  const c: number = Number(formData.get("c"));
  const d: number = Number(formData.get("d"));

  const p: number = (3 * a * c - b * b) / (3 * a * a);
  const q: number = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);

  // Display p and q values
  const pResult = document.getElementById("p-result") as HTMLParagraphElement;
  pResult.textContent = p.toString();

  const qResult = document.getElementById("q-result") as HTMLParagraphElement;
  qResult.textContent = q.toString();

  const discriminant: number = (q / 2) * (q / 2) + (p / 3) * (p / 3) * (p / 3);

  const theta: number = (1/3)*Math.acos(-q / (2 * Math.sqrt(-(p / 3) * (p / 3) * (p / 3))));

  if (discriminant < 0) {
    const rootOne = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a);
    const rootTwo = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI / 3)) - b / (3 * a);
    const rootThree = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI / 3)) - b / (3 * a);
    (document.getElementById("result") as HTMLInputElement).value = `x=${rootOne} (x1), x=${rootTwo} (x2), x=${rootThree} (x3)`;
  } else if (discriminant > 0) {
    const rootOne = Math.cbrt(-q / 2 + Math.sqrt(-discriminant)) + Math.cbrt(-q / 2 - Math.sqrt(-discriminant)) - b / (3 * a);
    (document.getElementById("result") as HTMLInputElement).value = `x1=${rootOne} and two complex roots`;
  } else {
    if (q === 0 && p === 0) {
      const rootOne = Math.cbrt((-q / 2) + Math.sqrt(discriminant)) + Math.cbrt((-q / 2) - Math.sqrt(discriminant)) - b / (3 * a);
      (document.getElementById("result") as HTMLInputElement).value = `x=${rootOne} (Triple root)`;
    } else {
      const rootOne = Math.cbrt((-q / 2) + Math.sqrt(discriminant)) + Math.cbrt((-q / 2) - Math.sqrt(discriminant)) - b / (3 * a); // Cardano
      const rootTwo = -Math.cbrt(-q / 2) - b / (3 * a); // Single root
      (document.getElementById("result") as HTMLInputElement).value = `x1=${rootOne}, (Double root) x2=${rootTwo} (Single root)`;
    }
  }
})


const canvas = document.getElementById("graph") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

function DrawCoordinateAxes() {
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }
}

function DrawCubicFunction(a: number, b: number, c: number, d: number) {
  if (ctx) { // i dont even know whats happening here i just tabbed it in 
    ctx.beginPath();
    for (let x = -canvas.width / 2; x <= canvas.width / 2; x++) {
      const y = a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
      const canvasX = x + canvas.width / 2;
      const canvasY = canvas.height / 2 - y;
      if (x === -canvas.width / 2) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }
    ctx.strokeStyle = "#66ccff";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

DrawCoordinateAxes();

DrawCubicFunction(0.2, -13, 0, 12); // Example coefficients for the cubic function