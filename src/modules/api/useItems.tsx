const fetchItems = async () => {
  try {
    const response = await fetch("http://localhost:3000/items", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const deleteItem = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/items/${id}`, {
      method: "DELETE",
    });

    let data;

    if (response.ok) {
      data = await response.json();
    } else if (response.status === 404) {
      throw new Error(`Item with id ${id} not found`);
    } else {
      throw new Error("Error deleting item");
    }

    return data;
  } catch (error: Error | any) {
    throw new Error(error);
  }
};

const addItem = async (obj: object) => {
  try {
    await fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
  } catch (error) {
    console.log(error);
  }
};

const toggleChecked = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/items/${id}`);
    const currentItem = await response.json();

    const updatedItem = { ...currentItem, done: !currentItem.done };

    const patchResponse = await fetch(`http://localhost:3000/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    if (!patchResponse.ok) {
      throw new Error("Error updating item");
    }
  } catch (error) {
    console.log(error);
  }
};

export { fetchItems, deleteItem, addItem, toggleChecked };
