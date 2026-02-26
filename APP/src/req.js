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
        //Verifica se a resposta da requisição foi bem-sucedida (status 201)
        if(result.status !== 201){
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

const PUT = async (url, data)=>{
    try {
        //Configurações da requisição
        let reqOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        //Realiza a requisição na URL fornecida para atualizar os dados na API
        const result = await fetch(url, reqOptions);
        //Verifica se a resposta da requisição foi bem-sucedida (status 200)
        if(result.status !== 200){
            throw new Error(`Error updating data: ${result.statusText}`);
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

const PATCH = async (url, data)=>{
    try {
        //Configurações da requisição
        let reqOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        //Realiza a requisição na URL fornecida para atualizar parcialmente os dados na API
        const result = await fetch(url, reqOptions);
        //Verifica se a resposta da requisição foi bem-sucedida (status 200)
        if(result.status !== 200){
            throw new Error(`Error patching data: ${result.statusText}`);
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

const DELETE = async (url)=>{
    try {
        //Configurações da requisição
        let reqOptions = {method: 'DELETE'};
        //Realiza a requisição na URL fornecida para deletar os dados na API
        const result = await fetch(url, reqOptions);
        //Verifica se a resposta da requisição foi bem-sucedida (status 200)
        if(result.status !== 200){
            if(result.status === 404)
                throw new Error(`Error deleting data: Resource not found`);
            else
                throw new Error(`Error deleting data: ${result.statusText}`);
        }
        //Retorna os dados da resposta em formato JSON
        return true;
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

export {GET, POST, PUT, PATCH, DELETE};