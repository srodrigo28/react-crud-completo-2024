import axios from "axios"
import { useState, useEffect } from "react"
import "./categoria.css"

export function Categoria(){
    const [data, setData] = useState([])
    const url = "http://localhost:3000/categoria"

    const [ id, setId ]   = useState("")
    const [nome, setNome] = useState("")

    const [ classBtnInserir, setClassBtnInserir] = useState('Inserir')
    const [ classBtnAlterar, setClassBtnAlterar] = useState('sumir')
    
    /*** Carrega Dados iniciais  */
    useEffect( () => {
        axios.get(url)
        .then( response => setData(response.data) )
    }, [data, setData])
    
    /** Insere no banco  */
    const Inserir = () => {
        axios.post(url, {
            nome
        })
        .then( () => {
                alert(nome + " Cadastrado com sucesso")
                setNome('')
            }
        )
        .catch( (error) => {
            console.log('erro: ' + error)
        })
    }
    /** Limpa campos  */
    const Limpar = () => {
        setNome('')
    }
    /** Cadastrar usando o Inser */
    const Validar = (e) => {
        e.preventDefault();

        if(nome === ""){
            alert("Preencha o campo categoria!");
        }else{
            // alert("Cadastro realizado com sucesso!");
            Inserir();
            setNome("");
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
    const CarregaCampos = (nome, id) => {
            setClassBtnInserir('sumir')
            setClassBtnAlterar('')

            setNome(nome), setId(id);
    }
    /** Metodo Alterar  */
    function Alterar(e){
        e.preventDefault()
        console.log( "Nome = " + nome );
        
        // axios.put(url+`/${id}`, {
        axios.put( `${url}/${id}`, {
            nome
        })
        .then( () => {
                alert("Alterado com sucesso " + nome)
                setNome(''), setId('');

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
            
            <form onSubmit={Validar}>
                <div className="row">
                    <div className="col">
                        <input 
                            type="text" value={nome}
                            placeholder="nome" className="form-control"
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                </div>
                <div className="btn-group mt-3">
                    <input type="hidden" value={id} name="id" onChange={ e => setId(e.target.value)} />
                    <button className={`btn btn-outline-success ${classBtnInserir}`}>Inserir</button>
                    <button className={`btn btn-outline-warning ${classBtnAlterar}`} onClick={Alterar}>Editar</button>
                    <button type="button" className="btn btn-danger" onClick={Limpar}>Cancelar</button>
                </div>
            </form>

            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th className="">Código</th>
                        <th className="w-100">nome</th>
                        <th className="">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map((item) =>(
                      <tr key={item.id}>
                      <td className="">{item.id}</td>
                      <td>{item.nome}</td>
                      <td className="btn-group">
                            <button className="btn btn-outline-warning" 
                                onClick={ () => CarregaCampos( item.nome, item.id ) }
                            >
                                <i className="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button className="btn btn-outline-danger" 
                                onClick={ () => Remover(item.id, item.nome)}
                            >
                              <i className="fa-regular fa-trash-can"></i>
                            </button>
                      </td>
                    </tr>
                ))}    
                </tbody>
            </table>
        </div>
    )
}