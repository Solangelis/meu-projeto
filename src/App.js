import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import Title from "./components/Title/Title";


function App() {
  
  

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tableContatos, setTableContatos] = useState();
  



  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nome: nome,
      email: email,
      telefone: telefone,
    };

    const response = await fetch('http://localhost:4000/contatos/', {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });

    
    if (response.ok) {
      console.log("oks", response.ok); 
      listarContactos();
    }else console.log("error", response);
  };

  function listarContactos() {
   fetch('http://localhost:4000/contatos')
   .then((response) => response.json())
   .then(data => setTableContatos(data));
  };

 useEffect(() => {
    listarContactos();
},[]);

 console.log("Listar Contatos", tableContatos);

  const handleRemoveContact = async (contatoId) => {
    const response = await fetch('http://localhost:4000/contatos/'+ contatoId,
      {
        method: "DELETE",
      });
    if (response.ok) {
      console.log("Deletado com sucesso");
      listarContactos();
    }
    
  }

  const handleEditarContact = async (contatoId) => {
    const response = await fetch('http://localhost:4000/contatos/' + contatoId,
      {
        method: "PUT",
      }
    );
    if (response.ok) {
      console.log("EDITAR com sucesso");
      listarContactos();
    }
  };



  return (
    <>
      <div className="App">
        <Navbar />

        <Title />

        <form onSubmit={handleSubmit} className="formContainer">
          <div>
            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Telefone</label>
            <input
              type="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              Adicionar
            </button>
          </div>
        </form>
         
         <div>
          <table className="table table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
              </tr>
             
            </thead>
            <tbody>
              
              {tableContatos?.map((contacto)=> {
                return (
                  <tr key={contacto.id}>
                    
                    <td>{contacto.id}</td>
                    <td>{contacto.nome}</td>
                    <td>{contacto.email}</td>
                    <td>{contacto.telefone}</td>
                    
                      <td> 
                      <button
                        onClick={() => handleEditarContact(contacto.id)}
                        className="btn btn-primary">
                        Editar
                      </button>

                      <button
                        onClick={() => handleRemoveContact(contacto.id)}
                        className="btn btn-primary">
                        Excluir
                      </button>
              
                      </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
}

export default App;
