import pool from '../../core/database/pool.js';

const FuncionarioRepository = {
    async create(data){
        const [result] = await pool.execute(`INSERT INTO funcionario(nome, cpf, data_nasc, telefone, cargo) 
            VALUES(?, ?, ?, ?, ?)`, 
            [data.nome, data.cpf, data.data_nasc, data.telefone, data.cargo]);
        return result;
    },
    
}

export default FuncionarioRepository;