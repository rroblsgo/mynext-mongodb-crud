import { Container, Button, Grid, Card } from "semantic-ui-react";
import { useRouter } from "next/router";
//import styles from "styles/Home.module.css";
const HomePage = ({ tasks }) => {
  //console.log("HomePage:", tasks);
  const router = useRouter();

  if (tasks.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no tasks</h1>
            <img src="no-data.jpg" alt="no tasks" />
            <div>
              <Button primary>Crea una tarea</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  //render a list of tasks
  return (
    <Container style={{ padding: "20px" }}>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <p>{task.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button primary onClick={() => router.push(`/tasks/${task._id}`)}>
                View
              </Button>
              <Button
                primary
                onClick={() => router.push(`/tasks/${task._id}/edit`)}
              >
                Edit
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default HomePage;

export const getServerSideProps = async (ctx) => {
  const url =
    "https://mynext-mongodb-crud-" +
    process.env.URL_DEPLOYMENT +
    "-rroblesgo.vercel.app/";
  // const url = "http://localhost:3000/";
  const res = await fetch(url + "api/tasks");
  //console.log("getServerSideProps:", res);
  const tasks = await res.json();
  //console.log("getServerSideProps:", tasks);

  return {
    props: {
      tasks,
    },
  };
};
