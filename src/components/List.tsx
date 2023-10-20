import { VStack, Checkbox, Box, Button, Fade, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface Props {
  items: Array<{ id: number; title: string; done: boolean }>;
  onDelete: (id: number) => void;
  onToggleChecked: (e: any, id: number) => void;
}

const List = ({ items, onDelete, onToggleChecked }: Props) => {
  return (
    <VStack spacing={2} py={4}>
      {items.map((item) => (
        <Fade style={{ width: "100%" }} in={true} key={item.id}>
          <Box
            key={item.id}
            bg="gray.100"
            display={"flex"}
            alignItems={"center"}
            borderRadius={"md"}
            w={"100%"}
            background={"black "}
            p={2}
          >
            <Checkbox
              colorScheme="green"
              defaultChecked={item.done}
              onChange={(e) => onToggleChecked(e.target.checked, item.id)}
            >
              {item.title}
            </Checkbox>
            <Text px={2} size="md" w={"75%"}></Text>
            <Button
              ml={"auto"}
              colorScheme={"teal"}
              onClick={() => onDelete(item.id)}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </Fade>
      ))}
    </VStack>
  );
};

export default List;
