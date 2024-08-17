const Spinner = () => {
    return (
        <div className="spinner-container flex-col text-center gap-4">
            <div className="spinner"></div>
            <div>
                <p>Espere sin recargar la página.</p>
                <p>La API de Marvel puede tardar aproximadamente un minuto en completar la solicitud</p>
            </div>
        </div>
    );
};

export default Spinner