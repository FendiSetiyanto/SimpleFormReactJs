import * as React from "react";
import { Container, Form, Button, Table } from "react-bootstrap";

import { useForm } from "react-hook-form";

const App = () => {
  const initState = {
    name: "",
    address: "",
    ektp: "",
    job: "",
    phone: ""
  };

  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = React.useState(initState);
  const [initialArray, setArray] = React.useState([]);

  const onSubmit = (values) => {
    console.log("Values:::", values);
    console.log("Values:::", JSON.stringify(values));
    setArray((oldArray) => [...oldArray, values]);
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: initialValues
  });

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(">>", value, name, type);
    });

    return () => subscription.unsubscribe();
  }, [watch]);
  console.log("initialArray", initialArray);
  return (
    <Container className="my-4">
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <Form.Text className="text-danger">{errors.name.message}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Your address"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <Form.Text className="text-danger">
              {errors.address.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>eKTP</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your ektp"
            {...register("ektp", {
              required: "eKTP is required",
              pattern: /^\d+$/,
              minLength: 16,
              maxLength: 16
            })}
          />
          {errors.ektp && (
            <Form.Text className="text-danger">{errors.ektp.message}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Job</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your job"
            {...register("job", { required: "Job is required" })}
          />
          {errors.job && (
            <Form.Text className="text-danger">{errors.job.message}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your phone"
            {...register("phone", {
              required: "Phone is required",
              pattern: /^\d+$/,
              minLength: 12
            })}
          />
          {errors.phone && (
            <Form.Text className="text-danger">
              {errors.phone.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {/* Table data */}
      <Table className="my-4" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>eKTP</th>
            <th>Job</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {initialArray.map((data) => (
            <tr>
              <td>+</td>
              <td>{data.name}</td>
              <td>{data.address}</td>
              <td>{data.ektp}</td>
              <td>{data.job}</td>
              <td>{data.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
