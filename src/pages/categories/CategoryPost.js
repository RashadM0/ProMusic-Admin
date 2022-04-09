import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCategory } from "../../redux/actions/categoryActions";
import { useHistory } from "react-router-dom";

function CategoryPost() {
  const [state, setState] = useState({
    name: "",
    image: "",
  });
  const [error, setError] = useState("");
  const { name, image } = state;

  const handleInputChange = (e) => {
    let { id, value } = e.target;
    if (id === "image") {
      value = e.target.files[0];
    }
    setState({ ...state, [id]: value });
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) {
      setError("Please input all input field");
    } else {
      postCategory(state)(dispatch);
      history.push("/categories");
      setError("");
    }
  };
  return (
    <>
      <div>
        <h3 className="d-flex justify-content-center align-items-center mb-3">
          Create
        </h3>
      </div>
      <Button onClick={() => history.push("/categories")} color="danger mb-4">
        Go back
      </Button>
      {error && <h3>{error}</h3>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Row>
            <Col lg="6">
              <Label for="name">Name</Label>
              <Input
                onChange={handleInputChange}
                id="name"
                label="Name"
                defaultValue={name}
                type="text"
              />
            </Col>
            <Col lg="6">
              <Label for="image">Image</Label>
              <Input
                id="image"
                label="Image"
                onChange={handleInputChange}
                defaultValue={image}
                type="file"
              />
            </Col>
          </Row>
        </FormGroup>
        <Button color="primary" type="submit">
          Smash
        </Button>
      </Form>
    </>
  );
}

export default CategoryPost;
