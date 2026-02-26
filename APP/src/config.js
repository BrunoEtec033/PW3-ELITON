const dominio = "http://localhost";
const port = "3000";
const base_url = `${dominio}:${port}`;

const routes = {
    selecoes: `${base_url}/selecoes`
};

const GET = async (url)=>{
    try {
        //Configurações da requisição
        let reqOptions = {method: 'GET'};
        //Realiza a requisição na URL fornecida para obter os dados da API
        const result = await fetch(url, reqOptions);
        //Verifica se a resposta da requisição foi bem-sucedida (status 200)
        if(result.status !== 200){
            throw new Error(`Error fetching data: ${result.statusText}`);
        }
        //Retorna os dados da resposta em formato JSON
        return await result.json();
    } catch (error) {
        /*  
            Se ocorrer um erro durante a requisição, 
            ele é capturado e exibido no console, 
            e o erro é lançado novamente para ser tratado em outro lugar do código 
        */     
        console.error(error);
        throw error;
    }
}

const POST = async (url, data)=>{
    try {
        //Configurações da requisição
        let reqOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        //Realiza a requisição na URL fornecida para enviar os dados para a API
        const result = await fetch(url, reqOptions);
        //Verifica se a resposta da requisição foi bem-sucedida (status 200)
        if(result.status !== 200){
            throw new Error(`Error posting data: ${result.statusText}`);
        }
        //Retorna os dados da resposta em formato JSON
        return await result.json();
    } catch (error) {
        /*  
            Se ocorrer um erro durante a requisição, 
            ele é capturado e exibido no console, 
            e o erro é lançado novamente para ser tratado em outro lugar do código 
        */     
        console.error(error);
        throw error;
    }
}

