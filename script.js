const faixas = [
    { limite: 6677.55, aliquota: 0.0, parcelaDeduzir: 0 },
    { limite: 9922.28, aliquota: 0.075, parcelaDeduzir: 500.82 },
    { limite: 13167, aliquota: 0.15, parcelaDeduzir: 1244.99 },
    { limite: 16380.38, aliquota: 0.225, parcelaDeduzir: 2232.51 },
    { limite: Infinity, aliquota: 0.275, parcelaDeduzir: 3051.53 }
  ];


const faixasSegundoSemestre = [
    { limite: 7407.11, aliquota: 0.0, parcelaDeduzir: 0 },
    { limite: 9922.28, aliquota: 0.075, parcelaDeduzir: 555.53 },
    { limite: 13167, aliquota: 0.15, parcelaDeduzir: 1299.70 },
    { limite: 16380.38, aliquota: 0.225, parcelaDeduzir: 2287.23 },
    { limite: Infinity, aliquota: 0.275, parcelaDeduzir: 3106.25 }
  ];


function formatarValor(element) {
    const valor = element.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    const valorFormatado = (parseFloat(valor) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    element.value = valorFormatado;
}


function calculaPLR_semestre_1() {

    // obtem o valor da 1° plr digitado
    let plrInput = document.getElementById("plr1").value;

    // formata para valor numérico
    let plr1 = parseFloat(plrInput.replace(/\D/g, '').replace(',', '.')) / 100;


    // Iterar sobre as faixas e encontrar a alíquota e parcela a deduzir correspondente ao valor do PLR
    for (const faixa of faixas) {
        if (plr1 <= faixa['limite']) {
        aliquota1 = faixa['aliquota'];
        deducao1 = faixa['parcelaDeduzir'];
        break;
        }
    }


    let impostoDeRenda1 = (plr1 * aliquota1) - deducao1; // imposto a pagar
    let plrLiquido1 = plr1 - impostoDeRenda1; // imposto a pagar - plr bruto

    // Formata o resultado do PLR líquido
    let resultadoFormatado = (plrLiquido1).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Formata o resultado da deducao
    let deducaoFormatada = (deducao1).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 3
    });


    // Formata o resultado do IR
    let impostoFormatado = (impostoDeRenda1).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 3
    });

    // Exibe o resultado na página
    document.getElementById("resultado1").innerHTML = resultadoFormatado;
    document.getElementById("parcelaSpan").innerHTML = deducaoFormatada;
    document.getElementById("aliquotaSpan").innerHTML =  `${(aliquota1 * 100).toFixed(1)}%`;
    document.getElementById("imposto-renda1").innerHTML = impostoFormatado;

    // Exibe o resultado total 

    // Formata o plr 1
    let plrFormatado = (plr1).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });


    document.getElementById("plr-periodo-1").innerHTML = plrFormatado;
    document.getElementById("plr-total").innerHTML = plrFormatado;
    document.getElementById("imposto-renda-total").innerHTML = impostoFormatado;
    document.getElementById("plr-liquido-total").innerHTML = resultadoFormatado;
    

    return [plr1, impostoDeRenda1, plrLiquido1];
}


function calculaPLR_semestre_2() {

    // PLR bruto 1
    let primeiroPLR_input = document.getElementById("plr1").value;
    let plr1 = parseFloat(primeiroPLR_input.replace(/\D/g, '').replace(',', '.')) / 100;

    // PLR bruto 2
    let segundoPLR_input = document.getElementById("plr2").value;
    let plr2 = parseFloat(segundoPLR_input.replace(/\D/g, '').replace(',', '.')) / 100;


    let [plrLiquido1, impostoDeRenda1] = calculaPLR_semestre_1()

    
    let plrTotal = (plr1 + plr2);

    
    console.log("PLR do primeiro semestre:", plr1);
    console.log("Imposto de Renda do primeiro semestre:", impostoDeRenda1);
    console.log("PLR liquido do primeiro semestre:", plrLiquido1);

    console.log("PLR do segundo semestre:", plr2);    
    console.log("PLR Total:", plrTotal);

    // Iterar sobre as faixas e encontrar a correspondente ao valor do PLR
    for (const faixa of faixasSegundoSemestre) {
        if (plrTotal <= faixa['limite']) {
        aliquota2 = faixa['aliquota'];
        deducao2 = faixa['parcelaDeduzir'];
        break;
        }
    }
    

    let impostoDeRendaTotal = (plrTotal * aliquota2) - deducao2; // imposto a pagar
    let impostoDeRenda2 = impostoDeRendaTotal - impostoDeRenda1; // imposto a pagar - imposto pago na parcela 1
    let plrLiquido2 = plr2 - impostoDeRenda2; // plr bruto 2 - imposto real = plr líquida

    // Exibe o resultado na página
    let resultadoFormatado = (plrLiquido2).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Exibe o resultado na página
    let deducaoFormatada = (deducao2).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 3
    });

    // Exibe o resultado na página
    let impostoFormatado = (impostoDeRenda2).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 3
    });



    document.getElementById("resultado2").innerHTML = resultadoFormatado;
    document.getElementById("parcelaSpan2").innerHTML = deducaoFormatada;
    document.getElementById("aliquotaSpan2").innerHTML =  `${(aliquota2 * 100).toFixed(1)}%`;
    document.getElementById("imposto-renda2").innerHTML = impostoFormatado;

    // totais
    
    // Formata o plr 2

    irAnual = impostoDeRenda1 + impostoDeRenda2;
    plrLiquidoAnual = plrLiquido1 + plrLiquido2;

    let plrFormatado = (plr2).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    let plrTotalFormatado = (plrTotal).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    let impostoAnualFormatado = (irAnual).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 3
    });

    let plrLiquidoAnualFormatado = (plrLiquidoAnual).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });


    document.getElementById("plr-periodo-2").innerHTML = plrFormatado;
    document.getElementById("plr-total").innerHTML = plrTotalFormatado;
    document.getElementById("imposto-renda-total").innerHTML = impostoAnualFormatado;
    document.getElementById("plr-liquido-total").innerHTML = plrLiquidoAnualFormatado;

    return [plr2, impostoDeRenda2];
}