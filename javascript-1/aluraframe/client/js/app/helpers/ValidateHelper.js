class ValidateHelper
{
    constructor(code)
    {
        if(!this._validateCode(code)) throw new Error(`O texto ${code} não é um código válido!`);
        this._code = code;
    }

    _validateCode(code)
    {
        return /\D{3}-\D{2}-\d{2}/.test(code);
    }

    get code()
    {
        return this._code;
    }
}

// let codigo1 = new Codigo('GWZ-JJ-12'); // válido
// console.log(codigo1.texto);
// let codigo2 = new Codigo('1X1-JJ-12'); // inválido
// console.log(codigo2.texto);