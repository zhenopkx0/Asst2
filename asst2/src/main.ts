import './style.css'

const form = document.getElementById("form") as HTMLFormElement;

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const a: number = Number(formData.get("a"));
    const b: number = Number(formData.get("b"));
    const c: number = Number(formData.get("c"));
    const d: number = Number(formData.get("d"));

    const p: number = (3*a*c - b*b)/(3*a*a);
    const q: number = (2*b*b*b - 9*a*b*c + 27*a*a*d)/(27*a*a*a);
    const discriminant: number = (q/2)*(q/2) + (p/3)*(p/3)*(p/3);

    if (discriminant < 0) {
        (document.getElementById("result") as HTMLInputElement).value = "No Roots";
    } else if (discriminant > 0) {
        const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
        const rootTwo = (-b - Math.sqrt(discriminant)) / (2 * a);
        (document.getElementById("result") as HTMLInputElement).value = `x1=${rootOne}, x2=${rootTwo}`;
    } else {
      if (q === 0 && p === 0) {
        const rootOne = Math.cbrt((-q/2)+Math.sqrt(discriminant)) + Math.cbrt((-q/2)-Math.sqrt(discriminant)) - b/(3*a);
        (document.getElementById("result") as HTMLInputElement).value = `x=${rootOne} (Triple root)`;
      } else {
        const rootOne = Math.cbrt((-q/2)+Math.sqrt(discriminant)) + Math.cbrt((-q/2)-Math.sqrt(discriminant)) - b/(3*a);
        const rootTwo = -Math.cbrt(-q/2) - b/(3*a);
        (document.getElementById("result") as HTMLInputElement).value = `x1=${rootOne}, x2=${rootTwo} (Double root)`;
      }
    }
})

