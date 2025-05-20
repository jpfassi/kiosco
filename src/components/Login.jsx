export default function Login({setLogeadoUser, setLogeadoAdmin, user, admin}) {

    return(
        <div>
            <button onClick={setLogeadoUser}>{user ? "Cerrar sesion" : "Iniciar sesion"}</button>
            <button onClick={setLogeadoAdmin}>{admin ? "Cerrar sesion Admin" : "Iniciar sesion Admin"}</button>
        </div>
    )
}