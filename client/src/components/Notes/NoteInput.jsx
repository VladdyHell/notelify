import React from 'react';

function NoteInput(props) {
    return (
        <Card className="note-input">
            <Card.Body>
                <Form name="submit" onSubmit={handleFocus}>
                    {/*{isFocused ?  (*/}
                    <Collapse in={isFocused}>
                        <Fade in={isFocused}>
                            <Form.Group
                                className="mb-3 title"
                                controlId="title"
                            >
                                <Form.Control
                                    ref={title}
                                    name="title"
                                    type="text"
                                    placeholder="Title"
                                    onFocus={handleFocus}
                                    onBlur={handleFocus}
                                    onChange={handleChange}
                                    value={note.title}
                                />
                            </Form.Group>
                        </Fade>
                    </Collapse>
                    {/*): null}*/}
                    <Collapse in={isFocused} collapsedSize={56}>
                        <Form.Group
                            className="mb-3 content"
                            controlId="content"
                        >
                            <Form.Control
                                ref={content}
                                name="content"
                                as="textarea"
                                rows={8}
                                placeholder="Take a note..."
                                onFocus={handleFocus}
                                onBlur={handleFocus}
                                onChange={handleChange}
                                value={note.content}
                            />
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
                            aria-label="add"
                        >
                            <AddIcon />
                        </Fab>
                    </Zoom>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default NoteInput;
