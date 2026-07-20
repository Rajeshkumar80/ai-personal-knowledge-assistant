function Card({ children, title }) {
    return (
        <div
            style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "var(--shadow-md)"
            }}
        >
            {title && (
                <h3
                    style={{
                        marginBottom: "15px",
                        color: "var(--text-primary)"
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