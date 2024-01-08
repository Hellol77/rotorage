export function inputByteCountCalculate(target: string | null) {
  if (!target) return 0;

  return target.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length;
}

export function validateStringNumEngKor(value: string) {
  return !/^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]*$/.test(value);
}
