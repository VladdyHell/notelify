import React from "react";
import { Container } from 'react-bootstrap';

function Notes(props) {
    return (
        <section id="notes-section">
            <Container className="notes-container">
                <h1>Welcome!</h1>
                <form
                    name="logout"
                    onSubmit={(e) => props.onLogout(e)}
                    method="post"
                >
                    <button type="submit">Logout</button>
                </form>
            </Container>
        </section>
    );
}

export default Notes;
