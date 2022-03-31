import { useState } from "react";

function App() {
    const [tarea, setTarea] = useState();
    const [tareas, setTareas] = useState([]);
    const [modoEdidicion, setModoEdicion] = useState(false);
    const [id, setId] = useState("");

    const agregarTarea = (e) => {
        e.preventDefault();
        if (!tarea.trim()) {
            console.log("Nombre vacio");
            return;
        }

        setTareas([...tareas, { id: Date.now(), nombreTarea: tarea }]);

        setTarea("");
    };

    const eliminarTarea = (id) => {
        const arrayFiltrado = tareas.filter((item) => item.id !== id);
        setTareas(arrayFiltrado);
    };

    const editar = (item) => {
        console.log(item);
        setModoEdicion(true);
        setTarea(item.nombreTarea);
        setId(item.id);
    };

    const editarTarea = (e) => {
        e.preventDefault();
        if (!tarea.trim()) {
            console.log("Vacio");
            return;
        }

        const arrayEditado = tareas.map((item) =>
            item.id == id ? { id, nombreTarea: tarea } : item
        );

        setTareas(arrayEditado);
        setModoEdicion(false);
        setTarea("");
        setId("");
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">CRUD React</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center"> Lista de tareas</h4>
                    <ul className="list-group">
                        {tareas.length === 0 ? (
                            <li className="list-group-item">No hay tareas</li>
                        ) : (
                            tareas.map((item) => (
                                <li className="list-group-item" key={item.id}>
                                    <span className="lead">
                                        {item.nombreTarea}
                                    </span>
                                    <button
                                        className="btn btn-danger btn-sm float-end mx-2"
                                        onClick={() => eliminarTarea(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        className="btn btn-warning btn-sm float-end"
                                        onClick={() => editar(item)}
                                    >
                                        Editar
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
                <div className="col-4">
                    <h4 className="text-center">
                        {modoEdidicion ? "Editar Tarea" : "Nueva Tarea"}
                    </h4>
                    <form onSubmit={modoEdidicion ? editarTarea : agregarTarea}>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ingrese Tarea"
                            onChange={(e) => setTarea(e.target.value)}
                            value={tarea}
                        />

                        {modoEdidicion ? (
                            <button
                                className="btn btn-warning btn-block"
                                type="submit"
                            >
                                Editar
                            </button>
                        ) : (
                            <button
                                className="btn btn-dark btn-block"
                                type="submit"
                            >
                                Agregar
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
