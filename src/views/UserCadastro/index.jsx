import axios from "axios";
import { useState, useEffect } from "react";
import "./userCadastro.css"
export function UserCadastro(){

    const [ id, setId ]   = useState("")
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

    const [ classBtnInserir, setClassBtnInserir] = useState('Inserir');
    const [ classBtnAlterar, setClassBtnAlterar] = useState('sumir');

    const [data, setData] = useState([]);

    const url = "http://localhost:3000/cadastrar_user"

    /***  */
    useEffect( () => {
        axios.get(url)
        .then( response => setData(response.data) );
    }, [data, setData])
    /**  */
    const Inserir = () => {
        axios.post(url, {
            nome,
            email,
            senha
        })

        .then( () => {
                alert(nome + " Cadastrado com sucesso")
                setNome(''), setEmail('')
            }
        )
        .catch( (error) => {
            console.log('erro: ' + error)
        })
    }
    
    const Limpar = () => {
        setNome('')
        setEmail('')
        setSenha('')
        setConfirmacaoSenha('')
    }

    const Cadastrar = (e) => {
        e.preventDefault();

        if(nome === "" || email === "" || senha === "" || confirmacaoSenha === ""){
            alert("Preencha todos os campos!");
        }else if(senha!= confirmacaoSenha){
            alert("As senhas não conferem!");
        }else{
            // alert("Cadastro realizado com sucesso!");
            setNome("");
            setEmail("");
            setSenha("");
            setConfirmacaoSenha("");
        }
    }

    /** Metodo Remover  */
    const Remover =(id, nome) => {
        const res = window.confirm('Deseja realmente excluir? ' + nome)
        if(res === true){
            axios.delete(`${url}/${id}`)
            return false
        }
    }

    /** Metodo Carregar campos para editar  */
    const CarregaCampos = (nome, email, senha, id) => {
            setClassBtnInserir('sumir')
            setClassBtnAlterar('')

            setNome(nome), setEmail(email), setSenha(senha), setId(id);
    }

    /** Metodo Alterar  */
    function Alterar(e){
        e.preventDefault()
        console.log(
            "Nome = " + nome, 
            "\n email = " + email, 
            " \n senha = " + senha, 
            " \n id = " + id
        );
        
        // axios.put(url+`/${id}`, {
        axios.put( `${url}/${id}`, {
            nome,
            email,
            senha
        })
        .then( () => {
                alert("Alterado com sucesso " + nome)
                setNome(''), setEmail(''), setSenha(''), setId('');

                setClassBtnInserir('')
                setClassBtnAlterar('sumir')
            }
        )
        .catch( (error) => {
            console.log('erro: ' + error)
        })
        
    }
    
    return(
        <div className="container">
            <h1 className="mt-5 mb-5">Cadastro</h1>

            <form onSubmit={Cadastrar}>
                <div className="row">
                    <div className="col">
                        <input 
                            type="text"
                            value={nome}
                            placeholder="nome"
                            className="form-control"
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input 
                            type="text"
                            value={email}
                            placeholder="e-mail"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="col-2">
                        <input 
                            type="password"
                            value={senha}
                            placeholder="********"
                            className="form-control"
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <div className="col-2">
                        <input 
                            type="password"
                            value={confirmacaoSenha}
                            placeholder="********"
                            className="form-control"
                            onChange={(e) => setConfirmacaoSenha(e.target.value)}
                        />
                    </div>
                </div>
                <div className="btn-group mt-3">
                    <input type="hidden" value={id} name="id" onChange={ e => setId(e.target.value)}   />
                    <button className={`btn btn-outline-primary ${classBtnInserir}`} onClick={Inserir}>Salvar</button>
                    <button className={`btn btn-outline-warning ${classBtnAlterar}`} onClick={Alterar}>Editar</button>
                    <button type="button" className="btn btn-danger" onClick={Limpar}>Cancelar</button>
                </div>
            </form>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="fild-50">Código</th>
                        <th className="fild-100">nome</th>
                        <th className="fild-100">Email</th>
                    </tr>
                </thead>
                <tbody>
                { data.map((item) => (
                      <tr key={item.id}>
                      <td className="fild-50">{item.id}</td>
                      <td>{item.nome}</td>
                      <td>{item.email}</td>
                      <td className="sumir">{item.senha}</td>
                      <td className="fild-btn btn-group">
                            <button 
                                onClick={ () => CarregaCampos( item.nome, item.email, item.senha, item.id ) } 
                                className="btn btn-outline-warning">
                                <i className="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button 
                              onClick={ () => Remover(item.id, item.nome) }  
                              className="btn btn-outline-danger"
                            >
                              <i className="fa-regular fa-trash-can">
                            </i></button>
                      </td>
                    </tr>
                ))
                }    
                </tbody>
            </table>
        </div>
    )
}