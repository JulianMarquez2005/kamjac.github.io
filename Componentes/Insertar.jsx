import React, { useState } from 'react';

function Insert({ onDataUpdate }) {
    const [Id_material, setIdmaterial] = useState('');
    const [nombre, setnombre] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const usuario = {
            Id_material,
            nombre,
        };

        fetch('https://alejo1016.000webhostapp.com/api.php?apicall=CAccesorio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setMessage('Error al crear el usuario');
                } else {
                    setMessage('Usuario creado correctamente');
                    setIdmaterial('');
                    setnombre('');
                    onDataUpdate(); // Llama a la función de actualización de datos en el componente padre
                }
            })
            .catch(error => {
                setMessage('Error en la solicitud');
                console.log(error);
            });
    };

    return (
        <div className="Insert-container">
            <h2>Insert Elemento</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Id_Material">Id:</label>
                    <input
                        type="text"
                        id="Id_Material"
                        value={Id_material}
                        onChange={e => setIdmaterial(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="nombre">Usuario:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={e => setnombre(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit">Crear Material</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Insert;