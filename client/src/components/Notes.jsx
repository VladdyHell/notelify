import React, { useState } from "react";
import { Container, Alert, Form, Card } from 'react-bootstrap';

function Notes(props) {
    const [show, setShow] = useState(true);
    const [isFocused, setFocused] = useState(null);

    async function handleFocus(event) {
        const { name } = event.target;
        const { _reactName } = await event;
        let eventTrigger;

        function finalEventTrigger() {
            return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    resolve(_reactName)   
                }, 1);
            });
        }
        eventTrigger = await finalEventTrigger();

        console.log(eventTrigger);
        // console.log(name + ' ' + _reactName);

        if (eventTrigger === 'onFocus') {
            setFocused(true);
        } else if (eventTrigger === 'onBlur') {
            setFocused(false);
        }
    }

    return (
        <section id="notes-section">
            <Container className="notes-container">
                {show ? (
                    <Alert variant="success" onClose={() => setShow(false)} dismissible>
                        Welcome!
                    </Alert>
                ) : null}

                <Card>
                    <Card.Body>
                        <Form>
                            {isFocused ?  (
                                <Form.Group className="mb-3 title" controlId="title">
                                    <Form.Control 
                                        name="title" 
                                        type="email" 
                                        placeholder="Title"
                                        onFocus={handleFocus}
                                        onBlur={handleFocus} />
                                </Form.Group>
                            ): null}
                            <Form.Group className="mb-3 content" controlId="content">
                                <Form.Control 
                                    name="content"
                                    as="textarea" 
                                    rows={isFocused ? 8 : 1}
                                    placeholder="Take a note..."
                                    onFocus={handleFocus}
                                    onBlur={handleFocus} />
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </section>
    );
}

export default Notes;
