import React, { useState, useFocus, useRef, useEffect } from "react";
import { Container, Alert, Form, Card, Row, Col, Button } from 'react-bootstrap';
import { Fab, Zoom, Collapse, Fade } from '@mui/material/';
import { 
    Add as AddIcon, 
    DeleteForever as DeleteForeverIcon 
} from '@mui/icons-material/';

import fetchNotes from './fetchNotes.js';

const DEBUG = false;


function Notes(props) {

    const [notes, setNotes] = useState([]);

    function logNotes() {
        console.log(notes);
    }

    useEffect(async ()=>{
        fetchSetNotes();
    }, []);

    const fetchSetNotes = async () => {
        props.setLoading(true);
        try {
            const data = await fetchNotes(setNotes);
            setNotes(data);
            DEBUG && console.log(notes);
        } catch (err) {
            DEBUG && console.log(err);
        }
        props.setLoading(false);
    }

    const [show, setShow] = useState(true);
    const [isFocused, setFocused] = useState(null);
    const [note, setNote] = useState({
        title: '',
        content: ''
    });

    const title = useRef();
    const content = useRef();
    const submitBtn = useRef();

    async function handleFocus(event) {
        const { name } = event.target;
        const { _reactName } = event;
        DEBUG && console.log(name);

        event.preventDefault();
        if (name === 'title') {
            title.current && title.current.focus()
        } else if (name === 'content') { 
            content.current && content.current.focus();
        } else if (name === 'submit') {
            await setTimeout(()=>setFocused(false), 1);
            submitBtn.current && submitBtn.current.blur();
            DEBUG && console.log(note);
            await props.onOperateNote(event.target);
            setNote({
                title: '',
                content: ''
            });
            await fetchSetNotes();
        }

        function finalEventTrigger() {
            return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    resolve(_reactName)   
                }, 1);
            });
        }
        const eventTrigger = await finalEventTrigger();

        DEBUG && console.log(eventTrigger);
        // DEBUG && console.log(name + ' ' + _reactName);

        if (_reactName === 'onFocus') {
            setFocused(true);
        } else if (_reactName === 'onBlur') {
            setFocused(false);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setNote((prevVal) => {
            return {
                ...prevVal,
                [name]: value
            };
        });
    }

    return (
        <section id="notes-section">
            <Container className="notes-section-container">
                {DEBUG && <Button onClick={logNotes}>Log Notes</Button>}
                {DEBUG && show ? (
                    <Alert variant="success" onClose={() => setShow(false)} dismissible>
                        Welcome!
                    </Alert>
                ) : null}

                <Card className="note-input">
                    <Card.Body>
                        <Form 
                            name="submit" 
                            onSubmit={handleFocus}>
                            {/*{isFocused ?  (*/}
                            <Collapse in={isFocused}>
                                <Fade in={isFocused}>
                                    <Form.Group className="mb-3 title" controlId="title">
                                        <Form.Control 
                                            ref={title}
                                            name="title" 
                                            type="text" 
                                            placeholder="Title"
                                            onFocus={handleFocus}
                                            onBlur={handleFocus}
                                            onChange={handleChange}
                                            value={note.title} />
                                    </Form.Group>
                                </Fade>
                            </Collapse>
                            {/*): null}*/}
                            <Collapse in={isFocused} collapsedSize={56}>
                                <Form.Group className="mb-3 content" controlId="content">
                                    <Form.Control
                                        ref={content} 
                                        name="content"
                                        as="textarea" 
                                        rows={8}
                                        placeholder="Take a note..."
                                        onFocus={handleFocus}
                                        onBlur={handleFocus}
                                        onChange={handleChange}
                                        value={note.content} />
                                </Form.Group>
                            </Collapse>
                            <Zoom in={isFocused} appear={true}>
                                <Fab 
                                    ref={submitBtn}
                                    // name="submit"
                                    // onFocus={handleFocus} 
                                    // onBlur={handleFocus}
                                    // onClick={handleFocus} 
                                    type="submit"
                                    aria-label="add">
                                    <AddIcon />
                                </Fab>
                            </Zoom>
                        </Form>
                    </Card.Body>
                </Card>
                <Container className="notes-container">
                    <Row>
                    {notes && notes.map((item, index) => (
                        // notes.length % 4 === 0 ? <Row> : null
                            <Col className="col" lg={3} md={4} sm={6} xs={12}>
                                <Card key={index}>
                                    <Card.Body>
                                        <h2>{item.title}</h2>
                                        <p>{item.content}</p>
                                        <DeleteForeverIcon className="delete-icon" />
                                    </Card.Body>
                                </Card>
                            </Col>
                    ))}
                    </Row>
                </Container>
            </Container>
        </section>
    );
}

export default Notes;
