import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Edit, Trash2, PlusCircle, MoreHorizontal } from "lucide-react";

import useTaskStore from "../stores/useTaskStore";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const listSchema = z.object({
  listName: z.string().min(1, "List name is required"),
});

export function NavLists() {
  const lists = useTaskStore((state) => state.lists);
  const selectedListId = useTaskStore((state) => state.selectedListId);
  const setSelectedList = useTaskStore((state) => state.setSelectedList);
  const addList = useTaskStore((state) => state.addList);
  const editList = useTaskStore((state) => state.editList);
  const deleteList = useTaskStore((state) => state.deleteList);
  const { toggleSidebar, isMobile } = useSidebar();

  const [isAddingList, setIsAddingList] = useState(false);
  const [editDialogState, setEditDialogState] = useState({
    isOpen: false,
    list: null,
    name: "",
  });

  const form = useForm({
    resolver: zodResolver(listSchema),
    defaultValues: { listName: "" },
  });

  // Handle adding a new list
  const handleAddList = (data) => {
    addList(data.listName.trim());
    form.reset();
    setIsAddingList(false);
  };

  // Open the edit dialog for a specific list
  const openEditDialog = (list) => {
    setEditDialogState({
      isOpen: true,
      list: list,
      name: list.name,
    });
  };

  // Handle editing a list
  const handleEditList = () => {
    if (editDialogState.name.trim() !== "") {
      editList(editDialogState.list.id, { name: editDialogState.name.trim() });
      setEditDialogState({ isOpen: false, list: null, name: "" });
    }
  };

  // Handle changes in the edit dialog input
  const handleEditDialogChange = (e) => {
    setEditDialogState((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  // Handle the "Add new list" button click
  const handleAddNewListClick = (event) => {
    setIsAddingList(true);
    const parentElement = event.currentTarget.closest(
      '[data-state="collapsed"]'
    );
    if (parentElement) {
      toggleSidebar();
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Lists</SidebarGroupLabel>
      <SidebarMenu>
        {lists.map((list) => (
          <SidebarMenuItem key={list.id}>
            <SidebarMenuButton
              tooltip={list.name}
              data-active={selectedListId === list.id}
              onClick={() => setSelectedList(list.id)}
            >
              <span className="flex items-center gap-2">
                {list.name}
                <span className="text-xs leading-none text-white font-semibold pt-1 pb-[0.34rem] px-2 bg-foreground rounded-full">
                  {list.tasks.length}
                </span>
              </span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem onClick={() => openEditDialog(list)}>
                  <Edit />
                  <span>Edit list</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteList(list.id)}>
                  <Trash2 />
                  <span>Delete list</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem className="flex justify-center">
          <Separator className="bg-border/25 my-3 w-full" />
        </SidebarMenuItem>
        <SidebarMenuItem>
          {isAddingList ? (
            <div className="flex w-full gap-1">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleAddList)}
                  className="w-full flex gap-4 flex-col"
                >
                  <FormField
                    name="listName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">List name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-white text-black"
                            placeholder="Enter list name..."
                            autoFocus
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-3 justify-between">
                    <Button
                      type="button"
                      variant="secondary"
                      className="flex-1"
                      onClick={() => setIsAddingList(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="default"
                      className="flex-1"
                    >
                      <PlusCircle /> Add
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          ) : (
            <SidebarMenuButton
              tooltip="Add new list"
              onClick={handleAddNewListClick}
            >
              <PlusCircle />
              <span>Add new list</span>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
      {/* Edit List Dialog */}
      <Dialog
        open={editDialogState.isOpen}
        onOpenChange={(isOpen) =>
          setEditDialogState((prevState) => ({ ...prevState, isOpen }))
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit List</DialogTitle>
            <DialogDescription>Update the name of your list.</DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleEditList();
            }}
          >
            <Input
              value={editDialogState.name}
              onChange={handleEditDialogChange}
              placeholder="List name"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() =>
                  setEditDialogState({ isOpen: false, list: null, name: "" })
                }
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </SidebarGroup>
  );
}
