import { Menu, Container, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Image } from "next/image";

export const Navbar = () => {
  const router = useRouter();

  return (
    <div>
      <Menu inverted borderless attached>
        <Container>
          <Menu.Item>
            <Link href="/" passHref>
              <img src="favicon.ico" alt="favicon" />
            </Link>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button
                primary
                size="mini"
                onClick={() => router.push("/tasks/new")}
              >
                new Task
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
};
