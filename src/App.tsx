import { useEffect, useState } from "react";
import {
  Container,
  Input,
  Heading,
  Box,
  Button,
  Skeleton,
  Text,
  useToast,
  Fade,
} from "@chakra-ui/react";
import List from "./components/List";
import {
  fetchItems,
  deleteItem,
  addItem,
  toggleChecked,
} from "./modules/api/useItems";

function App() {
  type Item = {
    id: number;
    title: string;
    done: boolean;
  };

  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);
  const toast = useToast();

  async function fetchItemsAsync() {
    setFetching(true);
    const items = await fetchItems();
    setFetching(false);
    setItems(items);
  }

  const isDisabledButton = () => {
    return input.length >= 3;
  };

  useEffect(() => {
    fetchItemsAsync();
  }, []);

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteItem(id);
      setItems(items.filter((item) => item.id !== id));
      toast({
        title: "Item deleted",
        status: "success",
        isClosable: true,
        position: "bottom-left",
      });
    } catch (e: Error | any) {
      toast({
        title: e.message,
        status: "error",
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleAddItem = async (input: string) => {
    if (!input) return;
    const item = {
      id: Math.random(),
      title: input,
      done: false,
    };

    await addItem(item);
    setItems([...items, item]);
    setInput("");

    toast({
      title: "Item added",
      status: "success",
      isClosable: true,
      position: "bottom-left",
    });
  };

  const handleToggleItem = async (id: number) => {
    try {
      await toggleChecked(id);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, done: !item.done } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container padding={4} size="2xl">
        <Heading as="h1" textAlign="center" mb={2}>
          Todo List
        </Heading>
        <Box display={"flex"} gap={2}>
          <Box width={"100%"}>
            <Input
              placeholder="Basic usage"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) =>
                e.key === "Enter" && isDisabledButton() && handleAddItem(input)
              }
            />
          </Box>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => handleAddItem(input)}
            isDisabled={!isDisabledButton()}
          >
            Add
          </Button>
        </Box>

        <Skeleton isLoaded={!fetching} height={"100px"} fadeDuration={1} my={4}>
          <Fade in={true}>
            <List
              items={items}
              onDelete={handleDeleteItem}
              onToggleChecked={handleToggleItem}
            />
            {!items?.length && !fetching && (
              <Text textAlign="center">No items to show</Text>
            )}
          </Fade>
        </Skeleton>
      </Container>
    </>
  );
}

export default App;
