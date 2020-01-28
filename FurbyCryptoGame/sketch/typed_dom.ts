
interface TextBox extends p5.Element {
    changed(fxn: ((...args: any[]) => any)) : any;
}
function make_input() : TextBox {
  let input = createInput("");
  if ("changed" in input) {
    return input;
  }
}
