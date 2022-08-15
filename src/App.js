import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import Title from "./components/Title/Title";


function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tableContatos, setTableContatos] = useState();
  const [alterarContacto, setalterarContacto] = useState();
 


  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nome: nome,
      email: email,
      telefone: telefone,
    };

    
    
    const response = await fetch("http://localhost:4000/contatos/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });

    if (response.ok) {
      Swal.fire("Seu Contato foi salvo com sucesso");
      listarContactos();
    } else {
      Swal.fire("ERROR", response);
    }
  };
  function listarContactos() {
    fetch("http://localhost:4000/contatos")
      .then((response) => response.json())
      .then((data) => setTableContatos(data));
  }

  useEffect(() => {
    listarContactos();
  }, []);

  console.log("Listar Contatos", tableContatos);

  const RemoveContact = async (contatoId) => {
    const response = await fetch(
      "http://localhost:4000/contatos/" + contatoId,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      Swal.fire(" Seu contato foi deletado ");
      listarContactos();
    }
  };

  const EditarContact = async () => {
    const contatoId = alterarContacto;
    const response = await fetch(
      `http://localhost:4000/contatos/${contatoId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          nome: nome,
          email: email,
          telefone: telefone,
        }),
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
    if (response.ok) {
      console.log("ok", response.ok);
      setalterarContacto(undefined);
    }
  };

  const onContactos = (contatoId) => {
    fetch(`http://localhost:4000/contatos/${contatoId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("retorno doalte", data);
        setalterarContacto(contatoId);
        setNome(data.nome);
        setEmail(data.email);
        setTelefone(data.telefone);
      });
  };

  

  return (
    <>
      <div className="App">
        <Navbar />

        <Title />

        <form
          onSubmit={alterarContacto ? EditarContact : handleSubmit}
          className="formContainer"
        >
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
            <button type="submit" className="btn btn-dark btn-primary">
              {alterarContacto ? "Editar" : "Adicionar"}
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
              {tableContatos?.map((contacto) => {
                return (
                  <tr key={contacto.id}>
                    <td>{contacto.id}</td>
                    <td>{contacto.nome}</td>
                    <td>{contacto.email}</td>
                    <td>{contacto.telefone}</td>

                    <td>
                      <button
                        onClick={() => onContactos(contacto.id)}
                        className="btn-button"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => RemoveContact(contacto.id)}
                        className="btn-buttonTwo"
                      >
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
