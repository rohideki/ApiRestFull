

module.exports.formatarCPF = async (data) => {

	let dado;
	let cpf = []
	//for (let i of data.cpf) {
		//retira os caracteres indesejados...
		dado = data.cpf.replace(/[^\d]/g, "");

		dado = (("00000000000" + dado).slice(-11))
		//realizar a formatação...



		cpf.push(dado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"))


	//}
  
	return cpf
}