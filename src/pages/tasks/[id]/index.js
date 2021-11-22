import Error from "next/error";
import { Grid, Button, Confirm, Loader } from "semantic-ui-react";
import { useState } from "react";
import { useRouter } from "next/router";

const url = process.env.URL;

export default function TaskDetail({ task, error }) {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { query, push } = useRouter();

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteTask = async () => {
    const { id } = query;
    try {
      await fetch(`${url}api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteTask();
    await push("/");
    close();
  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <div>
            <Button color="red" onClick={open} loading={isDeleting}>
              Delete
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Confirm
        header="Please Confirm"
        content="Are you sure you want delete this task?"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      />
    </Grid>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`${url}api/tasks/${id}`);
  if (res.status === 200) {
    const task = await res.json();
    return {
      props: { task },
    };
  }
  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid id",
      },
    },
  };
}
