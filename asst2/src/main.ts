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

  const discriminant: number = (q / 2) * (q / 2) + (p / 3) * (p / 3) * (p / 3);

  if (discriminant < 0) {
    const rootOne = Math.cbrt(-q / 2 + Math.sqrt(-discriminant)) + Math.cbrt(-q / 2 - Math.sqrt(-discriminant)) - b / (3 * a);
    //what the sigma is unity of roots
    (document.getElementById("result") as HTMLInputElement).value = `x=${rootOne} ()`;
  } else if (discriminant > 0) {
    const rootOne = Math.cbrt(-q / 2 + Math.sqrt(-discriminant)) + Math.cbrt(-q / 2 - Math.sqrt(-discriminant)) - b / (3 * a);
    const rootTwo = "complex 1"; // find later
    const rootThree = "complex 2";
    (document.getElementById("result") as HTMLInputElement).value = `x1=${rootOne}, x2=${rootTwo}`;
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
    ctx.strokeStyle = "#6a0dad";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

DrawCoordinateAxes();