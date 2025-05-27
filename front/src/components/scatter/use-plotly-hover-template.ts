export function usePlotlyHoverTemplate() {
  const generate = (length: number) => {
    let template = '';

    for (let i = 0; i < length; i += 1) {
      template += `<br><b>%{text[${i}][0]}: </b>%{text[${i}][1]}`;
    }

    return template;
  };

  return {
    generate,
  };
}
