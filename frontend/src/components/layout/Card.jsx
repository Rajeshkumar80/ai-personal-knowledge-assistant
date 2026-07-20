function Card({ children, title }) {
    return (
        <div
            style={{
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
            }}
        >
            {title && (
                <h3
                    style={{
                        marginBottom: "15px",
                        color: "#ffffff"
                    }}
                >
                    {title}
                </h3>
            )}

            {children}
        </div>
    );
}

export default Card;