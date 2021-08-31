

module.exports.formatarFone = async (data) => {


    if(data.fone.length == 11){
        let dado;
        let fone = []
        //for (let i of data.cpf) {
            //retira os caracteres indesejados...
            dado = data.fone.replace(/[^\d]/g, "");
    
            dado = (("00000000000" + dado).slice(-11))
            //realizar a formatação...
    
    
    
            fone.push(dado.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3"))
    
            return fone
    }
    if(data.fone.length == 10){
        let dado;
        let fone = []
        //for (let i of data.cpf) {
            //retira os caracteres indesejados...
            dado = data.fone.replace(/[^\d]/g, "");
    
            dado = (("0000000000" + dado).slice(-10))
            //realizar a formatação...
    
    
    
            fone.push(dado.replace(/(\d{2})(\d{4})(\d{4})/, "($1)$2-$3"))
    
            return fone
	
	}
	}